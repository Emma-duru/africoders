const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const commentSchema = new mongoose.Schema(
  {
    body: {
      type: String,
      required: "Please enter the body of the comment",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

commentSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Comment", commentSchema);
