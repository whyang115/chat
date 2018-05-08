const mongoose = require("mongoose");
const { Schema } = mongoose;

/**
 * 用户描述
 *  名称
 *  密码
 *  socketId
 *  聊天列表
 *  注册日期
 *  好友
 *  头像
 *  性别
 */
const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true
  },
  pwd: {
    type: String,
    required: true
  },
  socketId: {
    type: String
  },
  registerTime: {
    type: Date,
    required: false
  },
  lastLoginTime: {
    type: Date,
    required: true
  },
  avatar: {
    type: String,
    default:
      "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-21/93951459.jpg"
  },
  gender: {
    type: String,
    default: "未知"
  },
  friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  groupList: [{ type: Schema.Types.ObjectId, ref: "Group" }],
  privateList: [{ type: Schema.Types.ObjectId, ref: "Private" }]
});
const User = mongoose.model("User", UserSchema);
module.exports = User;
