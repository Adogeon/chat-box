const Container = require("../services/container");

const UserModel = require("../models/User");
const BoxModel = require("../models/Box");

const UserService = require("../services/user");
const BoxService = require("../services/box");
const AuthService = require("../services/auth");

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

  console.log(container);

  return container;
};
