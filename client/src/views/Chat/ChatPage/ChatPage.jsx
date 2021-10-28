import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import socket from "../../../adapters/socket";
import { useSelector, useDispatch } from "react-redux";
import { getRoom, updateLog } from "../../../store/room/room.slices.js";
import { updateRoom } from "../../../store/user/user.slices";
import style from "./ChatPage.module.css";

import LogArea from "../LogArea/LogArea.jsx";
import InputArea from "../InputArea/InputArea.jsx";

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const roomState = useSelector((state) => state.room);
  const { roomId } = useParams();

  useEffect(() => {
    dispatch(getRoom(roomId));
  }, []);

  useEffect(() => {
    if (authState.isAuth) {
      socket.auth = { token: authState.token };
      socket.connect();
      //joining a test room
      socket.on("connect", () => {
        socket.emit("room", { room: roomId });
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
    <main className={style.container}>
      <LogArea log={roomState.roomLog} currentUsername={userState.username} />
      <InputArea socket={socket} roomId={roomId} />
    </main>
  );
};

//import components
import Layout from "../../../components/layout/Layout";
import ChatBox from "../ChatBox/ChatBox";
import ChatMenu from "../ChatMenu/ChatMenu";

export const ChatView = () => {
  return <Layout side={<ChatMenu />} main={<ChatBox />} />;
};

export default ChatPage;
