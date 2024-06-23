$(function () {
  const socket = io();

  const $messageForm = $("#message-form");
  const $messageBox = $("#message");
  const $userId = $("#user-id");
  const $userSend = $("#user-send");
  const $chat = $("#chat");

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
    // displayMsg(data);
    console.log(data)
  });


  function displayMsg(data) {
    $chat.append(
      `<p class="p-2 bg-secondary w-75 animate__animated animate__backInUp"><b>${data.nick}</b>: ${data.msg}</p>`
    );
    const chat = document.querySelector("#chat");
    chat.scrollTop = chat.scrollHeight;
  }
});
