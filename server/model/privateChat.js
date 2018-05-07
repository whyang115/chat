const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrivateChatSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  createTime: {
    type: Date,
    default: Date.now()
  },
  msgList: [{ type: Schema.Types.ObjectId, ref: "Message" }]
});
const PrivateChat = mongoose.model("PrivateChat", ChatSchema);
module.exports = PrivateChat;
