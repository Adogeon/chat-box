import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import {
  AddCommentOutlined,
  ExitToAppOutlined,
  People,
} from "@mui/icons-material";

import style from "./Appbar.module.css";
import button from "../../../styles/Button/button.module.css";
import { logOut } from "../../../store/auth/auth.slices";

const AppBar = () => {
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

  return (
    <div className={style.appbar}>
      <div className={style.left}>
        <Link to="/" className={style.label}>
          <h1>Chat-Box</h1>
        </Link>
      </div>
      <div className={style.right}>
        <button
          className={`${button.text} ${style["menu-button"]}`}
          onClick={handleAddMessage}
        >
          <AddCommentOutlined />
        </button>
        <button
          className={`${button.text} ${style["menu-button"]}`}
          onClick={handleUser}
        >
          <People />
        </button>
        <div>{userState.username}</div>
        <button
          className={`${button.text} ${style["menu-button"]}`}
          onClick={handleLogOut}
        >
          <ExitToAppOutlined />
        </button>
      </div>
    </div>
  );
};

export default AppBar;
