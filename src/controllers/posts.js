const Post = require("../models/Post");

const ctrl = {};

ctrl.all = async (req, res) => {
  const posts = await Post.find().sort({date: 'desc'});
  res.render("dashboard/principal-view", {
    posts,
  });
};

ctrl.add = async (req, res) => {
  const { post } = req.body;
  console.log(req.body);
  const errors = [];

  !post ? errors.push({ msg: "pleace insert a text" }) : null;

  if (errors.length > 0) {
    res.render("dashboard/principal-view", {
      errors,
      post,
    });
  } else {
    const newPost = new Post({
      text: post,
    });
    
    await newPost.save();

    req.flash('success_msg', 'Publicacion guardada correctamente')
    res.redirect("/app");
  }
};

module.exports = ctrl;
