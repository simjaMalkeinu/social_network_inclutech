const path = require("path");
const express = require("express");

const exphbs = require("express-handlebars");

const morgan = require("morgan");
const multer = require("multer");

const errorhandler = require('errorhandler')

const routes = require("../routes/index");

module.exports = (app) => {
  // settings
  app.set("port", process.env.PORT || 3000);

  app.set("views", path.join(__dirname, "views"));

  app.engine(
    ".hbs",
    exphbs.create({
      defaultLayout: "main",
      partialsDir: path.join(app.get("views"), "partials"),
      layoutsDir: path.join(app.get("views"), "layouts"),
      extname: ".hbs",
      helpers: require("./helpers"),
    }).engine
  );

  app.set("view engine", ".hbs");

  // middlewares
  app.use(morgan("common"));
  app.use(
    multer({
      dest: path.join(__dirname, "../public/upload/temp"),
    }).single("image")
  );

  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // routes
  routes(app);

  // static files
  app.use("/public", express.static(path.join(__dirname, "../public")));

  // errors handlers
  if('development' ===  app.get('env')){
    app.use(errorhandler)
  }

  return app;
};
