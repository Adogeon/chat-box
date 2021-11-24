import React from "react";
import { useSelector, useDispatch } from "react-redux";
//import component
import AppBar from "./Appbar/Appbar";
import SideBar from "./Sidebar/Sidebar";
import Modal from "../modal";
import { Grid, Drawer } from "@mui/material";

const Layout = (props) => {
  const drawerWidth = "300px";

  const appState = useSelector((state) => state.app);
  const dispatch = useDispatch();
  const handleSideBarToggle = () => {
    dispatch(toggleMobileSideBar());
  };

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12}>
          <AppBar />
        </Grid>
        <Grid
          item
          container
          spacing={1}
          sm={12}
          md={10}
          xl={8}
          justifyContent="center"
          alignItems="flex-start"
        >
          <Drawer
            variant="temporary"
            open={appState.mobileSideBarOpen}
            onClose={handleSideBarToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", lg: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            <SideBar />
          </Drawer>
          <Grid
            item
            sx={{
              display: { xs: "none", lg: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            <SideBar
              deskStyle={{ backgroundColor: "inherit", color: "white" }}
            />
          </Grid>
          <Grid item sm={12} md={9}>
            <div>{props.main}</div>
          </Grid>
        </Grid>
      </Grid>
      <Modal />
    </>
  );
};

export default Layout;
