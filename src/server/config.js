const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const morgan = require("morgan");
const multer = require("multer");
const errorhandler = require("errorhandler");
const routes = require("../routes/index");
const posts = require("../routes/posts");
const users = require("../routes/users");
const chat = require("../routes/chat");
const session = require("express-session");
const flash = require("connect-flash");
const passport = require("passport");
const cors = require("cors");
const MongoStore = require("connect-mongo");

const { database } = require("../keys");

require("./passport");

module.exports = (app) => {
  // settings
  app.set("port", process.env.PORT || 3000);
  app.set("views", path.join(__dirname, "../views"));
  app.engine(
    ".hbs",
    exphbs.create({
      defaultLayout: "main",
      partialsDir: path.join(app.get("views"), "partials"),
      layoutsDir: path.join(app.get("views"), "layouts"),
      extname: ".hbs",
      helpers: require("./helpers"),
      runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
      },
    }).engine
  );
  app.set("view engine", ".hbs");

  // middlewares
  app.use(express.urlencoded({ extended: false }));
  app.use(methodOverride("_method"));
  app.use(
    session({
      secret: "mysecretapp",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({ mongoUrl: database.URI }),
    })
  );
  app.use(morgan("dev"));
  app.use(
    multer({
      dest: path.join(__dirname, "../public/upload/temp"),
    }).single("image")
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());

  app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.user = req.user ?? null;
    next();
  });

  app.use(express.json());
  app.use(cors());

  // routes
  routes(app);
  posts(app);
  users(app);
  chat(app);

  // static files
  app.use(express.static(path.join(__dirname, "../public")));

  // errors handlers
  if ("development" === app.get("env")) {
    app.use(errorhandler);
  }

  return app;
};
