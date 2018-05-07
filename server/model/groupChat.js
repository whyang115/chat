const mongoose = require("mongoose");
const { Schema } = mongoose;

const GroupChatSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  to: { type: Schema.Types.ObjectId, ref: "Group" },
  createTime: {
    type: Date,
    default: Date.now()
  }
});
const GroupChat = mongoose.model("GroupChat", ChatSchema);
module.exports = GroupChat;
