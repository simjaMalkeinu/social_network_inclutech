const mongoose = require("mongoose");
const { Schema } = mongoose;

const ChatSchema = new Schema({
  id_u_send: {type: Schema.ObjectId, ref: 'User'},
  id_u_received: {type: Schema.ObjectId, ref: 'User'},
  msg: {type: String},
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Chat", ChatSchema);
