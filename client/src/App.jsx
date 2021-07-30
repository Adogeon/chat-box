import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

const socket = io();

function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);

  useEffect(() => {
    console.log("Joining test room");
    socket.emit("room", { room: "test-room" });

    return () => {
      console.log("Leaving room");
      socket.emit("leave room", {
        room: "test-room",
      });
    };
  });

  useEffect(() => {
    socket.on("message", (payload) => {
      console.log("receiving message");
      console.log(payload);
      setMessage((prevMess) => {
        return [...prevMess, payload];
      });
    });
  }, []);

  const handleClick = () => {
    console.log("emitting new message");
    socket.emit("newMessage", { room: "test-room", message: value });
    setMessage((prevMess) => {
      return [...prevMess, value];
    });
    setValue("");
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        ></input>
        <button onClick={() => handleClick()}>Submit</button>
        {message.map((text) => (
          <div style={{ fontColor: "white" }}>{text}</div>
        ))}
      </header>
    </div>
  );
}

export default App;
