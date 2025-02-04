const express = require("express");
const path = require("path");
const indexRouter = require("./router/indexRouter.cjs");
const loginRouter = require("./router/loginRouter.cjs");
const registerRouter = require("./router/registerRouter.cjs");

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/login", loginRouter);
app.use("/register", registerRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening to Port " + PORT);
});
