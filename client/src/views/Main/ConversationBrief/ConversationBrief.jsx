import React from "react";
import { useSelector } from "react-redux";


import dateParser from "../../../adapters/dateParser";

import style from "./ConversationBrief.module.css";

const ConversationBrief = ({ id, name, recentMS, update, member, isDm }) => {
  const userState = useSelector((state) => state.user);
  
  return (
    <button className={style.tab}>
      <div className={style.photo}></div>
      <div className={style.detail}>
        <div className={style.top}>
          {isDm ? (
            member
              .filter((person) => person._id !== userState.userId)
              .map((person) => (
                <div className={style.name}>{person.username}</div>
              ))
          ) : (
            <div className={style.name}>{name}</div>
          )}
        </div>
        <div className={style.bottom}>{recentMS.body}</div>
      </div>
      <div className={style.extra}>{dateParser(recentMS.date)}</div>
    </button>
  );
};

export default ConversationBrief;
