const router = require("express").Router();

const UserModel = require("../../models/User");
const BoxModel = require("../../models/Box");
const BoxService = require("../../services/box");

const isAuth = require("../middleware/isAuth.js");

router.get("/:boxId", isAuth, async (req, res) => {
  const boxService = new BoxService(BoxModel, UserModel, req.token.userId);
  const boxData = await boxService.loadBox({ id: req.params.boxId });
  res.json(boxData);
});

router.post("/new", isAuth, async (req, res) => {
  console.log(req.body);
  console.log(req.token);
  const boxService = new BoxService(BoxModel, UserModel, req.token.userId);
  const newBoxRecord = await boxService.createConversation(
    req.body.detail,
    req.body.users
  );
  res.json(newBoxRecord);
});

module.exports = router;
