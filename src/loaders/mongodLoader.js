const mongoose = require("mongoose");

//URL to Mongo DB
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/chatbox";

/**
 * Async load MongoDb, return the database
 *
 * @return  database object
 */

module.exports = async () => {
  //mongoose.set("debug", true);
  const connection = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection.connection.db;
};
