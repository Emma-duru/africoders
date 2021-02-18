const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const passport = require("passport");
const cookieSession = require("cookie-session");
require("dotenv").config();

const postRoutes = require("./routes/post.routes");
const passportConfig = require("./config/passport.config");

const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
);
app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(
  process.env.MONGO_DBURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Connected to MongoDB");
    }
  }
);

const checkUser = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

app.use("/", checkUser, postRoutes);

app.get(
  "/auth/github",
  passport.authenticate("github", {
    scope: ["profile"],
  })
);

app.get(
  "/auth/github/redirect",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    res.redirect("/");
  }
);

app.listen(4000, () => {
  console.log("Server is running");
});
