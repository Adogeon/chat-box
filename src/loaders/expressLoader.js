const express = require("express");

const authRouter = require("../controllers/routes/auth.js");
const userRouter = require("../controllers/routes/user.js");
const boxRouter = require("../controllers/routes/box.js");
//Async loader to initilize express app;
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", authRouter);
  app.use("/user", userRouter);
  app.use("/box", boxRouter);

  return app;
};
