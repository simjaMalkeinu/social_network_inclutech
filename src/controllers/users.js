const User = require("../models/User");
const Post = require("../models/Post");
const Chat = require("../models/Chat");
const passport = require("passport");

const ctrl = {};

ctrl.signin = (req, res) => {
  if (req.user) {
    res.redirect("/app");
  } else {
    res.render("users/signin");
  }
};
ctrl.logout = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

ctrl.myprofile = async (req, res) => {
  const posts = await Post.find({ id_user: req.user.id }).sort({
    date: "desc",
  });
  res.render("users/myprofile", {
    posts,
  });
};

ctrl.profile = async (req, res) => {
  console.log(req.params);
  try {
    const user = await User.findById(req.params.id);
    const posts = await Post.find({ id_user: req.params.id });
    res.render("dashboard/profile", {
      user,
      posts,
    });
  } catch (error) {
    res.redirect("/app");
  }
};

ctrl.chats = async (req, res) => {
  const { id } = req.params;

  const messages = await Chat.find({
    $or: [{ id_u_send: req.user.id }, { id_u_received: req.user.id }],
  })
    .populate("id_u_send", "name email") // Populate para el remitente
    .populate("id_u_received", "name email"); // Populate para el destinatario

  let chats = new Map();

  // Iterar sobre cada mensaje en el arreglo
  messages.forEach((mensaje) => {
    // Agregar id_u_send al mapa si no existe
    if (!chats.has(mensaje.id_u_send.name)) {
      chats.set(mensaje.id_u_send.name, mensaje.id_u_send);
    }
    // Agregar id_u_received al mapa si no existe
    if (!chats.has(mensaje.id_u_received.name)) {
      chats.set(mensaje.id_u_received.name, mensaje.id_u_received);
    }
  });

  chats = Array.from(chats.values());

  chats = chats.filter((u) => u.id !== req.user.id);

  console.log(chats);

  res.render("users/chats", { chats });
};

ctrl.signinData = passport.authenticate("local", {
  successRedirect: "/app",
  failureRedirect: "/users/signin",
  failureFlash: true,
});

ctrl.signup = (req, res) => {
  if (req.user) {
    res.redirect("/app");
  } else {
    res.render("users/signup");
  }
};

ctrl.signupData = async (req, res) => {
  const { name, email, password, confirm_password, typeUser } = req.body;
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
      typeUser,
    });
  } else {
    const emailUser = await User.findOne({ email: email });
    if (emailUser) {
      req.flash("error_msg", "The Email is already in use");
      res.redirect("/users/signup");
    }

    const newUser = new User({ name, email, password, typeUser });
    newUser.password = await newUser.encryptPassword(password);
    await newUser.save();
    req.flash("success_msg", "You are registered");
    res.redirect("/users/signin");
  }
};
module.exports = ctrl;
