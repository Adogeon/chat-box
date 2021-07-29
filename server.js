const express = require("express");
const app = express();
const server = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const PORT = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/message", (req, res) => {
  console.log("hello");
  io.emit("message", req.body);
  red.sent(req.body);
});

io.on("connection", () => {
  console.log("a user is connected");
});

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
