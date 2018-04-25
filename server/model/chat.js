const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ChatSchema = new Schema({
  type: {
    type: String
  },
  from: { type: String },
  to: {
    type: String
  },
  msgList: {
    type: Array
  }
});
const chatModel = mongoose.model("chat", ChatSchema);
module.exports = chatModel;
