import React from "react";

const ConversationList = ({ data }) => {
  return (
    <>
      {data.map((box) => (
        <div>{box.name}</div>
      ))}
    </>
  );
};

export default ConversationList;
