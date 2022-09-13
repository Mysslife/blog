const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER:
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const { password, ...info } = savedUser._doc;

    res.status(200).json(info);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN:
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(500).json(err);

    const validated = await bcrypt.compare(req.body.password, user.password);
    if (!validated) return res.status(500).json(err);

    const { password, ...info } = user._doc;
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "3d" }
    );

    return res.status(200).json({ ...info, accessToken });
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
