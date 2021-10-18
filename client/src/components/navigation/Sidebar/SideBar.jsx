import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ConversationList from "../ConversationList/ConverSationList";
import ContactList from "../ContactList/ContactList";
import Tab from "../Tab/Tab";

import button from "../../../styles/Button/button.module.css";
import tab from "../../../styles/Button/button.module.css";
import style from "./SideBar.module.css";

const SideBar = () => {
  const userState = useSelector((state) => state.user);

  const [displayList, setDisplayList] = useState("conversation");

  return (
    <div className={style.slidebar}>
      <div className={style.userArea}>
        <div className={style.userName}>{userState.username}</div>
      </div>
      <div className={style.tabArea}>
        <Tab
          defaultClass={`${style.tab}`}
          activeClass={`${style["tab-active"]}`}
          onClick={() => {
            setDisplayList("conversation");
          }}
          active={displayList === "conversation"}
        >
          Messages
        </Tab>
        <Tab
          defaultClass={`${style.tab}`}
          activeClass={`${style["tab-active"]}`}
          onClick={() => {
            setDisplayList("contact");
          }}
          active={displayList === "contact"}
        >
          Contacts
        </Tab>
      </div>
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
