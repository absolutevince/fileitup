const express = require("express");
const session = require("express-session");
const path = require("path");
const passport = require("passport");
const passportInitialize = require("./passportConfig.cjs");
const indexRouter = require("./router/indexRouter.cjs");
const loginRouter = require("./router/loginRouter.cjs");
const registerRouter = require("./router/registerRouter.cjs");
const Props = require("./lib/Props.cjs");

const app = express();
passportInitialize(passport); // initialize passport

Props.init({
  title: "File-it-up",
  successMsg: null,
  errorMsg: null,
});

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
  }),
);
app.use(passport.session());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening to Port " + PORT);
});
