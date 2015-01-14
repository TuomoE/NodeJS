var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('login', { title: 'Login page' });
});

//router.get('/login', function(req,res) {
  
//  res.render('addressbook', { title: 'Addressbook' });
//});
router.login = function (req, res) {
  
  res.render('addressbook', { title: 'Addressbook' });
}
module.exports = router;
