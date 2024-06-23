const Chat = require("../models/Chat");
const User = require("../models/User");
const ctrl = {};

ctrl.index = async (req, res) => {
  const receiver = await User.findById(req.params.id_user);

  const messages = await Chat.find({
    $or: [
      { id_u_send: req.user.id, id_u_received: req.params.id_user },
      { id_u_send: req.params.id_user, id_u_received: req.user.id },
    ],
  })
    .populate("id_u_send", "name email") // Populate para el remitente
    .populate("id_u_received", "name email"); // Populate para el destinatario

  res.render("chat/chat-view", {
    receiver,
    messages,
  });

};

module.exports = ctrl;
