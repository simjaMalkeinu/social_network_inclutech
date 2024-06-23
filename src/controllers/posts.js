const Post = require("../models/Post.js");
const User = require("../models/User.js");
const path = require("path");
const fs = require("fs-extra");

const Comment = require("../models/Comment.js");

const ctrl = {};

ctrl.all = async (req, res) => {
  const posts = await Post.find().sort({ date: "desc" });
  const companies = await User.find({typeUser: "Empresa"})
  res.render("dashboard/principal-view", {
    posts,
    companies
  });
};

ctrl.post = async (req, res) => {
  const post = await Post.findById(req.params.id);
  const comments = await Comment.find({id_post: req.params.id})
  res.render("dashboard/post-info", {
    post,
    comments
  });
};

ctrl.postcomment = async (req, res) => {
  const newComment = new Comment(req.body);

  newComment.id_post = req.params.id_post;
  newComment.id_user = req.id_user;
  newComment.usser = req.user;

  await newComment.save();

  req.flash("success_msg", "Comentario guardado correctamente");
  res.redirect("/app/post/" + req.params.id_post);
};

ctrl.add = async (req, res) => {
  const { post } = req.body;
  let errors = [];

  if (!post) {
    errors.push({ msg: "pleace insert a text" });
  }

  if (errors.length > 0) {
    res.render("dashboard/principal-view", {
      errors,
      post,
    });
  }

  const newPost = new Post({
    text: post,
  });

  newPost.id_user = req.user.id;
  newPost.user = req.user;

  const result = await newPost.save();

  if (req.file) {
    const imageTemPath = req.file.path;
    const ext = path.extname(req.file.originalname);
    const targetPath = path.resolve(`src/public/upload/${result.id}${ext}`);
    console.log(targetPath);

    if (ext === ".png" || ext === ".jpg" || ext === ".jpeg" || ext === ".gif") {
      await fs.rename(imageTemPath, targetPath);
      await Post.findByIdAndUpdate(result.id, { img: `${result.id}${ext}` });
    }
  }

  req.flash("success_msg", "Publicacion guardada correctamente");
  res.redirect("/app");
};

module.exports = ctrl;
