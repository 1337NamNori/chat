$(document).ready(function () {
    console.log('da load xong trang mess')
    let socket = io()
    socket.emit('login', username)
    console.log('username: ' + username)



   
})
