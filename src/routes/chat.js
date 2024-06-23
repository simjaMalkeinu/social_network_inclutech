const express = require("express");

const router = express.Router();

const chat = require("../controllers/chat");
const { isAuthenticated } = require("../helpers/auth");


module.exports = (app) => {
  router.get("/chat/:id_user", isAuthenticated, chat.index);
  app.use(router)
};
