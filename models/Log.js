const mongoose = require("mongoose");

const logSchema = mongoose.Schema({
  message: String,
  sender: mongoose.ObjectId,
  box: mongoose.ObjectId,
});

const Log = mongoose.model("Log", logSchema);

module.exports = Log;
