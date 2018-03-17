const router = require("koa-router")();
const koaBody = require("koa-body");
const User = require("../controller/user.js");
router.post("/register", koaBody(), User.register);
router.post("/login", koaBody(), User.login);

module.exports = router;
