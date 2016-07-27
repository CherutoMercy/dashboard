var express= require('express');
var router=express.Router();

//get Homepage
router.get('/', ensureAuthenticated, function(req, res){
  res.render('index');
  });

router.get('/use',function(req,res){
 res.render('users');
  });

router.get('/mail',function(req,res){
 res.render('mail');
  });

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    //req.flash('error_msg', 'You are not logged in');
    res.redirect('/users/login');
  }

 router.get('/logout', function(req, res){
    req.logout();

    req.flash('success_msg', 'You are logged out');

    res.redirect('/users/login');
  });
}
module.exports=router;
