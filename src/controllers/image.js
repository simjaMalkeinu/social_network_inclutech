const ctrl = {};

ctrl.index = (req, res) => {
  res.send("image page");
};

ctrl.create = (req, res) => {
  res.send("creating image");
};

ctrl.like = (req, res) => {
  res.send("like image");
};

ctrl.comment = (req, res) => {
  res.send("like image");
};

ctrl.delete = (req, res) => {
  res.send("like image");
};
module.exports = ctrl;
