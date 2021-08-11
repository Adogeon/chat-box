const { Server: SocketServer } = require("socket.io");
const isAuth = require("../controllers/middleware/isAuth.js");
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

  io.use(wrap(isAuth));

  io.use((socket, next) => {
    if (socket.requrest.token) {
      next();
    } else {
      next(new Error("Unauthorized"));
    }
  });

  const onConnection = (socket) => {
    registerRoomHandlers(io, socket);
  };

  io.on("connection", onConnection);

  return io;
};
