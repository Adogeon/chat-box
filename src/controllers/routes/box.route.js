const router = require("express").Router();
const isAuth = require("../middleware/isAuth.js");
const { getBoxService } = require("../middleware/service.js");

router.get("/:boxId", isAuth, getBoxService, async (req, res, next) => {
  try {
    const boxService = req.service;
    const boxData = await boxService.loadBox({ _id: req.params.boxId });
    res.json(boxData);
  } catch (error) {
    next(error);
  }
});

router.post("/new", isAuth, getBoxService, async (req, res, next) => {
  //const boxService = new BoxService(BoxModel, UserModel, req.token.userId);
  try {
    const boxService = req.service;
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
