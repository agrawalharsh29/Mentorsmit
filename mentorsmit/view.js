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
app.set('view engine', 'ejs'); 
app.get('/', (req, res)=>{ 
  
// The render method takes the name of the HTML 
// page to be rendered as input 
// This page should be in the views folder 
// in the root directory. 
res.render('home',{name:'Harsh'});
});
  app.listen(8050, function() {
  console.log('Server running at http://127.0.0.1:8050/');
}); 