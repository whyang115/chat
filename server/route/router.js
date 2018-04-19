const Router = require("koa-router");
const User = require("../controller/user.js");
const router = new Router({
  prefix: "/api"
});
router.post("/register", User.register);
router.post("/login", User.login);
router.get("/friends", User.getFriendList);
module.exports = router;
