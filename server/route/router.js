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
router.get("/friends", user.getFriends);
router.get("/groupList", user.getGroupList);
router.get("/privateList", user.getPrivateList);
router.get("/chat", user.getChat);
module.exports = router;
