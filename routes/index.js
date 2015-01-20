var express = require('express');
var router = express.Router();
var db = require('../modules/dbconnection');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login page' });
});


router.login = function (req, res) {
         
    db.login(req,res);
}

router.logout = function (req,res) {
 
   db.logout(req,res);
}

router.addItem = function (req,res) {

  db.addAddress(req,res);

}

router.browse = function (req,res) {
  
  if(req.session.loggedin) {
    db.getAddresses(req,res);
  }
  else {
    res.render('login');
  }
}

router.reguser = function(req,res) {
  
  db.registerUser(req,res); 
}

router.register = function(req,res) {
  
  res.render('register');
} 

router.modify = function(req,res) {
 
  // db.modifyUserData
}

router.modify_userdata = function(req,res) {

  db.getAddressInfo(req,res);
  
}

module.exports = router;
