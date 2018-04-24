const Router = require("koa-router");
const user = require("../controller/user.js");
const group = require("../controller/group");
const chat = require("../controller/chat");
const router = new Router({
  prefix: "/api"
});
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/friends", user.getFriendList);
router.post("/group", group.createGroup);
router.get("/getCommonGroupInfoById", group.getCommonGroupInfoById);
router.get("/getChat", chat.getChat);
router.get("/commonGroup", group.getCommonGroup);
module.exports = router;
