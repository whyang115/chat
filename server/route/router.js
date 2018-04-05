const Router = require("koa-router");
const koaBody = require("koa-body");
const User = require("../controller/user.js");
const router = new Router({
  prefix: "/api"
});
router.post("/register", koaBody(), User.register);
router.post("/login", koaBody(), User.login);

module.exports = router;
