const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  text: { type: String, required: true },
  img: { type: String, required: false },
  date: { type: Date, default: Date.now },
  user: { type: Object },
  id_user: { type: String },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Post", PostSchema);
