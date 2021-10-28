import React, { useEffect } from "react";

import style from "./chatbox.module.css";
import socket from "../../../adapters/socket";
import { useSelector, useDispatch } from "react-redux";
import { getRoom, updateLog } from "../../../store/room/room.slices.js";
import LogArea from "../LogArea/LogArea";
import InputArea from "../InputArea/InputArea";
import { updateRoom } from "../../../store/user/user.slices";

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const authState = useSelector((state) => state.auth);

  const currentRoomId = useSelector((state) => state.room.currentRoom._id);
  useEffect(() => {
    socket.emit("room", { room: currentRoomId });
  }, [currentRoomId]);

  useEffect(() => {
    if (authState.isAuth === true && !currentRoomId) {
      const firstRoomId = userState.rooms.ids[0] || "";
      console.log("firstRoom: ", firstRoomId);
      dispatch(getRoom(firstRoomId));
    }
  }, [authState]);

  socket.on("message", ({ newRecord }) => {
    dispatch(updateLog(newRecord));
    dispatch(
      updateRoom({
        id: roomState.currentRoom._id,
        update: {
          key: "latestMessage",
          value: newRecord,
        },
      })
    );
  });

  return (
    <div className={style.chatBox}>
      <div className={style.header}>
        <div className={style.label} role="header">
          {roomState.currentRoom.name}
        </div>
        <button>Add people</button>
      </div>
      <LogArea log={roomState.roomLog} currentUsername={userState.username} />
      <InputArea socket={socket} roomId={roomState.currentRoom._id} />
    </div>
  );
};

export default ChatPage;
