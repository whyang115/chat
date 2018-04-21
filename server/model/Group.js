const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * 聊天组描述
 *   创建时间
 *   成员列表
 *   消息列表
 */
const GroupSchema = new Schema({
  groupName: {
    type: String,
    default: "一个聊天室"
  },
  avatar: {
    type: String,
    default: "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/54370195.jpg"
  },
  createTime: {
    type: Date,
    default: new Date().toLocaleString()
  },
  members: {
    type: Array,
    default: []
  },
  messageList: {
    type: Array,
    default: []
  }
});

module.exports = mongoose.model("Group", GroupSchema);
