const Router = require("koa-router");
const user = require("../controller/user.js");
const group = require("../controller/group");
const fs = require("fs");
const router = new Router({
  prefix: "/api"
});
//用户注册
router.post("/register", user.register);
// 用户登录
router.post("/login", user.login);
// 创建群组
router.post("/group", group.createGroup);
// 获取用户信息
router.get("/user", user.getUserInfo);
// 更新用户信息
router.post("/user", user.updateUser);
// 获取当前聊天室的所有注册用户
router.get("/allUser", user.getAllUser);
// 模糊查找用户
router.get("/fuzzyUser", user.getFuzzySearchUser);
// 获取群组信息
router.get("/group", group.getGroup);
// 获取用户的所有好友
router.get("/friends", user.getFriends);
// 获取用户的所有群聊
router.get("/groupList", user.getGroupList);
// 获取用户的所有私聊
router.get("/privateList", user.getPrivateList);
// 获取聊天
router.get("/chat", user.getChat);
module.exports = router;
