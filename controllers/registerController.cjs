const prismaQuery = require("../db/queries.cjs");
const variables = require("../lib/variables.cjs");

const registerGet = (req, res) => {
  res.render("register", { title: variables.title });
};

const registerPost = async (req, res) => {
  const creds = {
    email: req.body.email,
    password: req.body.password,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  const user = await prismaQuery.create.user(creds);
  variables.successMsg = "Registration Successful";
  res.redirect("/login");
};

module.exports = { registerGet, registerPost };
