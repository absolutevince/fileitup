const prismaQuery = require("../db/queries.cjs");
const { isAuth } = require("../lib/checkAuthentication.cjs");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

const uploadPost = [
  isAuth,
  upload.single("file"),
  async (req, res) => {
    const file = {
      name: req.file.originalname,
      folderId: req.params.folderId,
      size: req.file.size + " bytes",
    };
    // add the file details to database connected to the users account
    await prismaQuery.create.file(file);
    res.redirect(`/folder/${req.params.folderId}`);
  },
];

module.exports = { uploadPost };
