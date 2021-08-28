import React, { useState, useEffect } from "react";
import { useUserState } from "../../../../contexts/userContext";
import ConversationList from "./ConversationList";

import style from "./chatbar.module.css";

const ChatSideBar = () => {
  const userState = useUserState();
  const [mode, setMode] = useState("all");
  const [list, setList] = useState([]);

  console.log(userState.box);

  useEffect(() => {
    setList(
      userState.box.filter((conversation) => {
        switch (mode) {
          case "archived":
            return conversation.archived;
          case "saved":
            return conversation.saved;
          case "all":
          default:
            return true;
        }
      })
    );
  }, [mode, userState]);

  return (
    <div className={style.sidebar}>
      <h2 className="logo">Chat Box</h2>
      <div className="sectionList">
        <button>All Message</button>
        <button>Archived</button>
        <button>Saved</button>
      </div>
      <ConversationList data={list} />
    </div>
  );
};

export default ChatSideBar;
