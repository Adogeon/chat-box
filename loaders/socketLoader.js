const { Server: SocketServer } = require("socket.io");

/**
 * Async loader to initilze socket io
 *
 * @returns io instance
 */
module.exports = async (httpServer) => {
  const io = new SocketServer(httpServer);

  io.on("connection", (socket) => {
    console.log("a user is connected");
    console.log(socket.id);

    socket.on("room", (data) => {
      console.log("room join");
      console.log(data);
      socket.join(data.room);
    });

    socket.on("leave room", (data) => {
      console.log("leaving room");
      console.log(data);
      socket.leave(data.room);
    });

    socket.on("newMessage", (data) => {
      console.log(data);
      socket.broadcast.to(data.room).emit("message", data.message);
    });
  });

  //adding socketio middleware

  return io;
};
