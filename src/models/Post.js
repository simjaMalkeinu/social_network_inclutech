const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema({
  text: { type: String, required: true },
  img: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", PostSchema);
