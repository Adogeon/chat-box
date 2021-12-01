const router = require("express").Router();

const { createNextState } = require("@reduxjs/toolkit");
const isAuth = require("../middleware/isAuth.js");
const getUserService = require("../middleware/service").default;

router.get("/current", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const userService = container.get("userService");
    const currentUserData = await userService.getCurrent();
    res.json(currentUserData);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", (req, res) => {
  //return user data
});

router.get("/current/pending", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const userService = container.get("userService");
    const PopulatedPendingReq = await userService.getCurrentPendingReq();
    res.json(PopulatedPendingReq);
  } catch (error) {
    next(error);
  }
});

router.get("/current/contact", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const userService = container.get("userService");
    const PopulatedContact = await userService.getCurrentContact();
    res.json(PopulatedContact);
  } catch (error) {
    next(error);
  }
});

router.post("/request", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const userService = container.get("userService");

    const result = await userService.sendFriendRequest(req.body.username);
    const io = req.app.get("socket_io");
    io.to(result.to).emit("newFriendRequest", result.request);
    res.status(200).json({
      message: `Friend request has been sent to User ${req.body.username}`,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/request/accept", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const userService = container.get("userService");

    const result = await userService.acceptFriendRequest(req.body.pendingId);
    res.status(200).json({
      message: `Friend request ${req.body.pendingId} approve`,
      pending: result,
    });
  } catch (error) {
    console.log(error);
    next({ error });
  }
});

router.post("/request/delete", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    console.log(req.token.userId);
    container.register("currentUser", req.token.userId);
    const userService = container.get("userService");
    const result = await userService.deleteFriendRequest(req.body.pendingId);
    res.status(200).json({
      message: `Friend request ${req.body.pendingId} delete`,
      pending: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
