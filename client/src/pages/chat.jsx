import React, { useEffect } from "react";
import socket from "../adapters/socket";
import { useParams } from "react-router";
import { useAuthState } from "../contexts/authContext";
import { useUserState } from "../contexts/userContext";
import { useBoxState, useBoxDispatch, loadBox } from "../contexts/boxContext";

import main from "../styles/ChatPages/main.module.css";

import Layout from "../components/common/Layout";
import { LogArea, InputArea } from "../components/ChatPage";

const ChatPage = (props) => {
  const authState = useAuthState();
  const userState = useUserState();
  const boxState = useBoxState();
  const boxDispatch = useBoxDispatch();

  const { boxId } = useParams();

  useEffect(() => {
    loadBox(boxDispatch, boxId, authState.token);
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
        boxDispatch({ type: "UPDATE_LOG", payload: newRecord });
        boxDispatch({
          type: "UPDATE_BOX",
          payload: {
            id: boxId,
            update: {
              key: "latestMessage",
              value: newRecord,
            },
          },
        });
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
      <main className={main.container}>
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
