var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


var index = require('./routes/index');
var users = require('./routes/users');
var dashboard = require('./routes/dashboard');
var leads = require('./routes/leads');
var custom = require('./routes/custom');
var autoemail = require('./routes/autoemail');
var gmail = require('./routes/gmail');

var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(expressValidator());


app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
          , root    = namespace.shift()
          , formParam = root;

      while(namespace.length) {
          formParam += '[' + namespace.shift() + ']';
      }
      return {
          param : formParam,
          msg   : msg,
          value : value
      };
  }
}));


app.use('/api/index', index);
app.use('/api/users', users);
app.use('/api/dashboard', dashboard);
app.use('/api/leads', leads);
app.use('/api/custom', custom);
app.use('/api/autoemail', autoemail);
app.use('/', function(req, res){
	res.sendFile(path.join(__dirname, 'dist/index.html'));	
});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(error);
  res.json(error);
});

module.exports = app;
