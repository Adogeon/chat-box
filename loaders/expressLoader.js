const express = require("express");

//Async loader to initilize express app;
module.exports = (app) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.get("/", (req, res) => {
    res.send("Hello World");
  });

  return app;
};
