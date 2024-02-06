require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const connectDB = require('./config/db')
const app = express();

/* RUTAS */ 
app 
  .use('/',require('./routes/index.routes')) 
  .use('/api/auth',require('./routes/auth.routes')) 
  .use('/api/users',require('./routes/users.routes')) 
  .use('/api/projects',require('./routes/projects.routes')) 
  .use('/api/tasks',require('./routes/tasks.routes'))


connectDB()

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  return res.status(err.status || 500).json({
    ok: false,
    msg: err.message
  })
});

module.exports = app;
