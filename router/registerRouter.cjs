const { Router } = require("express");
const registerController = require("../controllers/registerController.cjs");

const registerRouter = Router();

registerRouter.get("/", registerController.registerGet);

module.exports = registerRouter;
