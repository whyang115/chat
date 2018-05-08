const Group = require("../model/group.js");
const Back = require("../common/back");
const getGroup = async ctx => {
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
    let chat = new GroupChat({
      type: "group",
      to: id,
      chatTitle: name,
      msgList: []
    });
    let findChat = await GroupChat.findOne({ to: id });
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

const getCommonGroup = async ctx => {
  try {
    let res = await Group.findOne({ name: "全体群" });
    let { name, avatar, messageList, members, id } = res;
    ctx.body = { ...Back.success, name, avatar, id, messageList, members };
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getGroup,
  createGroup,
  getCommonGroup,
  initCommonGroup
};
