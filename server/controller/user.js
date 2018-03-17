const User = require("../model/user.js");
const back = require("../common/back.js");
/**
 * 用户注册
 * @param {*} ctx
 */
const register = async ctx => {
  const { name, pwd } = ctx.request.body;
  let user = new User({ name, pwd });
  try {
    // 判断用户是否已经存在
    let res = await User.findOne({ name });
    if (res) ctx.body = back.userExist;
    try {
      // 保存用户
      await user.save();
      ctx.status = 200;
      ctx.body = back.success;
      ctx.redirect("/chat");
    } catch (error) {
      ctx.throw(500, "database unexpected error");
    }
  } catch (error) {
    ctx.throw(500, "database unexpected error");
  }
};

/**
 * 用户登录
 * @param {*} ctx
 */
const login = async ctx => {
  const { name, pwd } = ctx.request.body;
  let user;
  if (name && pwd) {
    user = new User({ name, pwd });
  } else {
    ctx.throw(500, "name and pwd must be input");
  }
  try {
    let res = await user.findOne({ name });
    if (res) {
      ctx.body = back.success;
      ctx.redirect("/chat");
    }
  } catch (error) {
    ctx.throw(500, "database unexpected error");
  }
};

module.exports = {
  register,
  login
};
