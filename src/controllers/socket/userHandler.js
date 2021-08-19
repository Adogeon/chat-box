const UserModel = require("../../models/User");
const AuthService = require("../../services/auth");

const verifyToken = async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (token) {
    const authService = new AuthService(UserModel);
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

  socket.user.contact.concat(socket.user.box).map((roomId) => {
    socket.to(roomId).emit("a user is online", { user: userId });
  });

  socket.on("disconnect", () => {
    socket.user.contact.concat(socket.user.box).map((roomId) => {
      socket.to(roomId).emit("a user is offline", { user: userId });
    });
  });
};

module.exports = { verifyToken, registerUserHandlers };
