const User = require("../models/User");
const Post = require('../models/Post')
const passport = require("passport");

const ctrl = {};

ctrl.signin = (req, res) => {
  res.render("users/signin");
};
ctrl.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

ctrl.myprofile = (req, res) => {
  res.render('users/myprofile')
}

ctrl.profile = async(req, res) => {

  console.log(req.params)
  try {
    const user = await User.findById(req.params.id)
    const posts = await Post.find({id_user: req.params.id})
    res.render('dashboard/profile', {
      user,
      posts
    })
  } catch (error) {
    res.redirect('/app')
  }
}


ctrl.signinData = passport.authenticate("local", {
  successRedirect: "/app",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

ctrl.signup = (req, res) => {
  res.render("users/signup");
};

ctrl.signupData = async (req, res) => {
  const { name, email, password, confirm_password } = req.body;
  const errors = [];
  if (password !== confirm_password) {
    errors.push({ text: "Password do not match" });
  }
  if (password.length < 4) {
    errors.push({ text: "Password must be at last 4 characters" });
  }
  if (errors.length > 0) {
    res.render("users/signup", {
      errors,
      name,
      password,
      email,
      confirm_password,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use");
      res.redirect("/users/signup");
    }

    const newUser = new User({ name, email, password });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "You are registered");
    res.redirect("/users/signin");
  }
};
module.exports = ctrl;
