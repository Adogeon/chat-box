import React, { useState } from "react";

import button from "../../../styles/Button/button.module.css";
import style from "./input.module.css";

const InputArea = (props) => {
  const [value, setValue] = useState("");
  const socket = props.socket;

  const handleClick = () => {
    console.log("value", value);
    console.log("RoomID", props.roomId);
    socket.emit("newMessage", { room: props.roomId, message: value });
    setValue("");
  };

  return (
    <div className={style.inputArea}>
      <textarea
        row="2"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
        }}
      ></textarea>
      <button className={button.outline} onClick={() => handleClick()}>
        Send
      </button>
    </div>
  );
};

export default InputArea;
