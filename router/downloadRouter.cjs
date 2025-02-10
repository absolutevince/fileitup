const { Router } = require("express");
const downloadController = require("../controllers/downloadController.cjs");

const downloadRouter = Router();

downloadRouter.get("/:fileId", downloadController.downloadGet);

module.exports = downloadRouter;
