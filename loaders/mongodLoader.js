const MongoClient = require("mongodb").MongoClient;

//URL to Mongo DB
const URL = process.env.MONGODB_URL || "mongodb://localhost:27017";

/**
 * Async load MongoDb, return the database
 *
 * @return  database object
 */

module.exports = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(URL, (error, client) => {
      if (error) return reject(error);
      const database = client.db("chat-box");
      resolve(database);
    });
  });
};
