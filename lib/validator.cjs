const { body, validationResult } = require("express-validator");

const supportedEmails = [
  "@gmail.com",
  "@yahoo.com",
  "@outlook.com",
  "@protomail.com",
  "@zoho.com",
  "@icloud.com",
  "@mail.com",
  "@gmx.com",
  "@yandex.com",
];

const inputValidator = [
  body("email")
    .notEmpty()
    .escape()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must use an email")
    .custom((value) => {
      for (let i = 0; i < supportedEmails.length; i++) {
        if (value.endsWith(supportedEmails[i])) {
          return true;
        }
      }
      throw new Error("Email provider is not supported");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .matches(/\d/)
    .withMessage("Must contain letters and numbers")
    .isLength({ min: 8, max: 32 })
    .withMessage("password length must be bewtween 8 and 32"),
];

const createFolderValidator = [
  body("name")
    .notEmpty()
    .withMessage("Folder must have a name")
    .trim()
    .matches(/[^a-zA-Z0-9]/)
    .withMessage("Must not contain special characters")
    .isLength({ min: 2, max: 15 })
    .withMessage("Name must be of length between 2 and 15"),
];

module.exports = { validationResult, inputValidator, createFolderValidator };
