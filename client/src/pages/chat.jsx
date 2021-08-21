import React, { useState, useEffect } from "react";
import socket from "../adapters/socket";
import { useAuthState } from "../contexts/authContext";

import main from "../styles/ChatPages/main.module.css";
import button from "../styles/Button/button.module.css";

function ChatPage() {
  const authState = useAuthState();
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (authState.isAuth) {
      socket.auth = { token: authState.token };
      socket.connect();
      //joining a test room
      socket.on("connect", () => {
        socket.emit("room", { room: "test-room" });
      });
      socket.on("roomLoaded", (payload) => {

        setMessages((prevMess) => {
          return [...prevMess, ...payload];
        });
      });

      //sending message
      socket.on("message", (payload) => {
        console.log("receiving message");
        console.log(payload);
        setMessages((prevMess) => {
          return [...prevMess, payload];
        });
      });
    }
  }, []);

  useEffect(() => {
    return () => {
      socket.emit("leave");
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    socket.emit("newMessage", { room: "test-room", message: value });
    const newMessage = { text: value, username: authState.username };
    console.log(newMessage);
    setMessages((prevMess) => {
      return [...prevMess, newMessage];
    });
    console.log(messages);
    setValue("");
  };

  return (
    <main className={main.container}>
      <h1>Chat Page</h1>
      <div className={main.textArea}>
        {messages.map((message) => (
          <div className={main.message}>
            {message.username !== authState.username && (
              <div className={main.user}>{message.username}</div>
            )}
            <div className={main.text}>{message.text}</div>
          </div>
        ))}
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
      </div>
    </main>
  );
}

export default ChatPage;
