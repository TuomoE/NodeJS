var express = require('express');
var router = express.Router();
var db = require('../modules/dbconnection');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login page' });
});


router.login = function (req, res) {
  
  //if(req.body.username === "Tuomo" && req.body.password === "1") {
    
//    req.session.loggedin = true;
    res.render('add', {title: 'Add Address'});  
//  } 
//  else {
//    res.send('<h1>Annoit käyttäjätunnusen tai salasanan vääärin!</h1>');
      
//  }
}

router.addItem = function (req,res) {

  db.addAddress(req,res);

}

router.browse = function (req,res) {
  
  db.getAddresses(req,res);
  
}

router.reguser = function(req,res) {
  
  db.registerUser(req,res); 
}

router.register = function(req,res) {
  
  res.render('register');
} 

router.modify = function(req,res) {
 
  // tähän kutsu db.modifyUserData ja toteutus db:hen
}

router.modify_userdata = function(req,res) {

  db.getAddressInfo(req,res);
  
}

module.exports = router;
