var mongoose = require('mongoose');


//************************************
// otetaan yhteys tietokantaan
//************************************
var uri = 'mongodb://localhost/address_db';

mongoose.connect(uri,function(err,succ) {
    if(err) {
        console.log("Error: " + err);   
    }
    else {
        console.log('Connected to the database');  
    }
});


//************************************
// Schemat luodaan tässä
//**************************************
var Schema = mongoose.Schema;

//*********************************
// luodaan tietokanta schemat
//*********************************
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
// rekisteröidään käyttäjä
//*****************************************
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
        res.render('register', {error:'Rekisteröinti epäonnistui. Tunnus ehkä jo käytössä'});
      }
      else {
        console.log('Tallennetaan uusi käyttäjä kantaan');
        res.render('login',{newUser:req.body.username,info:'Hei ' + req.body.username + '! Nyt voit kirjautua tunnuksillasi sisään.'});
      }
    }); 
  }
  else {
    res.render('register',{error: 'Annoit salasanan väärin tai jokin kenttä oli tyhjä'});
    
  }
}

//*********************************************
// kirjaudutaan sisään. tarkistetaan ettei tunnusta/salasanaa jo löydy.
// asetetaan cookie
//********************************************
exports.login = function(req,res) {
  
  var reqUsername = req.body.username;
  var reqPassword = req.body.password;
  
  User.find({username:reqUsername,password:reqPassword},function(err,user) {

  console.log(err);
  console.log(user[0]);
    
  if(err || user[0] === undefined || user[0] === null) {

    console.log('ei saatu haettua käyttäjätietoja');
    res.render('login',{error: 'Käyttäjätunnus tai salasana on väärin'});
  }
  else {
    console.log(user[0].username);
    req.session.loggedin = true;
    req.session.username = user[0].username;
    console.log('tallennettu sessio ' + req.session.username);
    res.render('add',{userinfo:req.session.username});
  }  
  });
  
  
}

//***********************************
// kirjaudutaan ulos ja poistetaan cookiet selaimesta
//**********************************
exports.logout = function(req,res) {
  console.log('logout funktio');
//  delete req.session.loggedin;
  req.session.destroy();
  res.render('login',{userinfo:'Cookiet poistettu'})
}

//******************************************
// Lisää osoitteen kantaan address_db
// ja tarkistaa että kaikki tiedot on annettu
//*****************************************
exports.addAddress = function(req,res){
  
  // tarkistetaan onko tyhjiä kenttiä
  var empty = 0;

  if(req.body.firstname === "" || req.body.firstname === undefined ||
     req.body.firstname === null){ 
    empty++;
  }
  if(req.body.lastname === "" || req.body.lastname === undefined ||
     req.body.lastname === null){ 
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
    res.render('add',{error: "Kaikki kentät on täytettävä."}); 
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
          // käsittele virheet

      }
      else {
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
     //   console.log(data);
        res.render('browse',{addresses:data}); 
        
      }
  });
  
}


//********************************************
// Haetaan haluttu osoitetieto ja tuodaan formissa tiedot
//******************************************
exports.getAddressInfo = function(req,res) {
  console.log('getAddressInfo');
  console.log(req.query.id);
  Address.findById(req.query.id,function(err,data) {
  
    if(err) {
      res.render('error');
      
    }
    else {
     
      console.log(data);
      res.render('contactInfo',{userdata:data});
    }
  });
}

//*********************************************
// Tallennetaan muuttuneet tiedot
// to-do: päivitys kantaan. routtaus.
//*****************************************
exports.modifyUserData = function(req,res) {
  
  
  console.log(req.query.id);

  Address.findOne(req.query.id, function(req,user) {
    
    res.render('modify', {userdata:user});
  }); 
}
            


  // tarkistetaan onko tyhjiä kenttiä
/*  var empty = 0;

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
  */