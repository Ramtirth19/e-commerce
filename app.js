var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var dotenv = require('dotenv');
const db = require("./config/db");
const cors = require('cors');

dotenv.config();
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

//user route
let userRoute = require("./routes/user");
let productRoute = require("./routes/product")
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(cors({
    "origin": "10.8.10.153",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
}));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/user", userRoute);
app.use("/product", productRoute);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server started successfully and running at " + port);
});

module.exports = app;