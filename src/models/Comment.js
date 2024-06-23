const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  id_user: {type: Schema.ObjectId},
  comment: {type: String},
  id_post: {type: Schema.ObjectId},
  user: {type: Object},
  timestamp: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Comment", CommentSchema);
