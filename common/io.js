let socket_io = require('socket.io');
let io = socket_io();
let socketAPI = {};


socketAPI.io = io;


io.on('connection', async (socket) => {
    console.log("connected! ID= ", socket.id)
    socket.on('login', (username) => {
        console.log('io.js nhan username: ' + username)
    })
})



module.exports = {
    socketAPI

}