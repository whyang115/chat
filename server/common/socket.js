const Message = require("../model/message");
const Private = require("../model/private");
const Group = require("../model/group.js");
const User = require("../model/user");
// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    socket.on("updateSocket", async ({ userId, socketId }) => {
      await User.findByIdAndUpdate(userId, { socketId });
    });
    // 聊天;
    socket.on("chat", async data => {
      console.log(socket.id);
      let msg = new Message(data);
      let chat =
        data.chat.type === "group"
          ? await Group.findById(data.to)
          : await Private.findById(data.chatId);
      chat.msgList.push(msg.id);
      await msg.save();
      await chat.save();
      let { to } = data;
      socket.to(to).emit("chat", msg);
    });
    socket.on("joinGroup", ({ id }) => {
      socket.join(id, () => {
        console.log(`join ${id} success`);
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
