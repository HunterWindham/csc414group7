var express=require('express');
var cors = require('cors')
var app=express();
app.use(cors())
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies

app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


app.get('/',function(req,res)
{
res.send('Hello World!');
});

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
}
else{
user=docs[0]
console.log(user["email"])
console.log(user["password"])

if(user["password"]==req.body.password)
{
res.json({"success":1})

}else
{

res.json({"success":0})
}
}

});


});


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

collection.insert({org:org,pickup:pickup,phone:phone,email:email,password:password,logo:logo},function(err,result){

if (err)  return;
res.json({"success":1})

})



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
