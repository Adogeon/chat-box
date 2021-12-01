const verifyToken = async (socket, next) => {
  const token = socket.handshake.auth.token;
  const container = socket.request.container;

  if (token) {
    const authService = container.get("authService");
    try {
      const user = await authService.validateToken(token);
      socket.user = user;
      socket.userId = user._id;
      socket.username = user.username;
      next();
    } catch (error) {
      console.log(error);
      return next(new Error("Invalid authorization"));
    }
  } else {
    return next();
  }
};

const registerUserHandlers = (socket) => {
  socket.join(socket.userId);
  console.log(socket.user);
  socket.user.contact.concat(socket.user.box).map((roomId) => {
    socket.to(roomId).emit("a user is online", { user: socket.userId });
  });

  socket.on("disconnect", () => {
    socket.user.contact.concat(socket.user.box).map((roomId) => {
      socket.to(roomId).emit("a user is offline", { user: socket.userId });
    });
  });
};

module.exports = { verifyToken, registerUserHandlers };
