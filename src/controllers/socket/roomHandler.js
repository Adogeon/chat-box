module.exports = (io, socket) => {
  const container = socket.request.container;
  container.register("currentUser", socket.userId);
  const boxService = container.get("boxService");

  const joinRoom = async ({ room }) => {
    socket.join(room);
  };

  const leaveRoom = async (roomId) => {
    socket.leave(roomId);
  };

  const newMessage = async ({ room, message }) => {
    const newRecord = {
      body: message,
      user: this.currentUserId,
      username: socket.username,
      date: new Date(),
    };
    await boxService.addMessage(room, newRecord);
    io.in(room).emit("message", { newRecord });
  };

  socket.on("room:join", joinRoom);
  socket.on("room:leave", leaveRoom);
  socket.on("room:newMessage", newMessage);

  //prototype function
  socket.on("room", async ({ room }) => {
    console.log("joining room");
    console.log(room);
    //creating box record for prototype
    socket.join(room);
  });

  socket.on("newMessage", async ({ room, message }) => {
    console.log(room);
    console.log("sending new message");
    const newRecord = {
      body: message,
      user: this.currentUserId,
      username: socket.username,
      date: new Date(),
    };
    await boxService.addMessage(room, newRecord);
    io.in(room).emit("message", { newRecord });
  });
};
