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

/*app.post("/message", (req, res) => {
  console.log("hello");
  io.emit("message", req.body);
  res.send(req.body);
});*/

io.on("connection", (socket) => {
  console.log("a user is connected");
  console.log(socket.id);

  socket.on("room", (data) => {
    console.log("room join");
    console.log(data);
    socket.join(data.room);
  });

  socket.on("leave room", (data) => {
    console.log("leaving room");
    console.log(data);
    socket.leave(data.room);
  });

  socket.on("newMessage", (data) => {
    console.log(data);
    socket.broadcast.to(data.room).emit("message", data.message);
  });
});

server.listen(PORT, () => {
  console.log("server is running on port " + PORT);
});
