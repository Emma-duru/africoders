const Post = require("../models/post.model");

const posts_get = async (req, res) => {
  try {
    const posts = await Post.find().sort("-createdAt");
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

const post_detail = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });
    res.render("detail", { title: post.title, post });
  } catch (error) {
    console.log(error);
  }
};

const edit_get = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });
    res.render("edit", { title: "Edit Post", post });
  } catch (error) {
    res.json({ error });
  }
};

const edit_post = async (req, res) => {
  const { slug } = req.params;
  const { title, body, category } = req.body;
  try {
    const post = await Post.findOneAndUpdate(
      { slug },
      { title, body, category }
    );
    res.json({ post });
  } catch (error) {
    res.json({ error });
  }
};

const delete_post = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOneAndDelete({ slug });
    res.json({ post });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = {
  posts_get,
  create_get,
  create_post,
  post_detail,
  edit_get,
  edit_post,
  delete_post,
};
