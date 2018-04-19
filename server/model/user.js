const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * 用户描述
 *  名称
 *  密码
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
    type: String
  },
  gender: {
    type: String
  }
});

module.exports = mongoose.model("User", UserSchema);
