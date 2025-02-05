const prismaQuery = require("../db/queries.cjs");
const Props = require("../lib/Props.cjs");
const { isAuth } = require("../lib/checkAuthentication.cjs");

const indexGet = [
  isAuth,
  (req, res) => {
    console.log(req.user);
    res.render("index", { props: Props.data, userProfile: req.user.profile });
    // mandatory reset of the notification messages - should always be written at the end of the block
    Props.reset(["successMsg", "errorMsg"]);
  },
];

module.exports = { indexGet };
