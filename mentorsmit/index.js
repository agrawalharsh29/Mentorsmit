var express = require('express');
var bodyParser = require('body-parser');
var app     = express();
app.use(bodyParser.urlencoded({ extended: true })); 
var http = require('http');
var mysql = require('mysql');
var path = require('path');
var fileUpload = require('express-fileupload');
var methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUpload());

var con = mysql.createConnection({
  host: "localhost",
  user: "Harsh",
  password: "Hhhh@1234",
  database: "mentorsmit"
});
con.connect(function(err) {
  if (err) throw err;
  });

// login for teachers
app.post('/login', function(req, res) {
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

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.put('/t_details',function(req,res){
	    var file = req.files.uploaded_image;
		var img_name=file.name;
		 file.mv('public/images/upload_images/'+file.name, function(err) {
                             
	              if (err)
 
	                return res.status(500).send(err);
	        });
  con.query('update final_t_details set name=? ,project=? ,availability=? ,n_interns=? ,img=? where id=?' ,[req.body.t_name,req.body.t_project,req.body.t_availability,req.body.t_no,req.files.uploaded_image.name,req.body.t_id] ,function (error, results, fields) {
    if (error) throw error;
    // res.end(JSON.stringify(results));
    res.render('home');
  });
});
app.get('/t1',function(req,res){
  con.query("select * from final_t_details where id=1", function(err,result,fields)
  {
      var sn = JSON.stringify(result);
              var ab = result[0].name;
              var s = result[0].project;
              var x = result[0].availability;
              var im = result[0].img;
              console.log(ab);
              console.log(s);
              res.render('index', {obj: ab,obj1:s,obj2:x,obj3:im});
  });
});
app.get('/t2',function(req,res){
  con.query("select * from final_t_details where id=2", function(err,result,fields)
  {
      var sn = JSON.stringify(result);
              var ab = result[0].name;
              var s = result[0].project;
              var x = result[0].availability;
              console.log(ab);
              console.log(s);
              res.render('index', {obj: ab,obj1:s,obj2:x});
  });
});

app.listen(8000, function() {
  console.log('Server running at http://127.0.0.1:8000/');
});