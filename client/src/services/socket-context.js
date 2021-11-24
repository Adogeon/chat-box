import React from "react";
import { io } from "socket.io-client";

const URL = "/";
export const socket = io(URL, { autoConnect: false });

export default SocketContext = React.createContext(socket);
