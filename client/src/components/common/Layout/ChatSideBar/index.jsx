import React, { useState, useEffect } from "react";
import { useUserState } from "../../../../contexts/userContext";
import {
  useBoxState,
  useBoxDispatch,
  loadAll,
} from "../../../../contexts/boxContext";
import ConversationList from "./ConversationList";

import style from "./chatbar.module.css";

const ChatSideBar = () => {
  const userState = useUserState();
  const boxState = useBoxState();
  const boxDispatch = useBoxDispatch();
  const [mode, setMode] = useState("all");

  useEffect(() => {
    loadAll(boxDispatch, userState.box);
  }, []);

  useEffect(() => {
    boxDispatch({ type: "CHANGE_DISPLAY", payload: mode });
  }, [mode, userState]);

  return (
    <div className={style.sidebar}>
      <h2 className="logo">Chat Box</h2>
      <div className="sectionList">
        <button>All Message</button>
        <button>Archived</button>
        <button>Saved</button>
      </div>
      <ConversationList data={boxState.displayList} />
    </div>
  );
};

export default ChatSideBar;
