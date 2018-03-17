const mongoose = require("mongoose");
module.exports = () => {
  mongoose.connect("mongodb://localhost/graduation");

  const db = mongoose.connection;

  db.on("error", console.error.bind(console, "connection error"));

  db.once("open", console.log.bind(console, "connection success"));
};
