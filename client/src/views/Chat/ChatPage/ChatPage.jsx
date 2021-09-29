import React, { useEffect } from "react";
import { useParams } from "react-router";

import socket from "../../../adapters/socket";
import { useSelector, useDispatch } from "react-redux";
import {
  getCurrentRoom,
  updateRoom,
  updateLog,
} from "../../../store/room/room.slices.js";
import style from "./ChatPage.module.css";

import Layout from "../../../components/common/Layout";
import LogArea from "../LogArea/LogArea.jsx";
import InputArea from "../InputArea/InputArea.jsx";

const ChatPage = (props) => {
  const dispatch = useDispatch();
  const authState = useSelector((state) => state.auth);
  const userState = useSelector((state) => state.user);
  const { boxId } = useParams();

  useEffect(() => {
    dispatch(getCurrentRoom(boxId));
  }, []);

  useEffect(() => {
    if (authState.isAuth) {
      socket.auth = { token: authState.token };
      socket.connect();
      //joining a test room
      socket.on("connect", () => {
        socket.emit("room", { room: boxId });
      });
      socket.on("roomLoaded", (payload) => {
        console.log("Room Loaded by socket");
        //boxDispatch({ type: "LOAD_BOX" });
      });
      //sending message
      socket.on("message", ({ newRecord }) => {
        console.log({ newRecord });
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
    <Layout>
      <main className={style.container}>
        <LogArea
          log={boxState.currentLog}
          currentUsername={userState.username}
        />
        <InputArea socket={socket} roomId={boxId} />
      </main>
    </Layout>
  );
};

export default ChatPage;
