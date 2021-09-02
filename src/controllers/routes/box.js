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

module.exports = router;
