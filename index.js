var express = require('express');
var app     = express();
var routes  = require('./routes/home');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local'),Strategy;
var mongo = require('mongodb');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/consult');
var db = mongoose.connection;

var users = require('./routes/users');

// set static folder
//app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/assets'));
//view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//body-parser and cokie-parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(cookieParser());

//express session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true
}));

//pasport initialize
app.use(passport.initialize());
app.use(passport.session());

//express validator
app.use(expressValidator({
  errorFormatter:function(param, msg, value){
    var namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;
    while(namespace.length){
      formParam += '['+ namespace.shift()+ ']';
    }
    return{
      param : formParam,
      msg : msg,
      value : value
    };
  }
}));
//connect-flash
app.use(flash());

//global vars
app.use(function(req, res, next){
  res.locals.success_msg =  req.flash('success_msg');
  res.locals.error_msg =  req.flash('error_msg');
  res.locals.error =  req.flash('error');
  res.locals.user =  req.user || null;
  next();
});

//routes middleware
app.use('/', routes);
app.use('/users', users);

app.set('port',(process.env.PORT || 8080));
app.listen(app.get('port'),function(){
  console.log('Running on port '+app.get('port'));
});