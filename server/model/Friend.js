const mongoose = require("mongoose");
const { Schema } = mongoose;
const FriendSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  sendTime: {
    type: Date,
    default: Date.now()
  },
  isAgree: {
    type: Boolean,
    default: false
  }
});
