import { createContext } from "react";
import { io } from "socket.io-client";

const URL = "/";
const socket = io(URL, { autoConnect: false });

const connectSocket = () => {
  socket.auth = { token: localStorage.getItem("authToken") };
  if (socket.auth !== "") {
    socket.connect();
  }
};
export const socketContextValue = { socket, connectSocket };
const socketContext = createContext({ socket: null });
export default socketContext;
