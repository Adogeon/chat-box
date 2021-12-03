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
   * Create a new conversation
   * @param {Object} detail - Optional detail of the new conversation
   * @return Box
   */
  async createConversation(detail, users) {
    const userIdList = [...users, this.currentUserId];
    const newBoxDetail = detail
      ? { ...detail, member: userIdList }
      : { member: userIdList };
    const newBoxRecord = await this.boxModel.create(newBoxDetail);
    await this.userModel.updateMany(
      { _id: { $in: userIdList } },
      {
        $push: { box: newBoxRecord._id },
      },
      {
        multi: true,
      }
    );
    const { log, member, ...rest } = newBoxRecord.toObject();
    return {
      log,
      member,
      boxDetail: rest,
    };
  }

  /**
   * Create a private conversation doc
   * @param {*} boxId
   * @param {*} message
   * @returns
   */
  async storePrivateConversation(userId) {
    let members = [this.currentUserId];
    if (typeof userId === "string") {
      members.push(userId);
    } else {
      members = [...members, ...userId];
    }
    const newBoxRecord = await this.boxModel.create({
      members,
    });

    await this.userModal.updateMany(
      { _id: { $in: members } },
      { $push: { box: newBoxRecord._id } },
      {
        multi: true,
      }
    );

    members.map((member) => {
      this.userModel.findByIdAndUpdate(member, {
        $push: { box: newBoxRecord._id },
      });
    });

    return newBoxRecord;
  }

  /**
   * add a message to a room, and emit the message back
   * @param {string} boxId - id of the chat box
   * @param {string} message - user message
   *
   */
  async addMessage(boxId, newRecord) {
    const boxRecord = await this.boxModel.findById(boxId);
    boxRecord.log.push(newRecord);
    await boxRecord.save();
  }

  /**
   * Get data from the box
   * @param {Object} searchOption
   */
  async loadBox(searchOption) {
    const boxRecord = await this.boxModel.findOne(searchOption);
    const { log, member, ...rest } = boxRecord.toObject();
    return {
      log,
      member,
      boxDetail: rest,
    };
  }

  /**
   * Update conversation detail
   * @param {*} boxId - id of the chat box
   * @param {*} update - update detail for the chat box
   */
  async editConversation(boxId, update) {
    const boxRecord = this.boxModel.findById(boxId);
    const updateBoxRecord = await boxRecord.update(update, {
      new: true,
    });
    return updateBoxRecord;
  }

  /**
   * Add member to an ongoing conversation
   * @param {string} boxId - id of the chat box
   * @param {string | Array} userId - userId or list of userIds need to be invite to the box
   */
  async addMember(boxId, userId) {
    const boxRecord = this.boxModel.findById(boxId);
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
