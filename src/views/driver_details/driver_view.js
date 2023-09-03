
import { Box, Button, Checkbox, Divider, Grid, makeStyles, Table, TableBody, TableCell, TableRow, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { BASE_URL, PATH_DRIVER } from "../../utils/constants";
import makeApiCall from "../../utils/makeApiCall";
import { driverViewConfig } from "../../utils/display_configuration";
import moment from "moment";

const useStyles = makeStyles({
  table: {
    margin: "0 auto",
    width: "90%",
  },
  titleCell: {
    width: "35%",
    textAlign: "right",
    borderBottom: "none",
  },
  valueCell: {
    textAlign: "left",
    borderBottom: "none",
  },
});

const ViewDriver = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const styles = useStyles();

  const [driver, setDriver] = useState({});
  const [BusCompany, setBusCompany] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDriverById = async () => {
        const DriverResponse = await makeApiCall(
          `${BASE_URL}${PATH_DRIVER}(${id})`
        );
        const DriverJsonResp = await DriverResponse.json();
        setDriver(DriverJsonResp);
        const BusCompanyResponse = await makeApiCall(
          `${BASE_URL}${PATH_DRIVER}(${id})/Bus`
        );
        const BusCompanyJsonResp = await BusCompanyResponse.json();
        setBusCompany(BusCompanyJsonResp.BusCompany);
      };
      fetchDriverById();
    }
  }, [id]);
  return (
    <>
      {driver && (
        <Box padding={2}>
          <Grid>
            <Grid item lg={12} xs={12}>
              <Box display="flex" justifyContent="space-between">
                <Typography className="page-heading" variant="h5">View Driver</Typography>
                <div  className="action-buttons">
                
                  <Button
                    onClick={() => navigate('/Drivers')}
                    variant="contained"
                    color="secondary"
                    size="small"
                  >
                    Back
                  </Button>
                </div>
              </Box>
            </Grid>
            <Divider />
            <Box marginTop={2} className="form-container">
              <Grid container item lg={12} xs={12}>
                {Object.keys(driverViewConfig).map((config, ind) => (
                  <>
                    <Grid item lg={5} md={5} xs={12}>
                      <Box marginTop={1}>
                        <Typography variant="h6">{config}</Typography>
                        <Table size="small" className={styles.table}>
                          <TableBody>
                            {driverViewConfig[config].map(
                              ({ key, value, type }) => (
                                <TableRow key={key} className="responsive-table-row">
                                  <TableCell className={[styles.titleCell, 'row-label'].join(' ')}>
                                    <Typography variant="body1">
                                      {value}:{" "}
                                    </Typography>
                                  </TableCell>
                                  <TableCell className={[styles.valueCell, 'row-value'].join(' ')}>
                                    {
                                    key === "DriverBus" ? (
                                      <Typography variant="body1">
                                        {BusCompany}
                                      </Typography>
                                    ) : 
                                      type === "date" ? (
                                      <Typography variant="body1">
                                        {driver[key] !== null &&
                                          moment(driver[key]).format(
                                            "DD-MMMM-YYYY HH:mm:ss A"
                                          )}
                                      </Typography>
                                    ) : 
                                    type === "boolean" ? (
                                      <Checkbox
                                        checked={driver[key] || false}
                                        disabled
                                      />
                                    ) : (
                                      <Typography variant="body1">
                                        {driver[key]}
                                      </Typography>
                                    )}
                                  </TableCell>
                                </TableRow>
                              )
                            )}
                          </TableBody>
                        </Table>
                      </Box>
                    </Grid>
                    <Grid item lg={1} md={1} xs={false} />
                  </>
                ))}
              </Grid>
            </Box>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default ViewDriver;
