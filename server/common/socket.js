const Message = require("../model/message");
const PrivateChat = require("../model/privateChat");
const Group = require("../model/group.js");
// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    // 聊天;
    socket.on("chat", async data => {
      let msg = new Message(data);
      let chat =
        data.type === "group"
          ? await Group.findById(data.to)
          : await PrivateChat.findById(data.chatId);
      chat.msgList.push(msg.id);
      await msg.save();
      await chat.save();
      let { to } = data;
      socket.to(to).emit("chat", data);
    });
    socket.on("joinGroup", ({ groupId }) => {
      socket.join(groupId, () => {
        console.log(`join ${groupId} success`);
      });
    });
    // 添加好友
    socket.on("addFriend", ({ from, to }) => {
      socket.to(to).emit("addFriend", { from });
    });
    socket.on("disconnection", () => {
      console.log("socket is disconnected");
    });
  });
};

module.exports = initSocket;
