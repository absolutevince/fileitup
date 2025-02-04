const prismaQuery = require("../db/queries.cjs");
const variables = require("../lib/variables.cjs");

const indexGet = async (req, res) => {
  res.render("index", { title: variables.title });
  console.log(await prismaQuery.find.user.byEmail("testing@email.com"));
  variables.successMsg = "";
};

module.exports = { indexGet };
