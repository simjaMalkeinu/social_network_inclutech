const Chat = require("../models/Chat");
const User = require("../models/User");
const ctrl = {};

ctrl.index = async (req, res) => {
  console.log(req.params)

  const receiver = await User.findById(req.params.id_user);
  const messages = await Chat.find({
    id_u_send: req.id_user,
    id_u_received: req.params.id_user,
  });

  console.log(receiver)
  res.render("chat/chat-view", {
    receiver,
    messages
  });
};

module.exports = ctrl;
