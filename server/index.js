const Koa = require("koa");
const http = require("http");
const cors = require("koa-cors");
const socketIo = require("socket.io");
const bodyParser = require("koa-bodyparser");

const router = require("./route/router.js");
const initDatabase = require("./common/initDatabase.js");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIo(server);

// 连接数据库
initDatabase();

// 挂载路由
app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

// socket连接
io.on("connection", socket => {
  console.log(socket.id);
  socket.on("chat", data => {
    console.log(socket.id);
    console.log(data);
    socket.broadcast.emit("chat", data);
    socket.emit("chat", data);
  });
  socket.on("disconnection", () => {
    console.log("socket is disconnected");
  });
});

server.listen(1105);
