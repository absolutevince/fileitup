const cloudStorage = require("../cloudinaryConfig.cjs");
const prismaQuery = require("../db/queries.cjs");
const { isAuth } = require("../lib/checkAuthentication.cjs");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer(storage);

const uploadPost = [
  isAuth,
  upload.single("file"),
  async (req, res) => {
    const file = {
      name: req.file.originalname,
      folderId: req.params.folderId,
      size: req.file.size + " bytes",
      content: req.file.buffer,
    };

    // add the file details to database connected to the users account

    cloudStorage
      .upload(file.content, file.name)
      .then(async (url) => {
        await prismaQuery.create.file({ ...file, url }); // add the url to the query
      })
      .catch((err) => {
        console.log(err);
      });

    res.redirect(`/folder/${req.params.folderId}`);
  },
];

module.exports = { uploadPost };
