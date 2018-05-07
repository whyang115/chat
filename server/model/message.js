const mongoose = require("mongoose");
const { Schema } = mongoose;

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
    required: true,
    default: ""
  },
  sendTime: {
    type: Date,
    required: true
  },
  from: {
    type: Object
  },
  to: {
    type: Schema.Types.ObjectId
  },
  isRead: {
    type: Boolean,
    default: false
  }
});
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
