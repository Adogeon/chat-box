import React from "react";
import { NavLink } from "react-router-dom";

import ConversationBrief from "../ConversationBrief";

import link from "./link.module.css";

const ConversationList = ({ data }) => {
  return (
    <>
      {data.map((box) => (
        <NavLink
          className={link.normal}
          activeClassName={link.active}
          to={`/chat/${box._id}`}
        >
          <ConversationBrief
            name={box.name}
            recentMS={box.latestMessage}
            member={box.member}
            isDm={box.isDM}
          />
        </NavLink>
      ))}
    </>
  );
};

export default ConversationList;
