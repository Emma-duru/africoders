const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const userSchema = new mongoose.Schema(
  {
    username: String,
    platformId: String,
    imageUrl: String,
  },
  {
    timestamps: true,
  }
);

userSchema.virtual("posts", {
  ref: "Post",
  localField: "_id",
  foreignField: "author",
});

userSchema.set("toJSON", { virtuals: true });
userSchema.set("toObject", { virtuals: true });

userSchema.virtual("date_created").get(function () {
  return DateTime.fromJSDate(this.createdAt).toLocaleString(DateTime.DATE_MED);
});

module.exports = mongoose.model("User", userSchema);
