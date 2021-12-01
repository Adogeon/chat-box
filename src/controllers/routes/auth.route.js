const { createNextState } = require("@reduxjs/toolkit");

const router = require("express").Router();

router.post("/signin", async (req, res, next) => {
  try {
    const container = req.app.get("context");
    const authService = container.get("authService");
    const user = await authService.signIn(req.body);
    const token = await authService.generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.post("/signup", async (req, res, next) => {
  try {
    const container = req.app.get("context");
    const authService = container.get("authService");
    const user = await authService.signUp(req.body);
    const token = await authService.generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
