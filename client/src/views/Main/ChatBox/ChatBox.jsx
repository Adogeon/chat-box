import React, { useEffect } from "react";

import style from "./chatbox.module.css";
import { useParams } from "react-router";
import socket from "../../../adapters/socket";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoom,
  updateRoom,
  updateLog,
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
    dispatch(getCurrentRoom("611ef581514d69062cfb0bb1"));
  }, []);

  useEffect(() => {
    if (authState.isAuth) {
      socket.auth = { token: authState.token };
      socket.connect();
      //joining a test room
      socket.on("connect", () => {
        socket.emit("room", { room: "611ef581514d69062cfb0bb1" });
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
    }

    return function cleaningUp() {
      socket.emit("leave");
      socket.disconnect();
      console.log("should remove socket");
    };
  }, []);

  return (
    <div className={style.chatBox}>
      <LogArea log={roomState.roomLog} currentUsername={userState.username} />
      <InputArea socket={socket} roomId={"611ef581514d69062cfb0bb1"} />
    </div>
  );
};

export default ChatPage;
