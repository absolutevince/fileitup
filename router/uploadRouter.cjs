const { Router } = require("express");
const uploadController = require("../controllers/uploadController.cjs");

const uploadRouter = Router();

uploadRouter.post("/:folderId", uploadController.uploadPost);

module.exports = uploadRouter;
