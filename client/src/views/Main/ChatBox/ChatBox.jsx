import React, { useEffect } from "react";

import style from "./chatbox.module.css";
import { useParams } from "react-router";
import socket from "../../../adapters/socket";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoom,
  updateRoom,
  updateLog,
  roomSelector,
} from "../../../store/room/room.slices.js";
import LogArea from "../../Chat/LogArea/LogArea";
import InputArea from "../../Chat/InputArea/InputArea";

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  //const { roomId } = useParams();

  useEffect(() => {
    const firstRoomId = roomState.allRooms.ids[0];
    dispatch(getCurrentRoom(firstRoomId));
  }, []);

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
      <LogArea log={roomState.roomLog} currentUsername={userState.username} />
      <InputArea socket={socket} roomId={roomState.currentRoom._id} />
    </div>
  );
};

export default ChatPage;
