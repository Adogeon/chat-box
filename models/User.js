const { Db } = require("mongodb")

/**
 * Initilize User documentation with validation
 * @param {Db} db 
 */
const initUserCollection = (db) => {
  db.listCollections({name: "users"}).next((err, collinfo) => {
    if(collinfo) {
      return db.collection("users")
    } else {
      return db.createCollection("users", {
        vaidator: {
          $jsonSchema: {
            bjonType: "object",
            properties: {
              username: {
                bsonType: 'string',
                description: "must be a string and is required"
              },
              password: {
                bsonType: 'string',
                description: "must be a string and is required"
              },
              contact: {
                
              }
              
            }
          }
        }
      })
    }
  })
}