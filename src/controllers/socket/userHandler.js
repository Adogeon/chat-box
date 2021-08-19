const UserModel = require("../../models/User");
const AuthService = require("../../services/auth");

const verifyToken = async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    const authService = new AuthService(UserModel);
    try {
      const user = await authService.verifyToken(token);
      socket.user = user;
      socket.userId = user._id;
      next();
    } catch (error) {
      return next(new Error("Invalid authorization"));
    }
  } else {
    return next();
  }
};

const registerUserHandler = (socket) => {
  socket.join(socket.userId);

  socket.user.contact.concat(socket.user.box).map((roomId) => {
    socket.to(roomId).emit("a user is online", { user: userId });
  });

  socket.on("disconnect", () => {
    socket.user.contact.concat(socket.user.box).map((roomId) => {
      socket.to(roomId).emit("a user is offline", { user: userId });
    });
  });
};

module.exports = { verifyToken, registerUserHandler };
