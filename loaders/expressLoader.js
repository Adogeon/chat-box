const express = require("express");
const authRouter = require("../controllers/routes/auth.js");
//Async loader to initilize express app;
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/", authRouter);

  return app;
};
