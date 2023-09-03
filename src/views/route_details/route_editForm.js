
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  BASE_URL,
  PATH_BUS,
  PATH_DRIVER,
  PATH_ROUTE,
} from '../../utils/constants';
import {
  Box,
  Button,
  Checkbox,
  Divider,
  Grid,
  makeStyles,
  Table,
  TableBody,
  TableCell,
  TableRow,
  TextField,
  Typography,
} from '@material-ui/core';

import { routeViewConfig } from '../../utils/display_configuration';
import makeApiCall from '../../utils/makeApiCall';
import MuiSelect from '../../components/select/select_index';
import moment from 'moment';

const useStyles = makeStyles((theme) => ({
  table: {
    margin: '0 auto',
    width: '90%',
  },
  titleCell: {
    width: '35%',
    textAlign: 'right',
    borderBottom: 'none',
  },
  valueCell: {
    textAlign: 'left',
    borderBottom: 'none',
  },
  link: {
    color: theme.palette.secondary.main,
    textDecoration: 'underline',
    cursor: 'pointer',
  },
}));

const EditRouteForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const snackbar = useSnackbar();
  const styles = useStyles();
    const [formData, setFormData] = useState({});
          const [errorData, setErrorData] = useState({});

  


  useEffect(() => {
    const fetchRouteById = async () => {
      const routeResponse = await makeApiCall(
        `${BASE_URL}${PATH_ROUTE}(${id})`
      );
      const jsonResp = await routeResponse.json();
      setFormData(jsonResp);
    };
    fetchRouteById();
  }, [id]);

  const handleChange = (key, value) => {
    setFormData({ ...formData, ...{ [key]: value } });
  };

  

  const submitForm = async () => {
      
    const { 
      RouteId,
    ...otherData } = formData;

    

    

    const resp = await makeApiCall(
      `${BASE_URL}${PATH_ROUTE}(${formData.RouteId})`,
      'PATCH',
            JSON.stringify(...otherData)
    );
    if (resp.ok) {
      snackbar.enqueueSnackbar('Successfully updated Route', {
        variant: 'success',
      });
      navigate({ pathname: '/routes' });
    } else {
      const jsonData = await resp.json();
      snackbar.enqueueSnackbar(`Failed! - ${jsonData.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <Box padding={2}>
      <Grid>
        <Grid item lg={12} xs={12}>
          <Box display="flex" justifyContent="space-between">
            <Typography className="page-heading" variant="h5">
              Edit Route
            </Typography>
            <div className="action-buttons">
              <Button
                size="small"
                variant="contained"
                color="primary"
                className="margin-right"
                onClick={submitForm}
              >
                Save
              </Button>
              &nbsp;
              <Button
                size="small"
                variant="contained"
                color="secondary"
                onClick={() => navigate({ pathname: '/routes' })}
              >
                Cancel
              </Button>
            </div>
          </Box>
        </Grid>
        <Divider />
        <Box marginTop={2} className="form-container">
          <Grid container item lg={12} xs={12}>
            {Object.keys(routeViewConfig)?.map((config, ind) => (
              <>
                <Grid item lg={5} md={5} xs={12}>
                  <Box marginTop={1}>
                    <Typography variant="h6">{config}</Typography>
                    <Table size="small" className={styles.table}>
                      <TableBody>
                        {routeViewConfig[config]?.map(
                          ({ key, value, type, required }) => (
                            <TableRow
                              key={key}
                              className="responsive-table-row"
                            >
                              <TableCell
                                className={[styles.titleCell, 'row-label'].join(
                                  ' '
                                )}
                              >
                                <Typography variant="body1">
                                  {value}
                                  {required ? '*' : ''}:
                                </Typography>
                              </TableCell>
                              <TableCell
                                className={[styles.valueCell, 'row-value'].join(
                                  ' '
                                )}
                              >
                                {key === 'RouteId' ? (
                                  <Typography variant="body1">
                                    {formData[key]}
                                  </Typography>
                                ) : 
                                type === 'date' ? (
                                  <Typography variant="body1">
                                    {formData[key] !== null &&
                                      moment(formData[key]).format(
                                        'DD-MMMM-YYYY HH:mm:ss A'
                                      )}
                                  </Typography>
                                ) : type === 'boolean' ? (
                                  <Checkbox
                                    checked={formData[key] || false}
                                    onChange={(e) =>
                                      handleChange(key, e.target.checked)
                                    }
                                  />
                                ) :  (
                                  <>
                                    <TextField
                                      name={key}
                                      fullWidth
                                      className="text-field-custom"
                                      variant="outlined"
                                      size="small"
                                      type={type}
                                      error={errorData[key]}
                                      helperText={errorData[key]}
                                      value={formData[key] || ''}
                                      onChange={(e) => {
                                        if (e.target.reportValidity()) {
                                          handleChange(key, e.target.value);
                                        }
                                      }}
                                    />
                                  </>
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
  );
};

export default EditRouteForm;
