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
    const user = await this.UserModel.findById(userId, "username");
    return user;
  }

  /**
   * Private, get current user information
   * @returns user information object
   */
  async getCurrent() {
    if (this.isLogin()) {
      const userRecord = await this.UserModel.findById(
        this.currentUserId,
        "-hash"
      );
      await userRecord.populate({
        path: "box",
        select: "name id member log isDM",
        populate: {
          path: "member",
          select: "username id",
        },
      });
      await userRecord.populate({
        path: "contact",
        select: "username id",
      });
      let user = userRecord.toObject();
      user.box = user.box.map((box) => {
        const latestMessage = box.log
          .slice()
          .sort((a, b) => b.date - a.date)[0];
        delete box.log;
        return {
          ...box,
          latestMessage,
        };
      });
      return user;
    } else {
      throw new Error("User is not logged in");
    }
  }

  /**
   * Private, get current user contacts
   * @returns populated contact list
   */
  async getCurrentContacts() {
    if (this.isLogin()) {
      const userRecord = await this.UserModel.findById(
        this.currentUserId,
        "-hash"
      );
      await userRecord.populate({
        path: "contact",
        select: "username id",
      });

      return userRecord.contact;
    } else {
      throw new Error("User is not logged in");
    }
  }

  /**
   * Private, get current user pending request
   * @returns populated pending request
   */
  async getCurrentPendingReq() {
    if (this.isLogin()) {
      const userRecord = await this.UserModel.findById(
        this.currentUserId,
        "-hash"
      );
      await userRecord.populate({
        path: "pending.user",
        select: "username id",
      });

      return userRecord.pending;
    } else {
      throw new Error("User is not logged in");
    }
  }

  /**
   * Private, add new contact to the current user and also update the other user contact list
   * @param {string} newContactId
   * @returns
   */
  async addContact(newContactUsername) {
    if (!this.isLogin()) throw new Error("User is not logged in");
    console.log(newContactUsername);
    const contactRecord = await this.UserModel.findOne({
      username: newContactUsername,
    });
    if (!contactRecord) throw new Error("Invalid username for new contact");
    await contactRecord.update({ $push: { contact: [this.currentUserId] } });
    const updateCurrentUserRecord = await this.UserModel.findByIdAndUpdate(
      this.currentUserId,
      { $push: { contact: [contactRecord._id] } },
      {
        new: true,
      }
    );
    console.log(updateCurrentUserRecord);
    return updateCurrentUserRecord;
  }

  /**
   * Private, sending a new friend request
   * @param {string} newContactId
   * @returns
   */
  async sendFriendRequest(contactUsername) {
    if (!this.isLogin()) throw new Error("User is not logged in");
    try {
      const contactRecord = await this.UserModel.findOne({
        username: contactUsername,
      });
      if (!contactRecord) throw new Error("Invalid userId for new contact");
      const friendRequest = {
        to: contactRecord._id,
        request: {
          user: this.currentUserId,
          date: new Date(),
        },
      };
      await contactRecord.update({
        $push: { pending: friendRequest.request },
      });
      return friendRequest;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * Private, accept pending request
   * @param {string} requestId
   * @returns
   */
  async acceptFriendRequest(requestId) {
    if (!this.isLogin()) throw new Error("User is not logged in");
    try {
      const currentUserRecord = await this.UserModel.findById(
        this.currentUserId,
        "_id pending"
      );
      const request = currentUserRecord.pending.id(requestId);
      currentUserRecord.contact.push(request.user);
      await this.UserModel.findByIdAndUpdate(request.user, {
        $push: { contact: this.currentUserId },
      });
      request.remove();
      await currentUserRecord.save();
      return currentUserRecord.pending;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async deleteFriendRequest(requestId) {
    if (!this.isLogin()) throw new Error("User is not logged in");
    try {
      const currentUserRecord = await this.UserModel.findById(
        this.currentUserId,
        "_id pending"
      );
      currentUserRecord.pending.id(requestId).remove();
      await currentUserRecord.save();
      return currentUserRecord.pending;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  /**
   * Private, have current user join a room that is already created
   * @param {string} roomId
   * @returns
   */
  async joinRoom(roomId) {
    if (!this.isLogin()) throw new Error("User is not logged in");
    const roomRecord = await this.BoxModel.findById(roomId, "_id pending");
    if (!roomRecord) throw new Error("Can't find room");
    await roomRecord.update({ $push: { member: [this.currentUserId] } });
    const updateCurrentUserRecord = await this.UserModel.findByIdAndUpdate(
      this.currentUserId,
      { $push: { box: [roomId] } },
      { new: true }
    );
    return updateCurrentUserRecord;
  }
}

module.exports = UserService;
