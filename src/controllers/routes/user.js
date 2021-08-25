const router = require("express").Router();

const isAuth = require("../middleware/isAuth.js");
const UserService = require("../../services/user");
const UserModel = require("../../models/User");

router.get("/current", isAuth, async (req, res) => {
  const userService = new UserService(UserModel, {}, req.token.userId);
  const currentUserData = await userService.getCurrent();
  res.json(currentUserData);
});

router.get("/user/:id", (req, res) => {
  //return user data
});

router.post("/user/conversation/new", (req, res) => {
  //create a new conversation
});

router.post("/user/contact/:id", (req, res) => {
  //add new contact for the user
});

module.exports = router;
