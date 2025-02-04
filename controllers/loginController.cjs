const variables = require("../lib/variables.cjs");

const loginGet = (req, res) => {
  res.render("login", {
    title: variables.title,
    notif: { success: variables.successMsg, error: null },
  });
  // always reset the value to null, for it to not presist on refresh
  variables.successMsg = null;
};

module.exports = { loginGet };
