const express = require("express");

const router = express.Router();

const users = require("../controllers/users");
const { isAuthenticated } = require("../helpers/auth");

module.exports = (app) => {
  router.get("/users/logout", isAuthenticated, users.logout);
  router.get("/users/signin", users.signin);
  router.post("/users/signin", users.signinData);
  router.get("/users/signup", users.signup);
  router.post("/users/signup", users.signupData);
  router.get("/users/myprofile", isAuthenticated, users.myprofile);
  router.get("/users/profile/:id", isAuthenticated, users.profile);
  app.use(router);
};
