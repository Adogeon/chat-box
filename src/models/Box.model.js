const mongoose = require("mongoose");

const { Schema, ObjectId } = mongoose;

const boxSchema = new Schema({
  member: [{ type: ObjectId, ref: "User" }],
  log: [
    {
      body: String,
      date: Date,
      user: { type: ObjectId, ref: "User" },
      username: String,
    },
  ],
  name: String,
  tag: String,
  isDM: Boolean,
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
