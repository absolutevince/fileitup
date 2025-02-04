const { Router } = require("express");
const loginController = require("../controllers/loginController.cjs");

const loginRouter = Router();

loginRouter.get("/", loginController.loginGet);

module.exports = loginRouter;
