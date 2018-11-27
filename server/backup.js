var express=require('express');
var cors = require('cors')
var app=express();
app.use(cors()) 
var https = require('https');

var fs = require('fs');


var bodyParser = require('body-parser')
const bcrypt = require('bcrypt');
const saltrounds=10;

app.use( bodyParser.json({limit:'50mb'}) );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true,
   limit:'50mb'
})); 

var ObjectID = require('mongodb').ObjectID;


app.get('/',function(req,res)
{
res.send('Hello World!');
});

app.post('/adminlogin',function(req,res)
{

console.log("Admin Login ")
console.log(req.body.email)
console.log(req.body.password)

const collection=db.collection("admins");
let query={"email":req.body.email}

collection.find(query).toArray(function(err,docs)
{

//1st case
if (docs.length==0)
{
res.json({"success":0})
}
else{
user=docs[0]
console.log(user["email"])
console.log(user["password"])

bcrypt.compare(req.body.password,user["password"],function(err,bres)
{
if(bres)
{

console.log("Password matched");
res.json({"success":1})
}else
{
console.log("Password didn't match");
res.json({"success":0})
}

});




}
})
})


app.post('/login',function(req,res)
{
console.log("Login Hit ");
console.log(req.body.email)
console.log(req.body.password)

const collection=db.collection("organization");
let query={"email":req.body.email}
collection.find(query).toArray(function(err,docs)
{

//1st case 
if (docs.length==0)
{
console.log("user Not registered yet")
res.json({"success":-1})
}
else{
user=docs[0]
console.log(user["email"])
console.log(user["password"])

bcrypt.compare(req.body.password,user["password"],function(err,bres)
{
if(bres)
{

console.log("Password matched");
res.json({"success":1,gId:user._id.toString()})
}else
{
console.log("Password didn't match");
res.json({"success":0})
}

});

}


});

});

app.post('/getDashboard',function(req,res)
{
console.log("Getting Dashboard of a greek Life ",req.body.gid);
const collection=db.collection("apparels");
let query={"gId":req.body.gid}
collection.find(query).toArray(function(err,docs)
{
res.json({"success":1,data:docs})
});
})

app.post('/addApparel',function(req,res)
{
let name=req.body.name
let desc=req.body.description
let price=req.body.price
let logo=req.body.logo
let scount=req.body.scount
let mcount=req.body.mcount
let lcount=req.body.lcount
let xlcount=req.body.xlcount
let greeklifeId=req.body.greeklifeId

const collection=db.collection("apparels");

collection.insert({gId:greeklifeId,name:name,desc:desc,price:price,logo:logo,scount:scount,mcount:mcount,lcount:lcount,xlcount:xlcount},function(err,result)
{

if (err)  return;
console.log("Added Apparel ",req.body.name);
res.json({"success":1})

})


})


app.post('/editApparel',function(req,res)
{

let name=req.body.name
let desc=req.body.description
let price=req.body.price
let logo=req.body.logo
let scount=req.body.scount
let mcount=req.body.mcount
let lcount=req.body.lcount
let xlcount=req.body.xlcount
let greeklifeId=req.body.greeklifeId

console.log("Editing Apparel",req.body.apparelid)

const collection=db.collection("apparels");
collection.updateOne({'_id':ObjectID(req.body.apparelid)}, {$set: {name:name,desc:desc,price:price,logo:logo,scount:scount,mcount:mcount,lcount:lcount,xlcount:xlcount}},function(err, result){
if(err) console.log("Error updating");

res.json({"succes":1})


});


})


app.post('/getOrgInfo',function(req,res)
{
console.log("Getting org Info ")
const collection=db.collection("organization");
console.log(req.body.gid)
let query={"_id":new ObjectID(req.body.gid)}
collection.find(query).toArray(function(err,docs)
{
res.json({data:docs[0]})
});



})


app.post('/getApparelInfo',function(req,res)

{
console.log("Getting Apparel Info of ",req.body.appid)
const collection=db.collection("apparels");
let query={"_id":new ObjectID(req.body.appid)}

collection.find(query).toArray(function(err,docs)
{
res.json({data:docs[0]})

});



});


app.post('/getAllOrgs',function(req,res)
{
console.log("Displaying the Dashboard")
const collection=db.collection("organization");
let query={}
collection.find(query).toArray(function(err,docs)
{
res.json({data:docs})
});


})

app.post('/editprofile',function(req,res)
{
let pickup=req.body.location
let phone=req.body.phone

})

app.post('/validateProfile',function(req,res)
{
console.log("Validating Profile",req.body.gId)

const collection=db.collection("organization");
collection.updateOne({'_id':ObjectID(req.body.gId)}, {$set: {validated:1}},function(err, result){
if(err) console.log("Error updating");

res.json({"succes":1})


});



})

app.post('/register',function(req,res)
{

let university=req.body.university
let org=req.body.org
let pickup=req.body.location
let phone=req.body.phone
let email=req.body.email
let password=req.body.password
let logo=req.body.logo

const collection=db.collection("organization");
bcrypt.hash(password,saltrounds,function(err,hash){
//Store hash in password Database 

console.log("Hash is ",hash)
collection.insert({university:university,org:org,pickup:pickup,phone:phone,email:email,password:hash,logo:logo,validated:false},function(err,result){

console.log("Organization Registered Succesfully");
if (err){
console.log("Error is ",err)
res.json({"failure":1})

}
res.json({"success":1})

})

});


})

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'greeklife';

let db={}


var server=app.listen(3001,function() {



MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  db = client.db(dbName);

 // const collection=db.collection("apparels");


});

})
