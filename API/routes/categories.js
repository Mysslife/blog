const router = require("express").Router();
const Category = require("../models/Category");
const bcrypt = require("bcrypt");
const { verifyTokenAdmin } = require("./verifyToken");

// CREATE:
router.post("/", verifyTokenAdmin, async (req, res) => {
  const newCategory = new Category(req.body);

  try {
    const savedNewCategory = await newCategory.save();
    return res.status(200).json(savedNewCategory);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL CATEGORIES:
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json(categories);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
