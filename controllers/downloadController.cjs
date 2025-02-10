const prismaQuery = require("../db/queries.cjs");

const downloadGet = async (req, res) => {
  const file = await prismaQuery.find.file.byId(req.params.fileId);
  const fileUrl = file.url.replace("/upload/", "/upload/fl_attachment/");
  res.redirect(fileUrl);
};

module.exports = { downloadGet };
