import React from "react";

import AppBar from "../navigation/Appbar/Appbar";

import { Grid } from "@mui/material";
import style from "./layout.module.css";

const Layout = (props) => (
  <>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <AppBar />
      </Grid>
      <Grid item sm={null} md={3}>
        <div>{props.side}</div>
      </Grid>
      <Grid item sm={12} md={9}>
        <div>{props.main}</div>
      </Grid>
    </Grid>
  </>
);

export default Layout;
