const socket = window.io.connect("http://localhost:1105");
socket.on("connect", () => {
  console.log("connect");
});
socket.on("addFriend", ({ from }) => {
  console.log("一个来自" + from + "的好友请求");
});

export default socket;
