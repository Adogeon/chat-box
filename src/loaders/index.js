const expressLoader = require("./expressLoader.js");
const mongodLoader = require("./mongodLoader");
const socketLoader = require("./socketLoader");
const container = require("../services/container");
const containerLoader = require("./containerLoader");

module.exports = async ({ httpServer, expressApp }) => {
  const db = await mongodLoader();
  console.log("Initilize Mongodb");

  containerLoader();

  const app = await expressLoader(expressApp);
  console.log("Initilize express app");

  const io = await socketLoader(httpServer);
  console.log("Initilize socket io");

  app.set("db", db);
  app.set("context", container);
  app.set("socket_io", io);
};
