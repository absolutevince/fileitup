const prismaQuery = require("../db/queries.cjs");

const downloadGet = async (req, res) => {
  const file = await prismaQuery.find.file.byId(req.params.fileId);
  res.send(file.url); // send back the url to the file
};

module.exports = { downloadGet };
