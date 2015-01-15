var mongoose = require('mongoose');

var uri = 'mongodb://localhost/address_db';

// check if we can connect to mongodb...
mongoose.connect(uri,function(err,succ) {
    if(err) {
        console.log("Error: " + err);   
    }
    else {
        console.log('Connected:' + uri);  
    }
});

var Schema = mongoose.Schema;

var addressSchema = new Schema({
    firstname:String,
    lastname:String,
    address:String,
    phone:String,
    email:String
});

var Address = mongoose.model('address', addressSchema);

exports.addAddress = function(req,res){
  console.log('Luodaan uusi address dokkari');
  console.log(req.body);
  
  var new_address = new Address({
  firstname:req.body.firstname,
  lastname:req.body.lastname,
  address:req.body.address,
  phone:req.body.phone,
  email:req.body.email
    
  });
  
  new_address.save(function(err){
    
   if(err) {
    
     res.render('error', err);
   }
    else {
      console.log('Tallennetaan adress dokkari');
    //  console.log(new_address.body); 
  //    res.redirect('/');
    }
  });
}

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
/*
exports.getCourseInfo = function(req,res) {
  
  console.log(req.query);
  Course.findById(req.query.id,function(err,data) {
  
    if(err) {
      res.render('error');
      
    }
    else {
     
      console.log(data);
      res.render('courseInfo',data);
    }
  });
}
*/