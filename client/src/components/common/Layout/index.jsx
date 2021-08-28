import React from "react";
import ChatSideBar from "./ChatSideBar";

import style from "./main.module.css";

const Layout = (props) => (
  <div className={style.layout}>
    <ChatSideBar />
    {props.children}
  </div>
);

export default Layout;
