import React from "react";

import dateParser from "../../../../../adapters/dateParser";
import { useUserState } from "../../../../../contexts/userContext";

import style from "./converBrief.module.css";

const ConversationBrief = ({ name, recentMS, update, member, isDm }) => {
  const userState = useUserState();
  return (
    <div className={style.tab}>
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
          <div>{dateParser(recentMS.date)}</div>
        </div>
        <div className={style.bottom}>{recentMS.body}</div>
      </div>
    </div>
  );
};

export default ConversationBrief;
