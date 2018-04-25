// socket连接
const initSocket = io => {
  // socket连接
  io.on("connection", socket => {
    // 聊天;
    socket.on("chat", data => {
      let { to } = data;
      socket.to(to).emit("chat", data);
      socket.emit("chat", data);
    });
    socket.on("joinGroup", ({ userId, chatId }) => {
      socket.join(chatId, () => {
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
