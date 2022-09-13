const router = require("express").Router();
const User = require("../models/User");
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { verifyTokenUser, verifyTokenAdmin } = require("./verifyToken");
const jwt = require("jsonwebtoken");

// UPDATE:
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );

    const accessToken = jwt.sign(
      { id: updatedUser._id, isAdmin: updatedUser.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    const { password, ...info } = updatedUser._doc;

    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE:
router.delete("/:id", verifyTokenUser, async (req, res) => {
  const user = await User.findById(req.params.id);
  try {
    await Post.deleteMany({ username: user.username }); // xóa hết các bài posts của user bị xóa account.
    await User.findByIdAndDelete(req.params.id);
    return res.status(200).json("This account has been deleted!");
  } catch (err) {
    return res.status(500).json("You can only delete your account!");
  }
});

// GET ONE USER:
router.get("/find/:id", verifyTokenUser, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...info } = user._doc;

    return res.status(200).json(info);
  } catch (err) {
    return res.status(403).json("You can only delete your account!");
  }
});

// GET ALL USER:
router.get("/", verifyTokenAdmin, async (req, res) => {
  const newQueryValue = req.query.new;
  try {
    const users = newQueryValue
      ? await User.find().sort({ createdAt: -1 }).limit(5)
      : await User.find();
    return res.status(200).json(users);
  } catch (err) {
    return res.status(403).json("You can only delete your account!");
  }
});

module.exports = router;
