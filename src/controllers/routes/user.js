const router = require("express").Router();

const isAuth = require("../middleware/isAuth.js");

router.get("/current", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  const currentUserData = await userService.getCurrent();
  res.json(currentUserData);
});

router.get("/:id", (req, res) => {
  //return user data
});

router.post("/addContact", isAuth, async (req, res) => {
  //add new contact for the user
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  const updateUserData = await userService.addContact(req.body.userId);
  res.json(updateUserData);
});

module.exports = router;
