const { Router } = require("express");
const indexController = require("../controllers/indexController.cjs");

const indexRouter = Router();
// GET
indexRouter.get("/", indexController.indexGet);
indexRouter.get("/folder/:id", indexController.viewFolderGet);
// POST
indexRouter.post("/create-folder", indexController.createFolderPost);
indexRouter.post("/logout", (req, res) => {
  req.logOut((err) => {
    if (err) {
      throw new Error(err);
    } else {
      res.redirect("/login");
    }
  });
});

module.exports = indexRouter;
