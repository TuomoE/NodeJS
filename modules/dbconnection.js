var mongoose = require('mongoose');

var uri = 'mongodb://localhost/address_db';

// check if we can connect to mongodb...
mongoose.connect(uri,function(err,succ) {
    if(err) {
        console.log("Error: " + err);   
    }
    else {
        console.log('Connected to the database');  
    }
});

var Schema = mongoose.Schema;

//*********************************
// luodaan tietokanta schemat
var userSchema = new Schema({
  username:{type:String,index:{unique:true}},
  password:String,
});

var addressSchema = new Schema({
    firstname:String,
    lastname:String,
    address:String,
    phone:String,
    email:String,
});

var User = mongoose.model('user',userSchema);
var Address = mongoose.model('address', addressSchema);


//******************************************
// Lisää osoitteen kantaan address_db
// ja tarkistaa että kaikki tiedot on annettu
exports.addAddress = function(req,res){
  
  // tarkistetaan onko tyhjiä kenttiä
  var empty = 0;

  if(req.body.firstname === "" || req.body.firstname === undefined ||
     req.body.firstname === null){ 
    empty++;
  }
  if(req.body.lastname === "" || req.body.lastname === undefined ||
     req.body.lastname === null){ 
    console.log('hep');
    empty++;
  }
  if(req.body.address === "" || req.body.address === undefined ||
     req.body.address === null){ 
    empty++;
  }
  if(req.body.phone === "" || req.body.phone === undefined ||
     req.body.phone === null){ 
    empty++;
  }
  if(req.body.email === "" || req.body.email === undefined ||
     req.body.email === null){ 
    empty++;
  }
  
  // jos tietoja puuttuu pydetään täyttämään uudelleen
  // lähetetään täytetyt tiedot takaisin formiin
  if (empty > 0) {
    res.render('addAgain',{formdata:req.body}); 
  }
  
  // jos kentät on ok tallennetaan kantaan
  else {
  
  var new_address = new Address({
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  address:req.body.address,
  phone:req.body.phone,
  email:req.body.email,
  
  });
  
  new_address.save(function(err){ 

      if(err) {
        res.render('error', err);
      }
      else {
        console.log('Tallennetaan osoitetiedot kantaan');
        res.render('add');
      }
    });
    
  }   
}


//**********************************************
// haetaan kaikki osoitteet kannasta address_db
exports.getAddresses = function(req,res) {
  
    console.log('getAddresses');
    Address.find(function(err,data){
    
      if(err) {
        res.render('error',{}); 
        console,log('Virhe haussa');
      }
      else {
        console.log('yritetään tulostaa hakua');
        console.log(data);
        res.render('browse',{addresses:data}); 
        
      }
  });
  
}

exports.registerUser = function(req,res) {
 
  var empty = 0;
  console.log(req.body);
  if(req.body.username === "" || req.body.username === undefined ||
     req.body.username === null){ 
    empty++;
  }
  if(req.body.password === "" || req.body.password === undefined ||
     req.body.password === null){ 
    empty++;
  }
  if(req.body.password2 === req.body.password && empty === 0 ){ 
  
    var new_user = new User({
      username:req.body.username,
      password:req.body.password
    });
    
    new_user.save(function(err){ 

      if(err) {
        res.render('error', err);
      }
      else {
        console.log('Tallennetaan uusi käyttäjä kantaan');
        res.render('add');
      }
    }); 
  }
  else {
    res.render('register',{error: 'Annoit salasanan väärin tai jokin kenttä oli tyhjä'});
    
  }
}



exports.getAddressInfo = function(req,res) {
  console.log('getAddressInfo');
  console.log(req.query.id);
  Address.findById(req.query.id,function(err,data) {
  
    if(err) {
      res.render('error');
      
    }
    else {
     
      console.log(data);
      res.render('modify',{userdata:data});
    }
  });
}
