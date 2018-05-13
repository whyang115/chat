const User = require("../model/user.js");
const Group = require("../model/group");
const back = require("../common/back.js");
const Private = require("../model/private");
const { localeTime } = require("../common/util");
const randomAvatar = require("../common/randomAvatar");
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
      lastLoginTime: time,
      avatar: randomAvatar()
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
      populate: {
        path: "msgList members",
        populate: {
          path: "from to"
        }
      }
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
      populate: { path: "from to msgList" }
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
            .populate({ path: "msgList", populate: { path: "from to" } })
            .populate("members")
        : await Private.findById(id)
            .populate("from")
            .populate("to")
            .populate({
              path: "msgList",
              populate: { path: "from to" }
            });
    ctx.body = {
      ...back.success,
      res
    };
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async ctx => {
  let { id } = ctx.query;
  try {
    let user = await User.findById(id);
    if (user) {
      ctx.body = {
        ...back.success,
        user
      };
    } else {
      ctx.body = {
        ...back.error,
        returnMessage: "用户信息获取出错,请稍后再试"
      };
    }
  } catch (error) {
    console.log(error);
  }
};
const updateUser = async ctx => {
  const { id, name, signature, gender } = ctx.request.body;
  try {
    let user = await User.findOne({ name });
    if (user) {
      ctx.body = {
        ...back.error,
        returnMessage: "用户名重复"
      };
    } else {
      await User.findByIdAndUpdate(id, { name, signature, gender });
      ctx.body = {
        ...back.success
      };
    }
  } catch (error) {
    ctx.body = {
      ...back.error,
      returnMessage: "用户信息更新失败"
    };
  }
};
module.exports = {
  register,
  login,
  getFriends,
  getGroupList,
  getPrivateList,
  getChat,
  getUserInfo,
  updateUser
};
