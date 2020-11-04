var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require('express-ejs-layouts');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//var chatRouter = require('./routes/chat');

var app = express();

// view engine setup
app.use(expressLayouts)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('layout','./layout/main');
app.set("layout extractScripts", true)
app.set("layout extractStyles", true)





//app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public',express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);
// app.use('/chat', chatRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//socket.io 
let socket_io = require('socket.io');
let io = socket_io();
let socketAPI = {};


socketAPI.io = io;


// io.on('connection', async (socket) => {
//     console.log("connected! ID= ", socket.id)
//     socket.on('login', (username) => {
//         console.log('buoc 5: io.js nhan username: ' + username)
//     })
// })






module.exports = app;