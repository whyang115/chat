const mongoose = require("mongoose");

const ActiveChatSchema = new mongoose.Schema({
  type: {
    type: String
  },
  id: {
    type: String
  }
});

const ActiveChat = mongoose.model("ActiveChat", ActiveChatSchema);
module.exports = ActiveChat;
