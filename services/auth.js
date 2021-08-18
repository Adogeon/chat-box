const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");

class AuthService {
  constructor(userModel) {
    this.UserModel = userModel;
  }
  /**
   * Create a new instance of user and sign up
   * @param {userAuthObject} user
   * @returns User object
   */
  async signUp(userInput) {
    try {
      const { username, email, password } = userInput;
      const hash = await bcrypt.hash(password, 10);
      const userRecord = await this.UserModel.create({
        username: username,
        email: email,
        hash: hash,
      });
      console.log(userRecord);
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
  async signIn(userInput) {
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

  async generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 30);

    const secret = "swordfishforhistoricalsake";

    return jsonwebtoken.sign({ userId: user._id }, secret);
  }
}

module.exports = AuthService;
