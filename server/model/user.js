const mongoose = require("mongoose");
const Schema = mongoose.Schema;

/**
 * 用户描述
 *  名称
 *  密码
 *  注册日期
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
  time: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("User", UserSchema);
