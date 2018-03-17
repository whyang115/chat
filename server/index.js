const Koa = require("koa");
const app = new Koa();
const server = require("http").Server(app.callback());
const io = require("socket.io")(server);
const initDatabase = require("./common/initDatabase.js");
const router = require("./route/router.js");

// 连接数据库
initDatabase();

// 挂载路由
app.use(router.routes()).use(router.allowedMethods());

io.on("connection", socket => {
  socket.emit("chat", { hello: "world" });
  socket.on("chat", data => console.log(data));
  socket.on("disconnection", socket => {
    console.log(socket);
  });
});

server.listen(1105);
