const Chat = require("../models/Chat");
const User = require("../models/User");

module.exports = function (io) {
  let users = {};

  io.on("connection", async (socket) => {
    console.log("a user connected");

    socket.on("new chat", async(user) => {
      socket.user = user;
      socket.nickname = await User.findById(user)
      users[socket.user] = socket;
    });

    socket.on("send message", async (data) => {
      // console.log(data);

      const chat = new Chat({
        id_u_send: data.send,
        id_u_received: data.user,
        msg: data.msg,
      });

      await chat.save();

      console.log(users[socket.user].user);

      if (users[data.user]) {
        users[data.user].emit("new message", {
          msg: data.msg,
          user: socket.nickname,
        });
      }

      users[socket.user].emit("new message", {
        msg: data.msg,
        user: socket.nickname,
      });
    });
  });
};
