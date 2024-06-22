const express = require("express");

const router = express.Router();
const posts = require("../controllers/posts");

module.exports = (app) => {

  router.get("/app", posts.all );
  router.post("/app/new-post", posts.add );

  app.use(router)
};
