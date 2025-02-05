const { isNotAuth } = require("../lib/checkAuthentication.cjs");
const Props = require("../lib/Props.cjs");
const passport = require("passport");

const loginGet = [
  isNotAuth,
  (req, res) => {
    res.render("login", { props: Props.data });

    // mandatory reset of the notification messages - should always be writter at the end of the block
    Props.reset(["successMsg", "errorMsg"]);
  },
];

const loginPost = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});

module.exports = { loginGet, loginPost };
