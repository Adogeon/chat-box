const mongoose = require("mongose");

const { Schema } = mongoose;

const boxSchema = Schema({
  member: [mongoose.ObjectId],
  log: [mongoose.ObjectId],
  name: String,
  tag: String,
});

const Box = mongoose.model("Box", boxSchema);

module.exports = Box;
