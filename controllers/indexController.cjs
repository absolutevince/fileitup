const variables = require("../lib/variables.cjs");

const indexGet = (req, res) => {
  res.render("index", { title: variables.title });
};

module.exports = { indexGet };
