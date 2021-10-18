import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ConversationList from "../ConversationList/ConverSationList";
import ContactList from "../ContactList/ContactList";

import style from "./SideBar.module.css";

const SideBar = () => {
  const userState = useSelector((state) => state.user);

  const [displayList, setDisplayList] = useState(["conversation"]);

  return (
    <div className={style.slidebar}>
      <div className={style.userArea}>
        <div className={style.userName}>{userState.username}</div>
      </div>
      <div>Toggle button</div>
      {displayList === "conversation" ? (
        <div className={style.messageArea}>
          <ConversationList />
        </div>
      ) : (
        <div className={style.contactArea}>
          <ContactList />
        </div>
      )}
    </div>
  );
};

export default SideBar;
