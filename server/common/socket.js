const Message = require("../model/message");
const Private = require("../model/private");
const Group = require("../model/group.js");
const User = require("../model/user");
const mongoose = require("mongoose");
// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    /**
     * 更新用户socketId
     */
    socket.on("updateSocket", async ({ userId, socketId }) => {
      await User.findByIdAndUpdate(userId, { socketId });
    });
    socket.on("newUser", () => {
     let group= await Group.findOneAndUpdate({ name: "全体群" }, {
        $inc: {
          users:1
        }
      })
      socket.broadcast.emit("newUser",{num:group.users })
      socket.emit("newUser",{num: group.users})
    })
    /**
     * 与好友私聊
     */
    socket.on("chatToFriend", async ({ from, to }) => {
      let { id } =
        (await Private.findOne({ from, to })) ||
        (await Private.findOne({ from: to, to: from }));
      socket.emit("chatToFriend", { id });
      socket.to(to).emit("chatToFriend", { id });
    });
    // 聊天;
    socket.on("chat", async data => {
      let msg = new Message(data);
      let sendMsg, socketId;
      let { to } = data;
      await msg.save();
      if (data.chat.type === "group") {
        sendMsg = await Message.findById(msg.id)
          .populate({ path: "from" })
          .populate({ path: "to", model: "Group" });

        let group = await Group.findByIdAndUpdate(to, {
          updateTime: Date.now(),
          $push: {
            msgList: msg.id
          }
        });

        group.members.forEach(item => {
          socket
            .to(item.toString())
            .emit("groupChat", { groupId: group.id, msg: sendMsg });
        });
        socket.emit("groupChat", { groupId: group.id, msg: sendMsg });
      } else {
        sendMsg = await Message.findById(msg.id)
          .populate({ path: "from" })
          .populate({ path: "to", model: "User" });

        let private = await Private.findByIdAndUpdate(data.chat.id, {
          updateTime: Date.now(),
          $push: {
            msgList: msg.id
          }
        });
        socket
          .to(to._id)
          .emit("privateChat", { privateId: private.id, msg: sendMsg });
        socket.emit("privateChat", { privateId: private.id, msg: sendMsg });
      }
    });

    socket.on("joinSelf", ({ id }) => {
      socket.join(id);
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
          from: toUser._id,
          to: fromUser._id,
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
        socket
          .to(to.id)
          .emit("addFriendSuccess", { from, to, id: private._id });
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
