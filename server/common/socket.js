const Message = require("../model/message");
const Private = require("../model/private");
const Group = require("../model/group.js");
const User = require("../model/user");
const mongoose = require("mongoose");
// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    socket.on("updateSocket", async ({ userId, socketId }) => {
      await User.findByIdAndUpdate(userId, { socketId });
    });
    // 聊天;
    socket.on("chat", async data => {
      let msg = new Message(data);
      let chat, sendMsg;
      await msg.save();
      if (data.chat.type === "group") {
        chat = await Group.findById(data.to);
        sendMsg = await Message.findById(msg.id)
          .populate({ path: "from" })
          .populate({ path: "to", model: "Group" });
      } else {
        chat = await Private.findById(data.chatId);
        sendMsg = await Message.findById(msg.id)
          .populate({ path: "from" })
          .populate({ path: "to", model: "User" });
      }
      chat.msgList.push(msg.id);
      await chat.save();
      let { to } = data;
      socket.to(to).emit("chat", sendMsg);
      socket.emit("chat", sendMsg);
    });
    socket.on("joinGroup", async ({ id }) => {
      let { groupList } = await User.findById(id).populate("groupList");
      groupList.forEach(item => {
        socket.join(item.id, () => {
          console.log(`${id} joined ${item.id} success`);
        });
      });
    });
    // 添加好友
    socket.on("addFriend", async ({ from, to }) => {
      let { friends } = await User.findById(from.id);
      friends = friends.map(item => item.toString());
      if (friends.includes(to)) {
        socket.emit("repeatAddFriend");
        return;
      }
      let { socketId } = await User.findById(to);
      socket.to(socketId).emit("addFriend", { from });
    });
    socket.on("addFriendRes", async ({ from, to, isAccept }) => {
      let fromUser = await User.findById(from.id);
      let toUser = await User.findById(to.id);
      if (isAccept) {
        fromUser.friends.push(toUser._id);
        toUser.friends.push(fromUser._id);
        let msg = new Message({
          content: "我已经同意添加您为好友了，开始聊天吧",
          sendTime: Date.now(),
          from: fromUser._id,
          to: toUser._id,
          isRead: false
        });
        let fromPrivate = new Private({
          name: toUser.name,
          from: fromUser._id,
          to: toUser._id,
          createTime: Date.now(),
          msgList: [msg._id]
        });
        let toPrivate = new Private({
          name: fromUser.name,
          from: toUser._id,
          to: fromUser._id,
          createTime: Date.now(),
          msgList: [msg._id]
        });
        fromUser.privateList.push(fromPrivate._id);
        toUser.privateList.push(toPrivate._id);
        await msg.save();
        await fromPrivate.save();
        await toPrivate.save();
        await fromUser.save();
        await toUser.save();
        socket
          .to(fromUser.socketId)
          .emit("addFriendSuccess", { from, to, id: fromPrivate._id });
        socket
          .to(toUser.socketId)
          .emit("addFriendSuccess", { from, to, id: toPrivate._id });
      } else {
        socket.to(fromUser.socketId).emit("addFriendFail", { from, to });
      }
    });
    socket.on("disconnection", () => {
      console.log("socket is disconnected");
    });
  });
};

module.exports = initSocket;
