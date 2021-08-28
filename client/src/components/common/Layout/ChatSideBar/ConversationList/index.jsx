import React from "react";
import { Link } from "react-router-dom";

import ConversationBrief from "../ConversationBrief";

const ConversationList = ({ data }) => {
  return (
    <>
      {data.map((box) => (
        <Link to={`/chat/${box._id}`}>
          <ConversationBrief name={box.name} recentMS={box.latestMessage} />
        </Link>
      ))}
    </>
  );
};

export default ConversationList;
