const User = require("../model/user.js");
const Group = require("../model/group");
const back = require("../common/back.js");
const Private = require("../model/private");
const { localeTime } = require("../common/util");
/**
 * 用户注册
 * 1. 保存用户
 * 2. 将用户添加至全体群中
 * 3. 将全体群聊天添加至用户聊天列表中
 * @param {*} ctx
 */
const register = async ctx => {
  const { name, pwd, time, socketId } = ctx.request.body;
  try {
    /**
     * 新建用户
     */
    let user = new User({
      name,
      pwd,
      socketId,
      registerTime: time,
      lastLoginTime: time
    });

    // 判断用户是否已经存在
    let res = await User.findOne({ name });
    if (res) {
      ctx.body = back.userExist;
      return;
    }
    let { id, avatar } = user;
    let group = await Group.findOne({ name: "全体群" });

    //保存用户和全体群
    group.members.push(id);
    user.groupList.push(group.id);
    await user.save();
    await group.save();
    /**
     * 返回用户
     */
    ctx.status = 200;
    ctx.body = {
      ...back.success,
      user: { id, avatar, name, socketId },
      chat: { type: "group", id: group.id }
    };
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 用户登录
 * @param {*} ctx
 */
const login = async ctx => {
  const { name, pwd, time, socketId } = ctx.request.body;
  try {
    let res = await User.findOneAndUpdate(
      { name, pwd },
      { lastLoginTime: localeTime(time), socketId }
    );

    if (res) {
      let { id, avatar } = res;
      let group = await Group.findOne({ name: "全体群" });
      ctx.body = {
        ...back.success,
        user: { id, avatar, name, socketId },
        chat: {
          type: "group",
          id: group.id
        }
      };
    } else {
      ctx.body = back.userUnExist;
    }
  } catch (error) {
    ctx.throw(500, error);
  }
};

const getFriends = async ctx => {
  const { id } = ctx.query;
  try {
    let { friends } = await User.findById(id).populate("friends");
    ctx.body = { ...back.success, friends };
  } catch (error) {
    console.log(error);
  }
};

const getGroupList = async ctx => {
  const { id } = ctx.query;
  try {
    let { groupList } = await User.findById(id).populate({
      path: "groupList",
      populate: { path: "members msgList" }
    });
    ctx.body = {
      ...back.success,
      groupList
    };
  } catch (err) {
    console.log(err);
  }
};
const getPrivateList = async ctx => {
  const { id } = ctx.query;
  try {
    let { privateList } = await User.findById(id).populate({
      path: "privateList",
      populate: { path: "msgList" }
    });
    ctx.body = {
      ...back.success,
      privateList
    };
  } catch (error) {
    console.log(error);
  }
};

const getChat = async ctx => {
  const { type, id } = ctx.query;
  try {
    let res =
      type === "group"
        ? await Group.findById(id)
            .populate("msgList")
            .populate("members")
        : await Private.findById(id).populate("msgList");
    ctx.body = {
      ...back.success,
      res
    };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  register,
  login,
  getFriends,
  getGroupList,
  getPrivateList,
  getChat
};
