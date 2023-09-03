import React, { useState } from "react";
import { SnackbarProvider } from "notistack";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import clsx from "clsx";
import { CssBaseline, makeStyles } from "@material-ui/core";
import AppHeader, { drawerWidth } from "./components/app-header/app-header_index";
import BusTable from "./views/bus_table/bus_index";
import RouteTable from "./views/route_table/route_index";
import DriverTable from "./views/driver_table/driver_index";
import ViewBus from "./views/bus_details/bus_view";
import CreateBusForm from "./views/bus_details/bus_createForm";
import EditBusForm from "./views/bus_details/bus_editForm";
import ViewRoute from "./views/route_details/route_view";
import CreateRouteForm from "./views/route_details/route_createForm";
import EditRouteForm from "./views/route_details/route_editForm";
import ViewDriver from "./views/driver_details/driver_view";
import CreateDriverForm from "./views/driver_details/driver_createForm";
import EditDriverForm from "./views/driver_details/driver_editForm";
import "./App.css";

const useStyles = makeStyles((theme) => ({
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    marginLeft: theme.spacing(9),
    width: `calc(100% - ~{theme.spacing(7) + 10}px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ~{theme.spacing(9) + 10}px)`,
    },
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ~{drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
}));

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const classes = useStyles();

  return (
    <div className="App">
      <BrowserRouter>
        <SnackbarProvider maxSnack={1} autoHideDuration={2500}>
          <CssBaseline />
          <AppHeader onDrawerChange={setDrawerOpen} />
          <main
            className={clsx(classes.content, {
              [classes.appBarShift]: drawerOpen,
            })}
          >
            <div className={classes.toolbar} />
            <Routes>

              <Route path="/Buses" element={<BusTable />} />
              <Route path="/Routes" element={<RouteTable />} />
              <Route path="/Drivers" element={<DriverTable />} />
              <Route path="/Buses/edit/:id" element={<EditBusForm />}/>
              <Route path="/Buses/view/:id" element={<ViewBus />} />
              <Route path="/Buses/create" element={<CreateBusForm />} />
              <Route path="/Routes/edit/:id" element={<EditRouteForm />}/>
              <Route path="/Routes/view/:id" element={<ViewRoute />} />
              <Route path="/Routes/create" element={<CreateRouteForm />} />
              <Route path="/Drivers/edit/:id" element={<EditDriverForm />}/>
              <Route path="/Drivers/view/:id" element={<ViewDriver />} />
              <Route path="/Drivers/create" element={<CreateDriverForm />} />
            </Routes>
          </main>
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
