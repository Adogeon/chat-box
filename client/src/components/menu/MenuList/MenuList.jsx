import React from "react";

import style from "./list.module.css";

const MenuList = (props) => (
  <ul className = {style.basic}>
    {props.children}
  </ul>
)

export default MenuList;
