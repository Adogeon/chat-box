const { Server: SocketServer } = require("socket.io");
const {
  verifyToken,
  registerUserHandlers,
} = require("../controllers/socket/userHandler.js");
const registerRoomHandlers = require("../controllers/socket/roomHandler.js");

const wrap = (middleware) => (socket, next) =>
  middleware(socket.request, {}, next);

/**
 * Async loader to initilze socket io
 *
 * @returns io instance
 */
module.exports = async (httpServer) => {
  const io = new SocketServer(httpServer);

  io.use(verifyToken);

  const onConnection = (socket) => {
    registerUserHandlers(socket);
    registerRoomHandlers(io, socket);
  };

  io.on("connection", onConnection);

  return io;
};
