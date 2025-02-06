const prismaQuery = require("../db/queries.cjs");
const { isNotAuth } = require("../lib/checkAuthentication.cjs");
const Props = require("../lib/Props.cjs");
const { validationResult, inputValidator } = require("../lib/validator.cjs");
const {
  formatRegistrationErrors,
  formatRegistrationInputValues,
} = require("../lib/format.cjs");

const registerGet = [
  isNotAuth,
  (req, res) => {
    // the error msg this specific route will always be an array
    const errorMessages = formatRegistrationErrors(Props.data.errorMsg);
    // returns an object with the properties being the name of the path the error came from
    res.render("register", {
      props: Props.data,
      emailErrorMsg: errorMessages?.email,
      passwordErrorMsg: errorMessages?.password,
      firstnameErrorMsg: errorMessages?.firstname,
      lastnameErrorMsg: errorMessages?.lastname,
    });

    // mandatory reset of notification messages - should always be written at the end of the block
    Props.reset(["successMsg", "errorMsg"]);
  },
];

const registerPost = [
  inputValidator,
  async (req, res) => {
    const errors = validationResult(req);
    try {
      if (errors.isEmpty()) {
        const creds = {
          email: req.body.email,
          password: req.body.password,
          firstname: req.body.firstname,
          lastname: req.body.lastname,
        };
        await prismaQuery.create.user(creds);

        Props.set("successMsg", "Registration Success");
        res.redirect("/login");
      } else {
        throw errors.errors;
      }
    } catch (error) {
      Props.set("errorMsg", error);
      res.redirect("/register");
    }
  },
];

module.exports = { registerGet, registerPost };
