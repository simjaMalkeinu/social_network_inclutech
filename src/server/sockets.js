const Chat = require('../models/Chat')

module.exports = function (io) {
  io.on("connection", async (socket) => {
    console.log("a user connected");

    socket.on('send message', async (data) => {

      console.log(data)

      const chat = new Chat({
        id_u_send: data.send,
        id_u_received: data.user,
        msg: data.msg
      })

      await chat.save();

      io.sockets.emit('new message', {
          msg: data,
          nick: socket.nickname
      });
  });
  });
  
};
