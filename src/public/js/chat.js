$(function () {
  const socket = io();

  $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);

  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $userId = $("#user-id");
  const $userSend = $("#user-send");
  const $chat = $("#chat-messages");

  socket.emit('new chat', $userSend.val())

  $messageForm.submit((e) => {
    e.preventDefault();
    socket.emit("send message", {
      msg: $messageBox.val(),
      user: $userId.val(),
      send: $userSend.val()
    });
    $messageBox.val("");
  });

  socket.on("new message", (data) => {
    displayMsg(data);
    console.log(data)
  });


  function displayMsg(data) {
    const {msg, user} = data

    $chat.append(
      `<p style="margin-bottom: 0px;"><strong>${user.name}</strong>: ${msg}</p>
            <p style="text-align: right; color:blue;">{{timeago this.timestamp}}</p>`
    );

    $('#chat-messages').scrollTop($('#chat-messages')[0].scrollHeight);
  }
});
