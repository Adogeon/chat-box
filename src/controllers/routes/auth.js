const router = require("express").Router();

router.post("/signin", async (req, res) => {
  try {
    const container = req.app.get("context");
    const authService = container.get("authService");
    const user = await authService.signIn(req.body);
    const token = await authService.generateToken(user);
    res.json({ token });
  } catch (error) {
    res.json({ message: "error happen", error });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const container = req.app.get("context");
    const authService = container.get("authService");
    const user = await authService.signUp(req.body);
    const token = await authService.generateToken(user);
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
});

module.exports = router;
