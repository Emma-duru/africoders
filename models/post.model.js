const mongoose = require("mongoose");
const slugify = require("slugify");
const { DateTime } = require("luxon");

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: "Please enter the title of the body",
    },
    body: {
      type: String,
      required: "Please enter the body of the body",
    },
    category: {
      type: String,
      enum: [
        "javascript",
        "php",
        "python",
        "htmlandcss",
        "flutter",
        "misc",
        "jobs",
      ],
      default: "misc",
    },
    slug: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

postSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "post",
});

postSchema.set("toJSON", { virtuals: true });
postSchema.set("toObject", { virtuals: true });

postSchema.pre("validate", function () {
  this.slug = slugify(this.title) + "-" + this._id.toString().slice(13);
});

postSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Post", postSchema);
