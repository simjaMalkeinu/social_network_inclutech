const express = require("express");

const router = express.Router();

const users = require("../controllers/users");

module.exports = (app) => {
  router.get("/users/signin", users.signin);
  router.post("/users/signin", users.signinData);
  router.get("/users/signup", users.signup);
  router.post("/users/signup", users.signupData);

  app.use(router)
};
