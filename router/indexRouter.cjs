const { Router } = require("express");
const indexController = require("../controllers/indexController.cjs");

const indexRouter = Router();

indexRouter.get("/", indexController.indexGet);
indexRouter.post("/create-folder", indexController.createFolderPost);

module.exports = indexRouter;
