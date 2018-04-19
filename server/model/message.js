const mongoose = require("mongoose")
const Schema = mongoose.Schema

/**
 * 信息描述
 *  内容
 *  发送时间
 *  发送人
 *  接受人
 *  是否被查看
 */

const MessageSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  sendTime: {
    type: Date,
    required: true
  },
  from: {
    type: String,
    required: true
  },
  to: {
    type: String
  },
  isRead: {
    type: Boolean
  }
})

module.exports = mongoose.model("Message", MessageSchema)