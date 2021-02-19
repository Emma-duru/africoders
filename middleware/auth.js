const checkUser = (req, res, next) => {
  res.locals.user = req.user;
  next();
};

const requireAuth = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect("/auth/github");
  }
};

module.exports = { checkUser, requireAuth };
