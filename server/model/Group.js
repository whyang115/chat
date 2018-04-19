const mongoose = require("mongoose")
const Schema = mongoose.Schema

/**
 * 聊天组描述
 *   创建时间
 *   成员列表
 *   消息列表
 */
const GroupSchema = new Schema({
  createTime: {
    type: Date,
    required: true
  },
  members: {
    type: Array,
    required: true
  },
  messageList: {
    type: Array,
    required: true
  }
})

module.exports = mongoose.model("Group", GroupSchema)