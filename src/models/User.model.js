const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  contact: [{ type: ObjectId, ref: "User" }],
  pending: [{ user: { type: ObjectId, ref: "User" }, date: Date }],
  box: [{ type: ObjectId, ref: "Box" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
