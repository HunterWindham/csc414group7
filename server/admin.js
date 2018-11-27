const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'greeklife';

let db={}

const bcrypt = require('bcrypt');
const saltrounds=10;



MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");

  db = client.db(dbName);

let email="admin.greeklife@usm.edu"
let password="admin123"

	const collection=db.collection("admins");
 
bcrypt.hash(password,saltrounds,function(err,hash){

console.log("Hash is ",hash)
collection.insert({email:email,password:hash})

console.log("Admin Record succesfully inserted ")

})

// const collection=db.collection("apparels");


});

