/*
 * Name: TODO-App-Backend
 * Description: TODO-App-Backend with Node.js, Express, MongoDB
 * Author: Md. Samiur Rahman (Mukul)
 * Version: v1.0.0
 * Date: 14/6/2022
 * Last Modified: 14/6/2022
 *
 */

// imports modules & dependencies
const express = require("express");
const env = require("dotenv");
const favicon = require("serve-favicon");
var path = require("path");
var cors = require("cors");
const passport = require("passport");

// imports routes, middleware, and configs
const article = require("./src/routes/articles.route");
const auth = require("./src/routes/auth.route");
const { notFoundRoute, errorHandler } = require("./src/configs/errorHandler");

// loads environment variables from .env file
env.config();

// initializes express app
const app = express();

// application database connection establishment
const connectDatabase = require("./src/db/connect");
connectDatabase();

// corss-origin-allow-all
app.use(cors());

// sets favicon in routes
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

// sets static folder
app.use(express.static(path.join(__dirname, "public")));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());

require("./src/configs/passport")(passport);

// sets default route
app.get("/", (req, res) => {
  console.log("Welcome");
  res
    .status(200)
    .json({ message: "Welcome to TODO Node.js application backend." });
});

// todos api routes
app.use("/api/artctrl", article);
// auth api routes
app.use("/api/auth", auth);

// 404 - not found error handler
app.use(notFoundRoute);

// error handler
app.use(errorHandler);

// app listens to defined port
app.listen(5050, () => {
  console.log("TODO-App backend server running on: " + 5050);
});
