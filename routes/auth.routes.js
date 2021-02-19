const router = require("express").Router();
const passport = require("passport");

router.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

router.get(
  "/github/redirect",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/");
  }
);

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
