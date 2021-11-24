const express = require("express");

const authRouter = require("../controllers/routes/auth.route.js");
const userRouter = require("../controllers/routes/user.route.js");
const boxRouter = require("../controllers/routes/box.route.js");
//Async loader to initilize express app;
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", authRouter);
  app.use("/user", userRouter);
  app.use("/box", boxRouter);

  return app;
};
