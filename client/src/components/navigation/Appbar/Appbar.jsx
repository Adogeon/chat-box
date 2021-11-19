import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import { AppBar, Box, Toolbar, Typography, IconButton } from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MenuIcon from "@mui/icons-material/Menu";

import { logOut } from "@store/auth/auth.slices";
import { toggleMobileSideBar } from "@store/app/app.slices";

const MainAppBar = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const handleLogOut = () => {
    dispatch(logOut());
    history.push("/");
  };
  const handleAddMessage = () => {
    dispatch(addNewMessageStart());
  };
  const handleUser = () => {
    history.push("/contact");
  };
  const handleToggleSidebar = () => {
    dispatch(toggleMobileSideBar());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            color="inherit"
            onClick={handleToggleSidebar}
            sx={{
              display: { xs: "block", lg: "none" },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" to="/" sx={{ flexGrow: 1 }}>
            Chat-Box
          </Typography>
          <IconButton size="large" color="inherit">
            <InboxIcon />
          </IconButton>
          <IconButton size="large" color="inherit">
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default MainAppBar;
