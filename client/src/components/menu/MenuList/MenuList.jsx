import React from "react";

import { List } from "@mui/material";

const MenuList = (props) => (
  <List sx={{ width: "100%", bgcolor: "background.paper" }}>
    {props.children}
  </List>
);

export default MenuList;
