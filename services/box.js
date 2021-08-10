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
      member = [...member, ...userId];
    }
    const newBoxRecord = this.boxModel.create({
      member,
    });

    return newBoxRecord;
  }

  /**
   * add a message to a room, and emit the message back
   * @param {string} boxId - id of the chat box
   * @param {string} message - user message
   *
   * @return updated box record
   */
  async addMessage(boxId, message) {
    if (!this.currentUserId) throw new Error("User is not loggin");
    const boxRecord = this.boxModel.findById(boxId);
    if (!boxRecord) throw new Error("Can't find box with id " + boxId);
    const updateBoxRecord = await boxRecord.update(
      {
        $push: {
          log: {
            body: message,
            date: Date.now(),
            by: this.currentUserId,
          },
        },
      },
      {
        new: true,
      }
    );
    //emit the log to the user
    return updateBoxRecord;
  }

  /**
   * Update conversation detail
   * @param {*} boxId - id of the chat box
   * @param {*} update - update detail for the chat box
   */
  async editConversation(boxId, update) {
    if (!this.currentUserId) throw new Error("User is not loggin");
    const boxRecord = this.boxModel.findById(boxId);
    if (!boxRecord) throw new Error("Can't find box with id " + boxId);
    const updateBoxRecord = await boxRecord.update(update, {
      new: true,
    });

    //emit change of log to member
    return updateBoxRecord;
  }

  /**
   * Add member to an ongoing conversation
   * @param {string} boxId - id of the chat box
   * @param {string | Array} userId - userId or list of userIds need to be invite to the box
   */
  async addMember(boxId, userId) {
    //sending invite ?
    //should be private but also owner of the conversation / groups
    //may be the box/ group can be a choice of public or private
    const boxRecord = this.boxModel.findById(boxId);
    if (!boxRecord) throw new Error("Can't find box with id " + boxId);
    if (boxRecord.creator !== this.currentUserId)
      throw new Error("You can't add new member");
    let newMember = [];
    if (typeof userId === "string") {
      newMember.push(userId);
    } else {
      newMember = [...userId];
    }
    const updateBoxRecord = await boxRecord.update(
      { $push: { member: newMember } },
      { new: true }
    );

    return updateBoxRecord;
  }
}

module.exports = BoxService;
