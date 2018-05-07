const Chat = require("../model/chat");
const Group = require("../model/group");
const User = require("../model/user");
const Back = require("../common/back");
const getChat = async ctx => {
  let { id } = ctx.query;
  let user = await User.findById(id).populate("activeChat");
  let { type, to, _id } = user.activeChat;
  let res =
    type === "group"
      ? await Group.findById(to).populate("members")
      : await User.findById(to);

  ctx.body = { ...Back.success, _id, res };
};
const getMsgList = async ctx => {
  let { id } = ctx.query;
  try {
    let res = await Chat.findById(id).populate("msgList");
    ctx.body = {
      ...Back.success,
      res
    };
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getChat, getMsgList };
