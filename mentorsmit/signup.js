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
  app.post('/abcd', function(req, res) {
  	var users={
  	"tname":req.body.name,
  	"tcontact":req.body.contact,
  	"tproject":req.body.project
  }
   con.query('INSERT INTO teacher_details SET ?',users, function (error, results, fields) {
  if (error) {
    console.log("error ocurred",error);
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    console.log('The solution is: ', results);
    res.send({
      "code":200,
      "success":"user registered sucessfully"
        });
}
  });
});
});
  	app.listen(8000, function() {
  console.log('Server running at http://127.0.0.1:8000/');
});