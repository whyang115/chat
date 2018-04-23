const User = require("../model/user.js");
const Group = require("../model/group");
const back = require("../common/back.js");
const { getCommonGroupInfoByName } = require("../controller/group");
/**
 * 用户注册
 * @param {*} ctx
 */
const register = async ctx => {
  const { name, pwd, time } = ctx.request.body;
  let user = new User({ name, pwd, registerTime: time, lastLoginTime: time });
  try {
    // 判断用户是否已经存在
    let res = await User.findOne({ name });
    if (res) {
      ctx.body = back.userExist;
      return;
    }
    try {
      // 保存用户
      let savedRes = await user.save();
      let { id, avatar } = savedRes;
      let groupRes = await getCommonGroupInfoByName("全体群");
      let commonGroupId = groupRes.id;
      await Group.findByIdAndUpdate(commonGroupId, {
        $push: {
          members: savedRes
        }
      });
      ctx.status = 200;
      ctx.body = { ...back.success, userId: id, avatar, name, commonGroupId };
    } catch (error) {
      ctx.throw(500, error);
    }
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 用户登录
 * @param {*} ctx
 */
const login = async ctx => {
  const { name, time } = ctx.request.body;
  try {
    let res = await User.findOneAndUpdate({ name }, { lastLoginTime: time });
    if (res) {
      let { id, avatar } = res;
      let groupRes = await getCommonGroupInfoByName("全体群");
      let commonGroupId = groupRes.id;
      ctx.body = { ...back.success, userId: id, name, avatar, commonGroupId };
    } else {
      ctx.body = back.userUnExist;
    }
  } catch (error) {
    ctx.throw(500, error);
  }
};

const getFriendList = async ctx => {
  const { id } = ctx.query;
  try {
    let res = await User.findById(id);
    console.log(res);
    let { friendList } = res;
    ctx.body = friendList;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  register,
  login,
  getFriendList
};
