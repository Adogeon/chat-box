const bcrypt = require("bcrypt");

class AuthService {
  constructor(userModel) {
    this.UserModel = userModel;
  }
  /**
   * Create a new instance of user and sign up
   * @param {userAuthObject} user
   * @returns User object
   */
  async Signup(userInput) {
    try {
      const { username, password } = userInput;
      const hash = await bcrypt.hash(password, 10);
      const userRecord = this.UserModel.create({
        username: username,
        hash: hash,
      });

      const user = userRecord.toObject();
      delete user.hash;
      return user;
    } catch (e) {
      throw e;
    }
  }
  /**
   * Sign in user
   * @param {userAuthObject} user
   * @returns User object
   */
  async Signin(userInput) {
    const { username, password } = userInput;
    const userRecord = await this.UserModel.findOne({ username });
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
  }
}

module.exports = AuthService;
