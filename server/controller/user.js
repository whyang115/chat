const User = require("../model/user.js");
const Group = require("../model/group");
const back = require("../common/back.js");
const Chat = require("../model/chat");
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
    // 保存用户
    let { id, avatar } = user;

    // 将注册用户保存至全体群中
    let group = await Group.findOne({ name: "全体群" });
    group.members.push(id);
    await group.save();
    let commonGroupId = group.id;

    // 将全体群聊天保存至用户的聊天列表中
    let chat = new Chat({
      type: "group",
      from: id,
      to: commonGroupId,
      chatTitle: "全体群",
      createTime: time,
      msgList: []
    });
    let chatId = chat._id;
    user.chatList.push(chatId);
    user.activeChat = chatId;
    await user.save();
    await chat.save();
    /**
     * 返回用户
     */
    ctx.status = 200;
    ctx.body = {
      ...back.success,
      user: { id, avatar, name, socketId },
      groupId: commonGroupId
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
      let chat = await Chat.find({ from: id }).sort({ _id: -1 });
      let firstChat = chat[0];
      ctx.body = {
        ...back.success,
        userId: id,
        name,
        avatar,
        chatType: firstChat.type,
        chatId: firstChat.to
      };
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
    let { friendList } = res;
    ctx.body = { ...back.success, friendList };
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async ctx => {
  const { id } = ctx.query;
  try {
    let user = await User.findById(id)
      .populate("friendList")
      .populate("activeChat");
    let { avatar, name, chatList, friendList, activeChat } = user;
    ctx.body = {
      ...back.success,
      avatar,
      name,
      activeChat,
      chatList,
      friendList
    };
  } catch (error) {
    console.error(error);
  }
};
const getChatList = async ctx => {
  const { id } = ctx.query;
  try {
    let { chatList } = await User.findById(id).populate("chatList");
    let res = [];

    for (let key in chatList) {
      let item = await Chat.findById(key.id)
        .populate("from")
        .populate("to");
      res.push(chatList[key].populate(from).populate(to));
    }
    console.log(res);
    ctx.body = {
      ...back.success,
      chatList
    };
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  register,
  login,
  getFriendList,
  getUserInfo,
  getChatList
};
