const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

const dbName = 'greeklife';

MongoClient.connect(url, function(err, client) {
  console.log("Connected successfully to server");
 
  const db = client.db(dbName);
 
  const collection=db.collection("organization");
	
 collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
  
	console.log(docs)

	});



  //client.close();
});

