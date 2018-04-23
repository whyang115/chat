const Chat = require("../model/chat");
const Back = require("../common/back");
const getChat = async ctx => {
  let { id } = ctx.query;

  let chat = await Chat.findOne({ to: id });
  let { chatTitle, msgList } = chat;
  ctx.body = { ...Back.success, chatTitle, msgList };
};
module.exports = { getChat };
