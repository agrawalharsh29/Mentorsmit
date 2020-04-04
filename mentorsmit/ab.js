// connection with database

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
  var username = req.body.username;
  var password = req.body.password;

  // login authentication from database
  con.query("SELECT * FROM data where `uname`= '"+username+"' AND pwd = '"+password+"' ", function (err, result, fields) {
    if (err) throw err;
    if(result.length>0){
    	console.log("logged in");
    	
      res.redirect('https://agrawalharsh29.github.io/WED_DEV_PROJECTS/abcd.html');
    }
    else{
    	console.log("incorrect password");
    }
  });
});
});

// use of ejs to render html page and provide teacher details from database.
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.get('/mentors2',function(req,res)
{
   con.query("SELECT * FROM teacher_details", function (err, result, fields) {
              var sn = JSON.stringify(result);
              var ab = result[0].tname;
              var s = result[0].tproject;
              var x = result[0].availability;
              console.log(ab);
              console.log(s);
               res.render('index', {obj: ab,obj1:s,obj2:x});
 
});
 });


app.listen(8080, function() {
  console.log('Server running at http://127.0.0.1:8080/');
});

