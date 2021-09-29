import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import dateParser from "../../../../../adapters/dateParser";

import style from "./ConversationBrief.module.css";

const ConversationBrief = ({ id, name, recentMS, update, member, isDm }) => {
  const userState = useSelector((state) => state.user);

  return (
    <NavLink
      className={style["link-normal"]}
      activeClassName={style["link-active"]}
      to={`/chat/${id}`}
    >
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
    </NavLink>
  );
};

export default ConversationBrief;
