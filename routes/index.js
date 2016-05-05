var express = require('express');
var router = express.Router();
var validator = require('express-validator');





/*
 * GET home page.
 */

router.get('/', function(req, res) {
    res.render('login', { title: 'Login' });
});

/*
 * GET login page.
 */

router.get('/login', function(req, res) {
    res.render('login', { title: 'Login' });
});

/*
 * GET register page.
 */

router.get('/register', function(req, res) {
    res.render('register', { title: 'Register' });
});

/*
 * GET main page.
 */

router.get('/main', function(req, res) {
    res.render('main', { title: 'Dashboard' });
});

/*
 * Register new User
 */
 
 router.post('/register',function(req,res){
		
	var db = req.db;

	var	IDname = req.body.display;
	var	username = req.body.username;
	var	password= req.body.password;
	var	email = req.body.email;
	
	var collection = db.get('user');
	
	collection.insert({
		"IDName" : IDname,
        "username" : username,
		"password" : password,
        "email" : email,
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
			res.render('register', { flash: { type: 'alert-success', messages: [ { msg: 'No errors!' }]}}); 
        }
    });	
 });
 
 /*
  * Login
  */
  
router.post('/login',function(req,res){
	var db = req.db;
	var collection = db.get('user');
	collection.findOne({username : req.body.username}, function(err, result) {
		if (!err) {
			if (result == null){
				res.render('login', { flash: { type: 'alert-success', messages: [ { msg: 'Not found username!' }]}}); 
				return;
			}
			
			if (result.password == req.body.password){
				res.render('login', { flash: { type: 'alert-success', messages: [ { msg: 'Login Success' }]}}); 
				return;
			}
		}
		else {
			res.render('login', { flash: { type: 'alert-success', messages: [ { msg: 'Errors!' }]}}); 
		}
		
	});
});

module.exports = router;


/* LOGIN FUNCTION 

var db = req.db;
	var collection = db.get('user');
	collection.findOne({username : req.body.username}, function(err, result) {
		if (!err) {
			if (result == null){
				res.render('login', { flash: { type: 'alert-success', messages: [ { msg: 'Not found username!' }]}}); 
				return;
			}
			
			if (result.password == req.body.password){
				res.render('login', { flash: { type: 'alert-success', messages: [ { msg: 'Login Success' }]}}); 
				return;
			}
		}
		else {
			res.render('login', { flash: { type: 'alert-success', messages: [ { msg: 'Errors!' }]}}); 
		}
		
	});
	
*/


/* GET ALL MEMBER - SHOW
var db = req.db;
var collection = db.get('user);
collection.find(function(err, result) {
		if (!err) {
			binding user list;
			
			
			}
		}
		else {
			Show console error
		}
		
	});
*/


/* Send new message
var db = req.db;
var collection = db.get('messages');
tạo message model
lấy dữ liệu
	lấy tin nhắn
	láy người nhận
gửi dữ liệu lên server.
*/

/* nhận dữ liệu
tương tự gửi nhưng check tình trạng đã đọc, trước khi hiển thị
*/