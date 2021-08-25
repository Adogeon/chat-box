const router = require("express").Router();
const AuthService = require("../../services/auth.js");
const UserModel = require("../../models/User.js");

router.post("/signin", async (req, res) => {
  try {
    const authService = new AuthService(UserModel);
    const user = await authService.signIn(req.body);
    const token = await authService.generateToken(user);
    console.log(user._id);
    res.json({ userId: user._id, username: user.username, user, token });
  } catch (error) {
    res.json({ message: "error happen", error });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const authService = new AuthService(UserModel);
    const user = await authService.signUp(req.body);
    const token = await authService.generateToken(user);
    res.json({ userId: user._id, username: user.username, user, token });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

module.exports = router;
