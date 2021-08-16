const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  hash: String,
  contact: [ObjectId],
  box: [ObjectId],
});

const User = mongoose.model("user", userSchema);

module.exports = User;
