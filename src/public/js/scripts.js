$(function () {
    $('#btn-start-chat').click(function (e){
        let userId = $(this).data('id');
        console.log(userId)
        window.location.assign("/chat/" + userId);
    })
})