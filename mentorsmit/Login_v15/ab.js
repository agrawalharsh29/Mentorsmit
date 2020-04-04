var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
app.use(bodyParser.urlencoded({ extended: true })); 
var http = require('http');
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "Harsh",
  password: "Hhhh@1234",
  database: "mentorsmit"
});
con.connect(function(err) {
  if (err) throw err;
  app.post('/ab', function(req, res) {
  // res.send('You sent the name "' + req.body.username + '".');
  var username = req.body.username;
  var password = req.body.password;
  con.query("SELECT * FROM data where `uname`= '"+username+"' AND pwd = '"+password+"' ", function (err, result, fields) {
    if (err) throw err;
    if(result.length>0){
    	console.log("logged in");
    	
      res.redirect('https://www.linkedin.com/feed/');
      // res.send('<script>window.location.href="file:///C:/Users/HARSH%20AGRAWAL/Desktop/mentorsmit/abcd.html";</script>');
    }
    else{
    	console.log("incorrect password");
    }
  });
});
});
app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

