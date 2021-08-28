import React from "react";

import dateParser from "../../../../../adapters/dateParser";

import style from "./converBrief.module.css";

const ConversationBrief = ({ name, recentMS, update }) => {
  return (
    <div className={style.tab}>
      <div className={style.photo}></div>
      <div className={style.detail}>
        <div className={style.top}>
          <p>{name}</p>
          <p>{dateParser(recentMS.date)}</p>
        </div>
        <div className={style.bottom}>{recentMS.body}</div>
      </div>
    </div>
  );
};

export default ConversationBrief;
