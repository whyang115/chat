const Router = require("koa-router");
const user = require("../controller/user.js");
const group = require("../controller/group");
const chat = require("../controller/chat");
const fs = require("fs");
const router = new Router({
  prefix: "/api"
});
router.get("/", async () => {
  ctx.body = fs.readFileSync("./view/index.html");
});
router.post("/register", user.register);
router.post("/login", user.login);
router.post("/group", group.createGroup);
router.get("/user", user.getUserInfo);
router.post("/user", user.updateUser);
router.get("/group", group.getGroup);
router.get("/friends", user.getFriends);
router.get("/groupList", user.getGroupList);
router.get("/privateList", user.getPrivateList);
router.get("/chat", user.getChat);
module.exports = router;
