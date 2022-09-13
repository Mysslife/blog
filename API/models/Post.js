const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PostSchema = new Schema(
  {
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String },
    username: { type: String, required: true },
    categories: { type: Array, required: true },
    content: { type: String },
  },
  {
    timestamps: true,
  }
);

const PostModel = mongoose.model("Post", PostSchema);
module.exports = PostModel;
