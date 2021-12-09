const User = require("../models/User.model");
const Box = require("../models/Box.model");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const seedTestChat = async () => {
  const connection = await mongoose.connect("mongodb://127.0.0.1:51442/");
  await connection.connection.dropDatabase();

  const hash = await bcrypt.hash("testtesttest", 10);
  const data = [
    {
      username: "testbot1",
      email: "test1@bot.com",
      hash,
    },
    {
      username: "testbot2",
      email: "test2@bot.com",
      hash,
    },
  ];

  const user1 = new User(data[0]);
  console.log("user1", user1);
  const user2 = new User(data[1]);
  console.log("user2", user2);

  user1.contact.push(user2._id);
  user2.contact.push(user1._id);

  const newBox = new Box({ name: "testbox", member: [user1._id, user2._id] });

  user1.box.push(newBox._id);
  user2.box.push(newBox._id);

  await user1.save();
  await user2.save();
  await newBox.save();
  return user1;
};

module.exports = {
  seedTestChat,
};
