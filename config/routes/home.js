var router = require('express').Router();

/* GET index page  */
router.get('/', function(req, res, next){
  res.render('index');
});
