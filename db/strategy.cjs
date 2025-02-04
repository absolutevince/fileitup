const { LocalStrategy } = require("passport-local").Strategy;

module.exports = new LocalStrategy(
  { usernameField: "email" },
  async (username, password, done) => {
    // TODO - configure the local strategy
  },
);
