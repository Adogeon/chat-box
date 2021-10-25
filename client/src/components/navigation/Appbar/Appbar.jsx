import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { ExitToAppOutlined } from "@material-ui/icons";

import style from "./Appbar.module.css";
import button from "../../../styles/Button/button.module.css";
import 

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
        <button
          className={`${button.text} ${style["log-out-button"]}`}
          onClick={handleLogOut}
        >
          <ExitToAppOutlined />
        </button>
      </div>
    </div>
  );
};

export default AppBar;
