const mongoose = require("mongoose");
const { Schema } = mongoose;
/**
 * 聊天组描述
 *   创建时间
 *   成员列表
 *   消息列表
 */
const GroupSchema = new Schema({
  name: {
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
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  msgList: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});
const Group = mongoose.model("Group", GroupSchema);
module.exports = Group;
