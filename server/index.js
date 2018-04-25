const Koa = require("koa");
const http = require("http");
const cors = require("koa-cors");
const socketIo = require("socket.io");
const bodyParser = require("koa-bodyparser");

const router = require("./route/router.js");
const initDatabase = require("./common/initDatabase.js");
const initSocket = require("./common/socket");

const app = new Koa();
const server = http.createServer(app.callback());
const io = socketIo(server);

// 连接数据库
initDatabase();

// 初始化socket连接
initSocket(io);

// 挂载路由
app
  .use(cors())
  .use(bodyParser())
  .use(router.routes())
  .use(router.allowedMethods());

server.listen(1105);
