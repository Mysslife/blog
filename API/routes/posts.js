const router = require("express").Router();
const Post = require("../models/Post");
const bcrypt = require("bcrypt");
const { verifyTokenUser, verifyTokenAdmin } = require("./verifyToken");

// CREATE:
router.post("/", verifyTokenUser, async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    return res.status(200).json(savedPost);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// UPDATE:
router.put("/:id", verifyTokenUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
          req.params.id,
          { $set: req.body },
          { new: true }
        );
        return res.status(200).json(updatedPost);
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can only update you posts!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// DELETE:
router.delete("/:id", verifyTokenUser, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        return res.status(200).json("This post has been deleted!");
      } catch (err) {
        return res.status(500).json(err);
      }
    } else {
      return res.status(401).json("You can only delete your posts!");
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ONE POST:
router.get("/find/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json(err);
  }
});

// GET ALL POSTS THEO CATEGORY OR USERNAME:
router.get("/", async (req, res) => {
  const username = req.query.user;
  const category = req.query.category;

  try {
    let posts;
    if (username) {
      posts = await Post.find({ username: username }).sort({ createdAt: -1 });
    } else if (category) {
      posts = await Post.find({ categories: { $in: [category] } });
    } else {
      posts = await Post.find().sort({ createdAt: -1 });
    }
    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json(err);
  }
});

module.exports = router;
