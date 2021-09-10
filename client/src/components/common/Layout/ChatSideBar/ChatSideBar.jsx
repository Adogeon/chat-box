import React, { useState, useEffect } from "react";
import { useUserState } from "../../../../contexts/userContext";
import {
  useBoxState,
  useBoxDispatch,
  loadAllBox,
} from "../../../../contexts/boxContext";
import ConversationList from "./ConversationList";

import style from "./chatbar.module.css";

const ChatSideBar = () => {
  const userState = useUserState();
  const boxDispatch = useBoxDispatch();
  useEffect(() => {
    loadAllBox(boxDispatch, userState.box);
  }, []);

  const [filter, setFilter] = useState("type:dm");
  const [displayList, setDisplayList] = useState([]);
  const boxState = useBoxState();
  useEffect(() => {
    let boxList = [...boxState.userBoxes];
    console.log("boxList", boxList);
    switch (filter) {
      case "type:dm":
        boxList = boxList
          .filter(([key, value]) => {
            return value.isDM;
          })
          .map((data) => data[1]);
        break;
      case "type:group":
        boxList = boxList
          .filter(([key, value]) => {
            return !value.isDm;
          })
          .map((data) => data[1]);
        break;
      case "type:saved":
        boxList = boxList
          .filter(([key, value]) => {
            return value.saved;
          })
          .map(([key, value]) => value);
      default:
        return boxList;
    }
    setDisplayList(boxList);
    console.log("displayList", displayList);
  }, [filter, boxState]);

  return (
    <div className={style.sidebar}>
      <h2 className="logo">Chat Box</h2>
      <ConversationList data={displayList} />
      <div className="sectionList">
        <button>All Message</button>
        <button>Archived</button>
        <button>Saved</button>
      </div>
    </div>
  );
};

export default ChatSideBar;
