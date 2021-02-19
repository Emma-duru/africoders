const router = require("express").Router();
const User = require("../models/user.model");
const Post = require("../models/post.model");

router.get("/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const user = await User.findOne({ username });
    const posts = await Post.find({ author: user._id })
      .populate("comments")
      .populate("author");
    res.render("profile", { title: user.username, checkedUser: user, posts });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
