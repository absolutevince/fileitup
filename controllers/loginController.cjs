const variables = require("../lib/variables.cjs");

const loginGet = (req, res) => {
  res.render("login", { title: variables.title });
};

module.exports = { loginGet };
