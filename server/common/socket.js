const Message = require("../model/message");
const Private = require("../model/private");
const Group = require("../model/group.js");
const User = require("../model/user");
const mongoose = require("mongoose");
// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    socket.on("test", async ({ to }) => {
      const { members } = await Group.findById(to);
      members.forEach(item => {
        console.log(item.toString());
        socket.to(item.toString()).emit("test", { test: "test" });
      });
      socket.emit("test", { test: "test" });
    });
    /**
     * 更新用户socketId
     */
    socket.on("updateSocket", async ({ userId, socketId }) => {
      await User.findByIdAndUpdate(userId, { socketId });
    });
    // 聊天;
    socket.on("chat", async data => {
      let msg = new Message(data);
      let sendMsg, socketId;
      let { to } = data;
      await msg.save();
      if (data.chat.type === "group") {
        let group = await Group.findById(to);
        sendMsg = await Message.findById(msg.id)
          .populate({ path: "from" })
          .populate({ path: "to", model: "Group" });
        group.msgList.push(msg.id);
        await group.save();
        group.members.forEach(item => {
          socket.to(item.toString()).emit("chat", sendMsg);
        });
      } else {
        let private = await Private.findById(data.chat.id);
        sendMsg = await Message.findById(msg.id)
          .populate({ path: "from" })
          .populate({ path: "to", model: "User" });
        private.msgList.push(msg.id);
        await private.save();
        socket.to(to).emit("chat", sendMsg);
      }
      socket.emit("chat", sendMsg);
    });

    socket.on("joinSelf", ({ id }) => {
      socket.join(id);
    });
    /**
     * 加入群组
     */
    socket.on("joinGroup", async ({ id }) => {
      // let { groupList } = await User.findById(id).populate("groupList");
      // groupList.forEach(item => {
      //   socket.join(item.id, () => {
      //     console.log(`${id} joined ${item.id} success`);
      //   });
      // });
    });
    // 添加好友
    socket.on("addFriend", async ({ from, to }) => {
      let { friends } = await User.findById(from.id);
      friends = friends.map(item => item.toString());
      if (friends.includes(to)) {
        socket.emit("repeatAddFriend");
        return;
      }
      socket.to(to).emit("addFriend", { from });
    });
    /**
     * 添加好友结果
     */
    socket.on("addFriendRes", async ({ from, to, isAccept }) => {
      let fromUser = await User.findById(from.id);
      let toUser = await User.findById(to.id);
      if (isAccept) {
        fromUser.friends.push(toUser._id);
        toUser.friends.push(fromUser._id);
        let msg = new Message({
          content: "我们已经是好友了，开始聊天吧",
          sendTime: Date.now(),
          from: fromUser._id,
          to: toUser._id,
          isRead: false
        });
        let private = new Private({
          from: fromUser._id,
          to: toUser._id,
          createTime: Date.now(),
          msgList: [msg._id]
        });

        fromUser.privateList.push(private._id);
        toUser.privateList.push(private._id);
        await msg.save();
        await private.save();
        await fromUser.save();
        await toUser.save();
        socket
          .to(from.id)
          .emit("addFriendSuccess", { from, to, id: private._id });
        socket.to(to).emit("addFriendSuccess", { from, to, id: private._id });
      } else {
        socket.to(from.id).emit("addFriendFail", { from, to });
      }
    });
    socket.on("disconnection", () => {
      console.log("socket is disconnected");
    });
  });
};

module.exports = initSocket;
