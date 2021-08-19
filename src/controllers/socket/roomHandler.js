const UserModel = require("../../models/User");
const BoxModel = require("../../models/Box");
const UserService = require("../../services/user");
const BoxService = require("../../services/box");

module.exports = (io, socket) => {
  const userService = new UserService(
    UserModel,
    BoxModel,
    socket.request.token.id
  );
  const boxService = new BoxService(
    BoxModel,
    UserModel,
    socket.request.token.id
  );
  const joinRoom = async (roomId) => {
    socket.join(roomId);
    userService.joinRoom(roomId);
    const boxRecord = await boxService.loadBox(roomId);
    socket.emit("room:loaded", boxRecord);
  };

  const leaveRoom = async () => {
    socket.leave(roomId);
  };

  const newMessage = async (payload) => {
    await boxService.addMessage(payload.room, payload.message);
    const currentUser = await userService.getCurrent();
    socket.to(payload.room).emit({ message, user: currentUser });
  };

  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
  socket.on("room:newMessage", newMessage);
};
