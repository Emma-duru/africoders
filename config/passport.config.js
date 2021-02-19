const passport = require("passport");
const GitHubStrategy = require("passport-github2");
const User = require("../models/user.model");
require("dotenv").config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => done(null, user))
    .catch((err) => console.log(err));
});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/auth/github/redirect",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const currentUser = await User.findOne({ platformId: profile.id });
        if (currentUser) {
          done(null, currentUser);
        } else {
          const newUser = await User.create({
            username: profile.username,
            platformId: profile.id,
            imageUrl: profile._json.avatar_url,
          });
          done(null, newUser);
        }
      } catch (err) {
        console.log(err);
      }
    }
  )
);
