const { body, validationResult } = require("express-validator");
const prismaQuery = require("../db/queries.cjs");
const Props = require("../lib/Props.cjs");
const { isAuth } = require("../lib/checkAuthentication.cjs");

const indexGet = [
  isAuth,
  (req, res) => {
    res.render("index", {
      props: Props.data,
      profile: req.user?.profile,
      folders: req.user?.profile.folder,
      route: "home",
    });

    // mandatory reset of the notification messages - should always be written at the end of the block
    Props.reset(["successMsg", "errorMsg", "createFolderErrors"]);
  },
];

const viewFolderGet = [
  isAuth,
  async (req, res) => {
    const selectedFolder = await prismaQuery.find.folder.byId(req.params.id);
    res.render("folder", {
      props: Props.data,
      profile: req.user.profile,
      folder: selectedFolder,
      route: "folder",
    });
  },
];

const createFolderPost = [
  body("name")
    .notEmpty()
    .withMessage("Folder must have a name")
    .trim()
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      Props.set("createFolderErrors", {
        defaultValue: [],
        currentValue: errors.array(),
      }); //TODO: show errors on the screen, create a different property for that
      return res.redirect("/");
    }
    try {
      await prismaQuery.create.folder({
        folderName: req.body.name,
        profileId: req.query.profile,
      });
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  },
];

module.exports = { indexGet, createFolderPost, viewFolderGet };
