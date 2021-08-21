const mongoose = require("mongoose");

const { Schema } = mongoose;

const boxSchema = Schema({
  member: [mongoose.ObjectId],
  log: [
    { body: String, date: Date, user: mongoose.ObjectId, username: String },
  ],
  name: String,
  tag: String,
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
