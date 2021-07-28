import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import io from "socket.io-client";

function App() {
  const [value, setValue] = useState("");
  const [message, setMessage] = useState([]);
  const socket = io("/");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessage((prevMess) => {
        return { ...prevMess, message };
      });
    });
  }, [socket]);

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
        <button>Submit</button>
      </header>
      {message.map((text) => (
        <div>{text}</div>
      ))}
    </div>
  );
}

export default App;
