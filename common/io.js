let socket_io = require('socket.io');
let io = socket_io();
let socketAPI = {};
let usersList = [{
    id: 0,
    username: 'BOT'
}]


socketAPI.io = io;


io.on('connection', async (socket) => {
    console.log("connected! ID = ", socket.id)
    socket.on('login', (username) => {
        //console.log('io.js nhan username: ' + username)
        socket.username= username
        usersList.push({
            id: socket.id,
            username: username,
        })
        console.log(usersList);

       

        //broadcast new users to everyone
        io.emit('new user',{
            id: socket.id,
            username: username
        })
        socket.emit('show online users', { usersList,username: socket.username})
        
        io.emit('update users list', usersList)
    })

    // Event: client disconnects with server
    socket.on('disconnect', function(){
        for(let i = 0 ; i < usersList.length; i++){
            if(usersList[i].id == socket.id){
                io.emit('disconnect user', usersList[i])
                usersList.splice(i,1);
                break;
            }
        }
    })
    
})



module.exports = {
    socketAPI,
    usersList

}