// User should be able to add new contact/ group; create a room; join a room;

class UserService {
  /**
   * Create an instance of UserService
   * @param {*} userModel - User Model from mongoose
   * @param {*} boxModel - Box Model from mongoose
   * @param {string} currentUserId - Current UserId, from decrypt jsonwebtoken
   */
  constructor(userModel, boxModel, currentUserId) {
    this.UserModel = userModel;
    this.BoxModel = boxModel;
    this.currentUserId = currentUserId;
  }
  /**
   * Check if a User is Login or not
   * @returns {Boolean}
   */
  isLogin() {
    return this.currentUserId ? this.currentUserId.trim() !== "" : false;
  }
  /**
   * Public, get user information according to userId
   * @param {string} userId
   * @returns user information object
   */
  async get(userId) {
    const user = await this.UserModel.findById(userId);
    return user;
  }
  /**
   * Private, get current user information
   * @returns user information object
   */
  async getCurrent() {
    if (this.isLogin()) {
      const user = await this.UserModel.findById(this.currentUserId);
      return user;
    } else {
      throw new Error("User is not logged in");
    }
  }
  /**
   * Private, add new contact to the current user and also update the other user contact list
   * @param {string} newContactId
   * @returns
   */
  async addContact(newContactId) {
    if (this.isLogin()) {
      const contactRecord = await this.UserModel.findById(newContactId);
      if (!contactRecord) throw new Error("Invalid userId for new contact");
      await contactRecord.update({ $push: { contact: [this.currentUserId] } });
      const updateCurrentUserRecord = await this.UserModel.findByIdAndUpdate(
        this.currentUserId,
        { $push: { contact: [newContactId] } },
        {
          new: true,
        }
      );

      return updateCurrentUserRecord;
    } else {
      throw new Error("User is not logged in");
    }
  }

  async joinRoom(roomId) {}
}

module.exports = UserService;
