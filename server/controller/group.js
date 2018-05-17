const Group = require("../model/group.js");
const Back = require("../common/back");
const User = require("../model/user");
const randomAvatar = require("../common/randomAvatar")();
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
  let { id, groupName, groupAnnouncement, selectedUser } = ctx.request.body;
  selectedUser.push(id);
  let group = new Group({
    creator: id,
    name: groupName,
    announcement: groupAnnouncement,
    members: selectedUser,
    avatar: randomAvatar
  });
  try {
    let res = await group.save();
    let groupId = res.id;
    for (let i in selectedUser) {
      let userId = selectedUser[i];
      await User.findByIdAndUpdate(userId, {
        $push: {
          groupList: groupId
        }
      });
    }
    ctx.body = { ...Back.success };
  } catch (error) {
    ctx.body = {
      ...Back.error,
      returnMessage: "创建群组失败"
    };
  }
};

const getGroup = async ctx => {
  let { name } = ctx.query;
  try {
    let group = await Group.find({ name });
    if (group.length) {
      ctx.body = { ...Back.success, group };
    } else {
      ctx.body = {
        ...Back.error,
        returnMessage: "群组不存在"
      };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getGroup,
  createGroup,
  initCommonGroup
};
