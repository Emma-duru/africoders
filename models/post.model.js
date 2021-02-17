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
      enum: ["javascript", "php", "python", "flutter", "misc", "jobs"],
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

postSchema.pre("validate", function () {
  this.slug = slugify(this.title) + "-" + this._id.toString().slice(13);
});

postSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("Post", postSchema);