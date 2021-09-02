const UserModel = require("../../models/User");
const BoxModel = require("../../models/Box");
const UserService = require("../../services/user");
const BoxService = require("../../services/box");

module.exports = (io, socket) => {
  const userService = new UserService(UserModel, BoxModel, socket.userId);
  const boxService = new BoxService(BoxModel, UserModel, socket.userId);
  const joinRoom = async (roomId) => {
    socket.join(roomId);
    userService.joinRoom(roomId);
    const boxRecord = await boxService.loadBox(roomId);
    socket.emit("room:loaded", boxRecord);
  };

  const leaveRoom = async (roomId) => {
    socket.leave(roomId);
  };

  const newMessage = async (payload) => {
    await boxService.addMessage(payload.room, payload.message);
    const currentUser = await userService.getCurrent();
    socket.to(payload.room).emit("message", { message, user: currentUser });
  };

  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
  socket.on("room:newMessage", newMessage);

  //prototype function
  socket.on("room", async ({ room }) => {
    console.log("joining room");
    //creating box record for prototype
    socket.join(room);
  });

  socket.on("newMessage", async ({ room, message }) => {
    console.log("sending new message");
    const boxRecord = await BoxModel.findOne({ name: room });
    const newRecord = {
      body: message,
      user: this.currentUserId,
      username: socket.username,
      date: new Date(),
    };
    await boxService.addMessage(boxRecord._id, newRecord);
    io.in(room).emit("message", { newRecord });
  });
};
