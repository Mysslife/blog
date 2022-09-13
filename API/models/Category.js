const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

const CategoryModel = mongoose.model("Category", CategorySchema);
module.exports = CategoryModel;
