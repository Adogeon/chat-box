const mongoose = require("mongoose");

const { Schema } = mongoose;

const boxSchema = Schema({
  member: [mongoose.ObjectId],
  log: [{ body: String, date: Date, by: mongoose.ObjectId }],
  name: String,
  tag: String,
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
