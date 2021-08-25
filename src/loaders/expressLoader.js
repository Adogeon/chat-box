const express = require("express");

const isAuth = require("../controllers/middleware/isAuth");

const authRouter = require("../controllers/routes/auth.js");
const userRouter = require("../controllers/routes/user.js");
//Async loader to initilize express app;
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", authRouter);
  app.use("/user", userRouter);

  return app;
};
