import React from "react";
import { useSelector, useDispatch } from "react-redux";

import style from "./Appbar.module.css";

const AppBar = () => {
  const userState = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <div className={style.appbar}>
      <div className={style.left}>
        <h1>Chat-Box</h1>
      </div>
      <div className={style.right}>
        <div>{userState.username}</div>
        <button onClick={handleLogOut}>Log Out</button>
      </div>
    </div>
  );
};

export default AppBar;
