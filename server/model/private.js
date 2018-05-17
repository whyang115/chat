const mongoose = require("mongoose");
const { Schema } = mongoose;

const PrivateSchema = new Schema({
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
  msgList: [{ type: Schema.Types.ObjectId, ref: "Message" }],
  updateTime: {
    type: Date,
    default: Date.now()
  }
});
const Private = mongoose.model("Private", PrivateSchema);
module.exports = Private;
