const variables = require("../lib/variables.cjs");

const registerGet = (req, res) => {
  res.render("register", { title: variables.title });
};

module.exports = { registerGet };
