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
res.json({"success":1});

});



var server=app.listen(3001,function() {});

