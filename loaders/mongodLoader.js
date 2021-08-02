const mongoose = require("mongoose");

//URL to Mongo DB
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017";

/**
 * Async load MongoDb, return the database
 *
 * @return  database object
 */

module.exports = async () => {
  const connection = await mongoose.connect(URL, { useNewURLParser: true });
  return connection.connection.db;
};
