const prismaQuery = require("../db/queries.cjs");
const { isNotAuth } = require("../lib/checkAuthentication.cjs");
const Props = require("../lib/Props.cjs");

const registerGet = [
  isNotAuth,
  (req, res) => {
    res.render("register", { props: Props.data });

    // mandatory reset of notification messages - should always be written at the end of the block
    Props.reset(["successMsg", "errorMsg"]);
  },
];

const registerPost = async (req, res) => {
  const creds = {
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  try {
    await prismaQuery.create.user(creds);

    Props.set("successMsg", "Registration Success");
    res.redirect("/login");
  } catch (error) {
    Props.set("errorMsg", error);
    res.redirect("/register");
  }
};

module.exports = { registerGet, registerPost };
