var express = require('express');
var router = express.Router();
var db = require('../modules/dbconnection');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login page' });
});


router.login = function (req, res) {
  if(!req.session.loggedin) {      
    db.login(req,res);
  }
  else {
    console.log('loggedin: ' + req.session.username);
    res.render('add');
  }
  
}

router.logout = function (req,res) {
  
  if(req.session.loggedin) {
   db.logout(req,res);
  }
  else {
    res.render('login'); 
  }
}

router.addItem = function (req,res) {
  
  if(req.session.loggedin) {
    db.addAddress(req,res);
  }
  else {
    res.render('login'); 
  }
}

router.browse = function (req,res) {
  
  if(req.session.loggedin) {
    console.log('loggedin: ' + req.session.username);
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
  
  if(req.session.loggedin) {
    res.render('login',{notify: 'Nykyisen käyttäjän täytyy ensin kirjautua ulos!'});    
  }
  res.render('register');
} 

router.modify = function(req,res) {
  if(req.session.loggedin) {
    db.modifyUserData(req,res);
  }
  else {
    res.render('login');
  }
}

router.modifyForm = function(req,res) {
  if(req.session.loggedin) {
    db.getAddressInfo(req,res);
  }
  else {
    res.render('login');
  }
}

module.exports = router;
