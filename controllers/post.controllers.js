const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const posts_get = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort("-createdAt")
      .populate("comments")
      .populate("author");
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
    const post = await Post.create({
      title,
      body,
      category,
      author: req.user._id,
    });
    res.json({ post });
  } catch (error) {
    res.json({ error });
  }
};

const post_detail = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug }).populate("author");
    const comments = await Comment.find({ post: post._id }).populate("author");
    res.render("detail", { title: post.title, post, comments });
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

const capitalize = ([first, ...rest], lowerRest = false) =>
  first.toUpperCase() +
  (lowerRest ? rest.join("").toLowerCase() : rest.join(""));

const category_get = async (req, res) => {
  const { category } = req.params;
  try {
    const posts = await Post.find({ category })
      .sort("-createdAt")
      .populate("comments")
      .populate("author");
    let categoryTitle;
    if (category === "htmlandcss") categoryTitle = "HTML & CSS";
    if (category === "php") categoryTitle = "PHP";
    res.render("home", { title: capitalize(categoryTitle || category), posts });
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
  category_get,
};
