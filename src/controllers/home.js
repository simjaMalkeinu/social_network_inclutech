const ctrl = {};

ctrl.index = (req, res) => {
  if (req.user) {
    res.redirect("/app");
  } else {
    res.render('users/signin')
  }
};



module.exports = ctrl;
