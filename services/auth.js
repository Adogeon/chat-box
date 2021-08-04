const bcrypt = require("bcrypt");
const UserModel = require("../models/User");

module.exports = {
  /**
   * Create a new instance of user and sign up
   * @param {userAuthObject} user
   * @returns User object
   */
  Signup: async (user) => {
    try {
      const { username, password } = user;
      const hash = await bcrypt.hash(password, 10);
      const userRecord = UserModel.create({
        username: username,
        hash: hash,
      });

      const user = userRecord.toObject();
      delete user.hash;
      return user;
    } catch (e) {
      throw e;
    }
  },
  /**
   * Sign in user
   * @param {userAuthObject} user
   * @returns User object
   */
  Signin: async (user) => {
    const { username, password } = user;
    const userRecord = await UserModel.findOne({ username });
    if (!userRecord) {
      throw new Error("User not registered");
    }
    const validPassword = await bcrypt.compare(password, userRecord.hash);

    if (validPassword) {
      const user = userRecord.toObject();
      delete user.hash;
      return user;
    } else {
      throw new Error("Invalid Password");
    }
  },
};
