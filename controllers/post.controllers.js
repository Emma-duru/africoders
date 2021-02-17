const Post = require("../models/post.model");

const posts_get = async (req, res) => {
  try {
    const posts = await Post.find();
    res.render("home", { title: "Home", posts });
  } catch (error) {
    console.log(error);
  }
};

const create_get = (req, res) => {
  res.render("create", { title: "Create Post" });
};

const create_post = async (req, res) => {
  const { title, body, category } = req.body;
  try {
    const post = await Post.create({ title, body, category });
    res.json({ post });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { posts_get, create_get, create_post };
