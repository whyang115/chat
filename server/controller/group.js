const Group = require("../model/group.js");
const Back = require("../common/back");
const Chat = require("../model/chat");
const getGroupInfo = async ctx => {
  const { id } = ctx.query;
  let info = await Group.findById(id);
  ctx.body = info;
};
const initCommonGroup = async () => {
  let group = new Group({
    name: "全体群",
    avatar: "http://tuku-image.oss-cn-beijing.aliyuncs.com/18-4-1/42784080.jpg",
    createTime: new Date().toLocaleString(),
    members: [],
    msgList: []
  });
  try {
    let findGroup = await Group.findOne({ name: "全体群" });
    if (!findGroup) {
      findGroup = await group.save();
    }
    let { id, name } = findGroup;
    let chat = new Chat({
      type: "group",
      to: id,
      chatTitle: name,
      msgList: []
    });
    let findChat = await Chat.findOne({ to: id });
    if (!findChat) {
      await chat.save();
    }
  } catch (error) {
    console.log(error);
  }
};
const createGroup = async ctx => {
  let group = new Group();
  try {
    let res = await group.save();
    let groupId = res.id;
    ctx.body = { ...Back.success, groupId };
  } catch (error) {
    console.log(error);
  }
};

const getCommonGroupInfoById = async ctx => {
  const { id } = ctx.query;
  try {
    let res = await Group.findById(id);
    let { avatar, name } = res;
    ctx.body = { ...Back.success, avatar, name };
  } catch (error) {
    console.error(error);
  }
};
const getCommonGroupInfoByName = async name => {
  try {
    let res = await Group.findOne({ name: name });
    return res;
  } catch (error) {
    console.error(error);
  }
};
module.exports = {
  getGroupInfo,
  createGroup,
  initCommonGroup,
  getCommonGroupInfoById,
  getCommonGroupInfoByName
};
