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
  const updateUserData = await userService.addContact(req.body.username);
  res.json(updateUserData);
});

router.post("/request", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  try {
    await userService.sendFriendRequest(req.body.contactId);
    res.status(200).json({
      message: `Friend request has been sent to User ${req.body.contactId}`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/accept", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  try {
    await userService.acceptFriendRequest(req.body.pendingId);
    res.status(200).json({
      message: `Friend request ${req.body.pendingId} approve`,
    });
  } catch (error) {
    res.status(500).json({ error });
  }
});

module.exports = router;
