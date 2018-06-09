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
    // 判断用户是否已经存在
    let res = await User.findOne({ name });
    if (res) {
      ctx.body = back.userExist;
      return;
    }
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
    let user = await User.findOne({ name });
    if (!user) {
      ctx.body = back.userUnExist;
      return;
    }
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
      ctx.body = {
        ...back.error,
        returnMessage: "用户名和密码不匹配"
      };
    }
  } catch (error) {
    ctx.throw(500, error);
  }
};

/**
 * 获取用户的好友列表
 * @param {*} ctx
 */
const getFriends = async ctx => {
  const { id } = ctx.query;
  try {
    let { friends } = await User.findById(id).populate({
      path: "friends",
      select: {
        avatar: 1,
        name: 1,
        lastLoginTime: 1,
        registerTime: 1
      },
      populate: { path: "privateList" }
    });
    ctx.body = { ...back.success, friends };
  } catch (error) {
    console.log(error);
  }
};

/**
 * 获取用户的群组聊天
 * @param {*} ctx
 */
const getGroupList = async ctx => {
  const { id } = ctx.query;
  try {
    let { groupList } = await User.findById(id).populate({
      path: "groupList",
      options: {
        sort: { updateTime: -1 }
      },
      populate: {
        path: "msgList members",
        select: { name: 1, to: 1, sendTime: 1, content: 1 },
        populate: {
          path: "from",
          select: { name: 1 }
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

/**
 * 获取用户的私聊列表
 * @param {*} ctx
 */
const getPrivateList = async ctx => {
  const { id } = ctx.query;
  try {
    let { privateList } = await User.findById(id).populate({
      path: "privateList",
      options: {
        sort: { updateTime: -1 }
      },
      populate: {
        path: "from to msgList"
      }
    });
    ctx.body = {
      ...back.success,
      privateList
    };
  } catch (error) {
    console.log(error);
  }
};

/**
 * 获取具体聊天内容
 * @param {*} ctx
 */
const getChat = async ctx => {
  const { type, id } = ctx.query;
  try {
    let res =
      type === "group"
        ? await Group.findById(id)
            .populate({ path: "msgList", populate: { path: "from to" } })
            .populate({ path: "members", select: { name: 1, avatar: 1 } })
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

/**
 * 获取用户信息
 * @param {*} ctx
 */
const getUserInfo = async ctx => {
  let { id } = ctx.query;
  try {
    let user = await User.findById(id, {
      name: 1,
      avatar: 1,
      gender: 1,
      signature: 1,
      registerTime: 1
    });
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

/**
 * 更新用户信息
 * @param {*} ctx
 */
const updateUser = async ctx => {
  const { id, name, signature, gender } = ctx.request.body;
  try {
    let user = await User.findOne({ name });
    if (user && user.name !== name) {
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
/**
 * 获取所有的用户
 * @param {*} ctx
 */
const getAllUser = async ctx => {
  try {
    let res = await User.find({}, { name: 1, avatar: 1, _id: 1 }).limit(20);
    ctx.body = {
      ...back.success,
      res
    };
  } catch (error) {
    ctx.body = {
      ...back.error,
      returnMessage: "获取用户列表失败"
    };
  }
};

/**
 * 模糊查询所有的用户
 * @param {*} ctx
 */
const getFuzzySearchUser = async ctx => {
  let { name } = ctx.query;
  try {
    let res = await User.find(
      {
        name: {
          $regex: name,
          $options: "i"
        }
      },
      {
        name: 1,
        avatar: 1,
        _id: 1
      }
    ).limit(20);
    ctx.body = {
      ...back.success,
      res
    };
  } catch (error) {
    ctx.body = {
      ...back.error,
      returnMessage: "查询失败"
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
  updateUser,
  getAllUser,
  getFuzzySearchUser
};
