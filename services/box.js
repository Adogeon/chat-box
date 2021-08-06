class BoxService {
  /**
   * Initilize an instance of BoxService
   * @param {*} boxModel -- Mongoose Box Model
   * @param {string} currentUserId -- current userId from token
   */
  constructor(boxModel, userModel, currentUserId) {
    this.boxModel = boxModel;
    this.userModel = userModel;
    this.currentUserId = currentUserId;
  }
  /**
   * Create a conversation with other user
   * @param {string | Array} userId
   * @return Box
   */
  createConversation(userId) {
    if (!this.currentUserId) throw new Error("User is not loggin");
    let member = [this.currentUserId];
    if (typeof userId === "string") {
      member.push(userId);
    } else {
      member = [...member,...userId];
    }
    const newBoxRecord = this.boxModel.create({
      member,
    });

    return newBoxRecord;
  }

  /**
   * add a message to a room
   * 
   */
  addMessage(roomId, message) {

  }

  /**
   * Update conversation detail
   * @param {*} roomeId 
   * @param {*} update 
   */
  editConversation(roomId, update) {

  }
  
  /**
   * Add member to an ongoing conversation
   * @param {string} roomId 
   * @param {string | Array} userId 
   */
  addMember(roomId, userId) {

  }

}

module.exports = BoxService;
