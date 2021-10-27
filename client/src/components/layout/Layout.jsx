import React from "react";

import style from "./layout.module.css";

const Layout = (props) => (
  <>
    <div className={style.layout}>
      <div className={style.bar}>{props.bar}</div>
      <div className={style.nav}>{props.side}</div>
      <main className={style.body}>{props.main}</main>
    </div>
  </>
);

export default Layout;
