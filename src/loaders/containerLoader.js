const Container = require("../services/container.service");

const UserModel = require("../models/User.model");
const BoxModel = require("../models/Box.model");

const UserService = require("../services/user.service");
const BoxService = require("../services/box.service");
const AuthService = require("../services/auth.service");

module.exports = () => {
  const container = new Container();

  container.register("currentUser", "");
  container.singleton("userModel", UserModel);
  container.singleton("boxModel", BoxModel);
  container.register("userService", UserService, [
    "userModel",
    "boxModel",
    "currentUser",
  ]);
  container.register("boxService", BoxService, [
    "boxModel",
    "userModel",
    "currentUser",
  ]);
  container.register("authService", AuthService, ["userModel"]);

  return container;
};
