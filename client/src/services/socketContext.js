import { createContext } from "react";
import { io } from "socket.io-client";

const URL = "/";
export const socket = io(URL, { autoConnect: false });
const socketContext = createContext(socket);
export default socketContext;
