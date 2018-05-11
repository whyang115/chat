const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  type: { type: String },
  from: { type: Schema.Types.ObjectId, ref: "User" },
  to: { type: Schema.Types.ObjectId },
  msgList: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});
const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
