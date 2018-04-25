const User = require("../model/user.js");
const Group = require("../model/group");
const back = require("../common/back.js");
const Chat = require("../model/chat");
const { localeTime } = require("../common/util");
/**
 * 用户注册
 * @param {*} ctx
 */
const register = async ctx => {
  const { name, pwd, time, socketId } = ctx.request.body;
  let user = new User({
    name,
    pwd,
    socketId,
    registerTime: time,
    lastLoginTime: time
  });
  try {
    // 判断用户是否已经存在
    let res = await User.findOne({ name });
    if (res) {
      ctx.body = back.userExist;
      return;
    }
    // 保存用户
    let savedRes = await user.save();
    let { id, avatar } = savedRes;

    // 将注册用户的userId及socketId保存至全体群中
    let group = await Group.findOneAndUpdate(
      { name: "全体群" },
      {
        $push: {
          members: { userId: id, socketId }
        }
      }
    );
    // 将全体群保存至聊天列表中
    let commonGroupId = group.id;
    let groupChat = new Chat({
      type: "group",
      from: id,
      to: commonGroupId,
      msgList: []
    });
    await groupChat.save();

    ctx.status = 200;
    ctx.body = {
      ...back.success,
      userId: id,
      avatar,
      name,
      chatType: group,
      chatId: commonGroupId
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
      let chat = await Chat.find({ from: id }, { $sort: { _id: -1 } });
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

module.exports = {
  register,
  login,
  getFriendList
};
