const express = require("express");

const router = express.Router();
const posts = require("../controllers/posts");
const { isAuthenticated } = require("../helpers/auth");

module.exports = (app) => {
  router.get("/app", isAuthenticated, posts.all);
  router.get("/app/post/:id", isAuthenticated, posts.post);
  router.post("/app/new-post", isAuthenticated, posts.add);

  app.use(router);
};
