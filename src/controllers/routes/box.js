const router = require("express").Router();

const isAuth = require("../middleware/isAuth.js");

router.get("/:boxId", isAuth, async (req, res) => {
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const boxService = container.get("boxService");
  const boxData = await boxService.loadBox({ id: req.params.boxId });
  res.json(boxData);
});

router.post("/new", isAuth, async (req, res) => {
  //const boxService = new BoxService(BoxModel, UserModel, req.token.userId);
  const container = req.app.get("context");
  container.register("currentUser", req.token.userId);
  const boxService = container.get("boxService");
  const newBoxRecord = await boxService.createConversation(
    req.body.detail,
    req.body.users
  );
  res.json(newBoxRecord);
});

module.exports = router;
