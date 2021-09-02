import React, { useState, useEffect } from "react";
import socket from "../adapters/socket";
import { useParams } from "react-router";
import { useAuthState } from "../contexts/authContext";
import { useUserState } from "../contexts/userContext";
import { useBoxState, useBoxDispatch, loadBox } from "../contexts/boxContext";

import main from "../styles/ChatPages/main.module.css";
import button from "../styles/Button/button.module.css";

import Layout from "../components/common/Layout";

function ChatPage(props) {
  const authState = useAuthState();
  const userState = useUserState();
  const boxState = useBoxState();
  const boxDispatch = useBoxDispatch();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  const { boxId } = useParams();

  useEffect(() => {
    loadBox(boxDispatch, boxId, authState.token);
  }, []);

  useEffect(() => {
    console.log(boxState);
  }, [boxState]);

  useEffect(() => {
    if (authState.isAuth) {
      socket.auth = { token: authState.token };
      socket.connect();
      //joining a test room
      socket.on("connect", () => {
        socket.emit("room", { room: "test-room" });
      });
      socket.on("roomLoaded", (payload) => {
        console.log("Room Loaded by socket");
        //boxDispatch({ type: "LOAD_BOX" });
      });
      //sending message
      socket.on("message", ({ newRecord }) => {
        boxDispatch({ type: "UPDATE_LOG", payload: newRecord });
      });
    }
    return function cleaningUp() {
      socket.emit("leave");
      socket.disconnect();
      console.log("should remove socket");
    };
  }, []);

  const handleClick = () => {
    socket.emit("newMessage", { room: "test-room", message: value });
    const newMessage = { text: value, username: userState.username };
    setValue("");
  };

  return (
    <Layout>
      <main className={main.container}>
        <h1>Chat Page</h1>
        <div className={main.textArea}>
          {boxState.currentLog.map((message) => {
            return (
              <div className={main.message}>
                {message.username !== userState.username && (
                  <div className={main.user}>{message.username}</div>
                )}
                <div className={main.text}>{message.body}</div>
              </div>
            );
          })}
        </div>
        <div className={main.inputArea}>
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
      </main>
    </Layout>
  );
}

export default ChatPage;
