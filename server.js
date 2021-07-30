const express = require("express");
const http = require("http");
const init = require("./loaders");

const PORT = process.env.PORT || 8000;

const startServer = async () => {
  const app = express();
  const server = http.createServer(app);

  await init({ httpServer: server, expressApp: app });

  server.listen(PORT, () => {
    console.log("Server starting at " + PORT);
  });
};

startServer();
