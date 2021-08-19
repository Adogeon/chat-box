import React, { useState, useEffect } from "react";
import socket from "../adapters/socket";
import { useAuthState } from "../contexts/authContext";

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
      //socket.emit("room:leave");
      socket.disconnect();
    };
  }, []);

  const handleClick = () => {
    console.log("emitting new message");
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
    <main>
      <h1>Chat Page</h1>
      <div className="textArea">
        {messages.map((message) => (
          <div>
            <span>{message.username} say:</span>
            <span>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="inputArea">
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button onClick={() => handleClick()}>Submit</button>
      </div>
    </main>
  );
}

export default ChatPage;
