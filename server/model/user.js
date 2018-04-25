const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
  chatList: {
    type: Array
  },
  registerTime: {
    type: Date,
    required: false
  },
  lastLoginTime: {
    type: Date,
    required: true
  },
  friendList: {
    type: Array
  },
  avatar: {
    type: String,
    default:
      "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-21/93951459.jpg"
  },
  gender: {
    type: String,
    default: "未知"
  }
});
const model = mongoose.model("User", UserSchema);
module.exports = model;
