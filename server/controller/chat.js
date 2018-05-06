const Chat = require("../model/chat");
const Group = require("../model/group");
const User = require("../model/user");
const Back = require("../common/back");
const getChat = async ctx => {
  let { id } = ctx.query;
  let chat = await Chat.findById(id);
  let { type, to, msgList } = chat;
  let res =
    type === "group" ? await Group.findById(to) : await User.findById(to);
  let { name, avatar } = res;
  ctx.body = { ...Back.success, name, avatar, msgList };
};

module.exports = { getChat };
