const Message = require("../model/message");
const Chat = require("../model/chat");
// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    // 聊天;
    socket.on("chat", async data => {
      let msg = new Message(data);
      let chat = await Chat.findById(data.chatId);
      chat.msgList.push(msg.id);
      await msg.save();
      await chat.save();
      let { to } = data;
      socket.to(to).emit("chat", data);
      socket.emit("chat", data);
    });
    socket.on("joinGroup", ({ userId, groupId }) => {
      socket.join(groupId, () => {
        console.log("join group success");
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
