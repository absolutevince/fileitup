const express = require("express");
const session = require("express-session");
const { PrismaSessionStore } = require("@quixo3/prisma-session-store");
const path = require("path");
const passport = require("passport");
const passportInitialize = require("./passportConfig.cjs");
const indexRouter = require("./router/indexRouter.cjs");
const loginRouter = require("./router/loginRouter.cjs");
const registerRouter = require("./router/registerRouter.cjs");
const uploadRouter = require("./router/uploadRouter.cjs");
const Props = require("./lib/Props.cjs");
const { PrismaClient } = require("@prisma/client");

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
    store: new PrismaSessionStore(new PrismaClient(), {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdFunction: undefined,
      dbRecordIdIsSessionId: true,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000,
    },
  }),
);
app.use(passport.session());
app.use(passport.initialize());

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);
app.use("/upload-file", uploadRouter);
app.get("*", (req, res) => {
  res.send("404 not found");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening to Port " + PORT);
});
