const Private = require("../model/private");
const Group = require("../model/group");
const User = require("../model/user");
const Back = require("../common/back");
// const getChat = async ctx => {
//   let { id } = ctx.query;
//   let user = await User.findById(id).populate("activeChat");
//   let res =
//     type === "group"
//       ? await Group.findById(to).populate("members")
//       : await User.findById(to);

//   ctx.body = { ...Back.success, _id, res };
// };
const getGroupMsgList = async ctx => {
  let { id } = ctx.query;
  try {
    let res = await Group.findById(id).populate("msgList");
    ctx.body = {
      ...Back.success,
      res
    };
  } catch (error) {
    console.log(error);
  }
};
const getPrivateMsgList = async ctx => {
  let { id } = ctx.query;
  try {
    let { msgList } = await Private.findById(id).populate("msgList");
    console.log(msgList);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getGroupMsgList, getPrivateMsgList };
