const isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  }
  res.redirect("/login");
};

const isNotAuth = (req, res, next) => {
  if (!req.isAuthenticated()) {
    next();
  }
  res.redirect("/");
};

module.exports = { isAuth, isNotAuth };
