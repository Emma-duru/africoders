const Post = require("../models/post.model");
const Comment = require("../models/comment.model");

const comment_create = async (req, res) => {
  const { body } = req.body;
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug });
    const comment = await Comment.create({
      body,
      post: post._id,
      author: req.user,
    });
    res.json({ comment });
  } catch (error) {
    res.json({ error });
  }
};

const comment_delete = async (req, res) => {
  const { id } = req.params;
  try {
    const comment = await Comment.findByIdAndDelete(id);
    res.json({ comment });
  } catch (error) {
    res.json({ error });
  }
};

module.exports = { comment_create, comment_delete };
