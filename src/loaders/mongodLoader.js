const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
//URL to Mongo DB

/**
 * Async load MongoDb, return the database
 *
 * @return  database object
 */

module.exports = async () => {
  //mongoose.set("debug", true);
  if (process.env.NODE_ENV === "test") {
    const testServer = await MongoMemoryServer.create({
      instance: { port: 51442 },
    });
    process.env.MONGODB_URL = testServer.getUri();
    console.log(process.env.MONGODB_URL);
  }
  const URL = process.env.MONGODB_URL || "mongodb://localhost:27017/chatbox";
  const connection = await mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  return connection.connection.db;
};
