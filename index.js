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
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'ejs');
  con.query("SELECT * FROM data where `uname`= '"+username+"' AND pwd = '"+password+"' ", function (err, result, fields) {
    if (err) throw err;
    if(result.length>0){
    	 con.query("select * from final_t_details where username=?",username ,function(err,result,fields)
      {
              var sn = JSON.stringify(result);
              var ab = result[0].name;
              var s = result[0].project;
              var x = result[0].availability;
              var im = result[0].img;
              var bio = result[0].bio;
              var id = result[0].id;
              console.log(result);
              console.log(s);
              res.render('index', {obj: ab,obj1:s,obj2:x,obj3:im,obj4:bio,obj5:id});
  });
    }
    else{
    	res.send("Wrong id or password!!")

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
  con.query('update final_t_details set name=? ,project=? ,availability=? ,n_interns=? ,img=?,bio=? where id=?' ,[req.body.t_name,req.body.t_project,req.body.t_availability,req.body.t_no,req.files.uploaded_image.name,req.body.bio,req.body.t_id] ,function (error, results, fields) {
    if (error) throw error;
    // res.end(JSON.stringify(results));
    res.render('home');
  });
});
app.get('/t1/:id',function(req,res){
   app.engine('html', require('ejs').renderFile);
   app.set('view engine', 'ejs');
   var uid=req.params.id;
   con.query("select * from final_t_details where id=?",uid ,function(err,result,fields)
      {
              if (err) throw err;
              var sn = JSON.stringify(result);
              var ab = result[0].name;
              var s = result[0].project;
              var x = result[0].availability;
              var im = result[0].img;
              var bio = result[0].bio;
              res.render('profile', {obj: ab,obj1:s,obj2:x,obj3:im,obj4:bio});
  });
});


// storing student details

app.post('/student',function(req,res)
{
      var file = req.files.file;
      var file_name=file.name;
      file.mv('public/resume/student_resume/'+file.name, function(err) {
                             
                if (err)
 
                  return res.status(500).send(err);
          });
      con.query('insert into student_details set T_id=?, s_name=?, contact=?, dept=?, regno=?,email=?,resume=?',[req.body.tid,req.body.name,req.body.contact,req.body.dept,req.body.regno,req.body.email,req.files.file.name],function(err, results, fields){
        if (err) throw err;
        res.send("<h3>Thank you!! You have successfully applied for this Internship!!</h3> ");
      });
});


app.post('/application/:id',function(req,res)
{
   app.engine('html', require('ejs').renderFile);
   app.set('view engine', 'ejs');
  var uid = req.params.id;
  con.query("select * from student_details where T_id=?",[req.params.id],function(err,result,fields)
      {
              if (err) throw err;

              if(result.length == 0)
                res.send("You have no application");
              var rs = JSON.stringify(result);
              var r = result[0].s_name;
              var dep = result[0].dept;
              var reg = result[0].regno;
              var mail = result[0].email;
              // var res = result[0].resume;
              var json = JSON.stringify(result[0].resume);
              var bufferOriginal = Buffer.from(JSON.parse(json).data);
              console.log(bufferOriginal);
              var resum = bufferOriginal.toString('utf8');

              // console.log(resu);
              // console.log(res);
              res.render('student',{obj:r,obj1:dep,obj2:reg,obj3:mail,obj4:resum});

            });
});
app.listen(8000, function() {
  console.log('Server running at http://127.0.0.1:8000/');
});