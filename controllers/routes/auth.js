const router = require("express").Router();

router.post("/signin", (req, res) => {
  res.json({ message: "received", data: req.body });
});

module.exports = router;
