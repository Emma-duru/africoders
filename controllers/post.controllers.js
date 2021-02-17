const posts_get = (req, res) => {
  res.render("home", { title: "Home" });
};

module.exports = { posts_get };
