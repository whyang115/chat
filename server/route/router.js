const Router = require("koa-router");
const user = require("../controller/user.js");
const group = require("../controller/group");
const chat = require("../controller/chat");
const router = new Router({
  prefix: "/api"
});
router.post("/register", user.register);
router.post("/login", user.login);
router.post("/group", group.createGroup);
router.get("/user", user.getUserInfo);
router.get("/group", group.getGroup);
router.get("/friends", user.getFriendList);
router.get("/chatList", user.getChatList);
router.get("/chat", chat.getChat);
router.get("/msgList", chat.getMsgList);
router.get("/commonGroup", group.getCommonGroup);
module.exports = router;
