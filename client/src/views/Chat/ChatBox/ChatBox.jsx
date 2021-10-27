import React, { useEffect } from "react";

import style from "./chatbox.module.css";
import socket from "../../../adapters/socket";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoom,
  updateRoom,
  updateLog,
} from "../../../store/room/room.slices.js";
import LogArea from "../LogArea/LogArea";
import InputArea from "../InputArea/InputArea";

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  //const { roomId } = useParams();

  useEffect(() => {
    if (authState.isAuth === true) {
      const firstRoomId = roomState.allRooms.ids[0] || "";
      console.log("firstRoom: ", firstRoomId);
      dispatch(getCurrentRoom(firstRoomId));
    }
  }, [authState]);

  useEffect(() => {
    socket.auth = { token: localStorage.getItem("authToken") };
    socket.connect();
    //joining a test room
    socket.on("connect", () => {
      socket.emit("room", { room: roomState.currentRoom._id });
    });
    socket.on("roomLoaded", (payload) => {
      console.log("Room Loaded by socket");
      //boxDispatch({ type: "LOAD_BOX" });
    });
    //sending message
    socket.on("message", ({ newRecord }) => {
      dispatch(updateLog(newRecord));
      dispatch(
        updateRoom({
          id: boxId,
          update: {
            key: "latestMessage",
            value: newRecord,
          },
        })
      );
    });

    return function cleaningUp() {
      socket.emit("leave");
      socket.disconnect();
      console.log("should remove socket");
    };
  }, [roomState.curentRoom]);

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
