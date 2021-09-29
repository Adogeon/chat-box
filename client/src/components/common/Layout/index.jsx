import React from "react";
import Sidebar from "./Navigation/Sidebar/SideBar.jsx";

import style from "./main.module.css";

const Layout = (props) => (
  <div className={style.layout}>
    <Sidebar />
    {props.children}
  </div>
);

export default Layout;
