$(document).ready(function () {
    //console.log('da load xong trang mess')
    let socket = io()
    socket.emit('login', username)
    socket.emit('show-online-users', username)
    console.log('username: ' + username)
    let usersList = null;

    //show online users: function
    function showOnlineUsers(usersList, username) {
        $('#inbox-chat').html('')
        for (let i = 0; i < usersList.length; i++) {
            if (username == usersList[i].username) {
                console.log('same id')
                continue;
            } else {

                $('#inbox-chat').append(`
        <div class="chat_list" id="contact-${usersList[i].id}">
            <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil">
                </div>
                <div class="chat_ib">
                <h5>${usersList[i].username}</h5>
              
                </div>
            </div>
        </div>        
        `)
            }
        }
    }

    function newUserLogin(user) {
        if (user.id == socket.id) {
            console.log('same id')
            return;
        }
        $('#inbox-chat').append(`
        <div class="chat_list" id="contact-${user.id}">
            <div class="chat_people">
                <div class="chat_img"> <img src="https://ptetutorials.com/images/user-profile.png"
                    alt="sunil">
                </div>
                <div class="chat_ib">
                <h5>${user.username}</h5>
              
                </div>
            </div>
        </div>        
        `)
    }

    function getUserByID(id) {
        if (usersList === null || usersList === undefined) {
            console.log("usersList null hoac undefined")
            return null;
        } else {
            for (let i = 0; i < usersList.length; i++) {
                if (usersList[i].id == id) {
                    console.log(usersList[i].username);
                    return usersList[i].username;
                }
            }
        }
    }

    function disconnectContact(user) {
        let contact = $(`#contact-${user.id}`)
        if (contact)
            contact.remove();
    }





    //show online users: socket.io

    socket.on('show online users', (user) => {
        let usersList = user.usersList
        let username = user.username
        showOnlineUsers(usersList, username)
    })

    socket.on('new user', (user) => {
        newUserLogin(user)
    })


    socket.on('update users list', updatedUsersList => {
        usersList = updatedUsersList
        getUserByID(usersList)
    })

    //disconnect
    socket.on('disconnect user', user => {
        disconnectContact(user)
    })




    //send message
    $('#send-btn').click((e) => {
        let message = $('#message-content').val()
        $('#message-content').val('')
        console.log(message)

    })

})



