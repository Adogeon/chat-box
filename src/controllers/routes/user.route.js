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

router.get("/current/pending", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  const PopulatedPendingReq = await userService.getCurrentPendingReq();
  res.json(PopulatedPendingReq);
});

router.get("/current/contact", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  const PopulatedContact = await userService.getCurrentContact();
  res.json(PopulatedContact);
});

router.post("/asasdfasdf/addContact", isAuth, async (req, res) => {
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
    const result = await userService.sendFriendRequest(req.body.username);
    const io = req.app.get("socket_io");
    io.to(result.to).emit("newFriendRequest", result.request);
    res.status(200).json({
      message: `Friend request has been sent to User ${req.body.username}`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post("/request/accept", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  try {
    const result = await userService.acceptFriendRequest(req.body.pendingId);
    res.status(200).json({
      message: `Friend request ${req.body.pendingId} approve`,
      pending: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post("/request/delete", isAuth, async (req, res) => {
  console.log(req);
  const container = req.app.get("context");
  console.log(req.token.userId);
  container.register("currentUser", req.token.userId);
  const userService = container.get("userService");
  try {
    const result = await userService.deleteFriendRequest(req.body.pendingId);
    res.status(200).json({
      message: `Friend request ${req.body.pendingId} delete`,
      pending: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = router;
