class ChatController {
    // [GET] /chat
    index(req, res) {
        res.render('chat');
    }
}

    
module.exports = new ChatController();
