const mongoose = require("mongoose");
const { initCommonGroup } = require("../controller/group");
module.exports = async () => {
  await mongoose.connect("mongodb://localhost/chat");

  const db = mongoose.connection;

  initCommonGroup();
  db.on("error", console.error.bind(console, "connection error"));

  db.once("open", console.log.bind(console, "connection success"));
};
