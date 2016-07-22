var express = require('express');
var app     = express();
var config  = require('./config/config');
var routes  = require('./config/routes/home');

app.set('view engine', 'html');
app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/assets'));

app.listen(config.port, function(err){
  if (err) throw err;
  console.log('app is running on port ', config.port);
});
