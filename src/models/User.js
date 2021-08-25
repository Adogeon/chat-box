const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  contact: [{ type: ObjectId, ref: "User" }],
  box: [{ type: ObjectId, ref: "Box" }],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
