var express = require('express');
var router = express.Router();
let ioAPI = require('../common/io')

/* GET home page. */
router.get('/', function(req, res, next) {
  //let title='Document'
  res.render('index', {title: 'Login' });
});

// POST chat page.
router.post('/chat', function(req, res, next) {
  let {username, password} = req.body
  res.render('chat', {title:'Messenger',username})
})


module.exports = router;
