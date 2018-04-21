const Router = require("koa-router");
const user = require("../controller/user.js");
const group = require("../controller/group");
const router = new Router({
  prefix: "/api"
});
router.post("/register", user.register);
router.post("/login", user.login);
router.get("/friends", user.getFriendList);
router.put("/createGroup", group.createGroup);
router.get("/getCommonGroupInfoById", group.getCommonGroupInfoById);
module.exports = router;
