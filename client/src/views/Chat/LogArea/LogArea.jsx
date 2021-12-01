import React from "react";

import style from "./LogArea.module.css";

const LogArea = (props) => {
  return (
    <div className={style.container}>
      <div className={style.main}>
        {props.log?.map((message, index) => {
          return message.username === props.currentUsername ? (
            <div className={style.self} key={`message-${index}`}>
              <div className={style.text}>{message.body}</div>
            </div>
          ) : (
            <div className={style.other} key={`message-${index}`}>
              <div className={style.user}>{message.username}</div>
              <div className={style.text}>{message.body}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LogArea;
