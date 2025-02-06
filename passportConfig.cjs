const prismaQuery = require("./db/queries.cjs");
const bcrypt = require("bcrypt");
const Props = require("./lib/Props.cjs");

const LocalStrategy = require("passport-local").Strategy;

const passportInitialize = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        try {
          const user = await prismaQuery.find.user.byEmail(email);
          if (!user) {
            Props.set("errorMsg", {
              emailErrorMsg: "Email not registered",
              passwordErrorMsg: null,
            });
            return done(null, false);
          }
          if (await bcrypt.compare(password, user.password)) {
            Props.set(
              "successMsg",
              `Login Successful: Welcome ${user.profile.firstname}`,
            );
            return done(null, user);
          } else {
            Props.set("errorMsg", {
              passwordErrorMsg: "Incorrect Password",
              emailErrorMsg: null,
            });
            return done(null, false);
          }
        } catch (error) {
          return done(error);
        }
      },
    ),
  );

  passport.serializeUser((user, done) => {
    return done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    return done(null, await prismaQuery.find.user.byId(id));
  });
};

module.exports = passportInitialize;
