const container = require("../services/container");

const UserModel = require("../models/User");
const BoxModel = require("../models/Box");

const UserService = require("../services/user");
const BoxService = require("../services/box");
const AuthService = require("../services/auth");

module.exports = () => {
  container.register("userModel", UserModel);
  container.register("boxModel", BoxModel);
  container.register("userService", UserService, ["userModel", "boxModel"]);
  container.register("boxSerive", BoxService, ["boxModel", "userModel"]);
  container.register("authService", AuthService, ["userModel"]);
};
