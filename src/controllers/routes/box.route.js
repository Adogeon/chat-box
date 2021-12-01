const router = require("express").Router();

const isAuth = require("../middleware/isAuth.js");

router.get("/:boxId", isAuth, async (req, res, next) => {
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const boxService = container.get("boxService");
    const boxData = await boxService.loadBox({ _id: req.params.boxId });
    res.json(boxData);
  } catch (error) {
    next(error);
  }
});

router.post("/new", isAuth, async (req, res, next) => {
  //const boxService = new BoxService(BoxModel, UserModel, req.token.userId);
  try {
    const container = req.app.get("context");
    container.register("currentUser", req.token.userId);
    const boxService = container.get("boxService");
    const newBoxRecord = await boxService.createConversation(
      req.body.detail,
      req.body.users
    );
    res.json(newBoxRecord);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
