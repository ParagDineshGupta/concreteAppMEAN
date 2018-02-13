var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var db = require('./db');
const util = require('util');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var secret = 'thisisabigsecret';
var multer = require('multer');
var upload = multer({dest:'./dist/uploads/'});
var fs = require('fs');
var gmail = require('./gmail');


/* GET home page. */
router.get('/', function(req, res, next) {
  	db.getAllUsers(function(err, results, fields){
		if(err){
			res.status(200).json(err);
		}
		var result = {
			results:results,
			fields:fields
		}
		res.status(200).json(result);
  	});
});


//login api's and authentication logic start


passport.serializeUser(function(user, done) {
	////console.log('user serialized');
	////console.log(user);
    done(null, user.user_id);
});

passport.deserializeUser(function(id, done) {
	db.getUserById(id, function(err, user) {
        done(err, user);
    });
});

passport.use(new LocalStrategy({ usernameField:'email', passwordField:'password'},
	function(username, password, done){
		db.getSingleUserForLogin(username, function(err, user){
			if(!user){
				
				return done(null, false, {msg:'user not found'});
			}
			////console.log(user);
			////console.log(user[0].user_password);
			////console.log(password);
			bcrypt.compare(password, user[0].user_password, function(err, isMatch){
				if(err)throw err;
				////console.log(isMatch);
				if(!isMatch){
					return done(null, false, {msg:'Incorrect Password'});
				}
				return done(null, user[0], {msg:'login successful'});
			});
		});
	}
));


router.post('/login', function(req, res, next){
	
	////console.log('login hit');

	var username = req.body.username;
	var password = req.body.password;

	db.getSingleUserForLogin(username, function(err, user){
		//console.log(user);
		if(user.length == 0){
			res.json({
				success:false,
				msg:"No User Found"
			});
			return ;
		}
		////console.log(user);
		////console.log(user[0].user_password);
		////console.log(password);
		bcrypt.compare(password, user[0].user_password, function(err, isMatch){
			if(err)throw err;
			////console.log(isMatch);
			if(!isMatch){
				return res.json({
					success:false,
					msg:'Incorrect Password'
				});
			}
			if(isMatch){
				var userId = user[0].user_id;
				//console.log(userId);
				var token = jwt.sign({userId:userId}, secret);
				res.json({
					success:true,
					token:token
				})
				return ;
			}else{
				res.json({
					success:false,
					msg:"incorrect passwrod"
				})
				return;
			}
			
		});
	});
	// passport.authenticate('local', function(err, user, info){
	// 	////console.log('authentication callback');
	// 	if(err) throw err;
	// 	if(!user){
	// 		var result = {
	// 			success: false,
	// 			msg: info.msg
	// 		}
	// 		return res.json(result);
	// 	}
	// 	////console.log('about to call req. login' + user);
	// 	req.logIn(user, function(err){
	// 		if(err)throw err;
	// 		var result = {
	// 			success:true,
	// 			user:{
	// 				user_email: user.user_email,
	// 				user_id:user.user_id
	// 			},
	// 			msg: info.msg
	// 		}
	// 		return res.json(result);
	// 	})
		
	// })(req, res, next);
});


router.post('/signup', function(req, res){
	function getFormattedDate() {
		var date = new Date();
		var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	
		return str;
	}
	var email = req.body.email;
	var password = req.body.password;
	var name = req.body.name;
	var mobile = req.body.mobile;
	var designation = req.body.designation;
	var profile = req.body.profile;
	var cdate = getFormattedDate();

	req.checkBody('email', 'email is requried').notEmpty();


	var errors = req.getValidationResult();

	//console.log(errors);

	//console.log(password);
	//console.log(email);
	bcrypt.hash(password, 10, function(err, hash){
		if(err)throw err;
		
		//console.log(hash)
		var user = {
			user_email:email,
			user_password: hash,
			user_name:name,
			user_mobile:mobile,
			user_designation:designation,
			user_profile_pic:profile,
			user_add_date:cdate,
			user_auth_token:"",
			user_status:"1",
			company_id:1
		}
		db.createUser(user, function(err, user, fields){
			if(err) throw err;
			var result = {
				user:user
			}
			//console.log('query exeute '+ user);
			res.status(200).json(result);
		})
	});
	
});

router.get('/profile', function(req, res){
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
		if(err){
			//console.log("%%%%%%%%%%%%%%%%%%%" + err);
			res.json({
				success:false,
				msg:"some error occured"
			});
			return;
		}
		return decoded.userId;
	});
	//console.log(userId);
	db.getSingleUserProfile(userId, function(err, results){
		//console.log(err);
		//console.log(results);
		if(err){
			//console.log(err);
			res.json({
				success:false,
				msg:err
			})
			return;
		}else{
			var d = new Date(results[0].user_add_date);
			var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    			d.getFullYear();
			results[0].user_add_date = datestring;
			if(!results[0].user_gmail_auth_token_present){
				results.gmailAuthLink = gmail.getAuthUrl();
			}
    		//results[0].user_profile_pic = 'http://localhost:3000/dist/uploads/' + results[0].user_profile_pic;
			res.json({
				success:true,
				data:results
			})
		}
	});
});

router.post('/changeprofilepic', upload.single('file'), function(req, res){
	//console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
	//console.log(req.file);
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
		if(err){
			//console.log("%%%%%%%%%%%%%%%%%%%" + err);
			res.json({
				success:false,
				msg:"some error occured"
			});
			return;
		}
		return decoded.userId;
	});

	var filename = req.file.filename;
	//console.log(filename);
	db.getUserById(userId, function(err, results){
		var user = results[0];
		//console.log(user);
		//console.log(fs.stat('./dist/uploads/' + user.user_profile_pic));
		// if(fs.statSync('./dist/uploads/' + user.user_profile_pic)){
		// 	console.log(fs.statSync('./dist/uploads/' + user.user_profile_pic));
		// 	fs.unlink('./dist/uploads/' + user.user_profile_pic);
		// }
		db.updateProfilePic(userId, {user_profile_pic:filename}, function(err, results){
			if(err){
				console.log(err);
				return res.json({
					success:false,
					msg:"there was some error"
				});
			}
			res.json({
				success:true,
				data:results
			})
		});
	});
});


router.post('/changepass', function(req, res, next){
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
		if(err){
			//console.log("%%%%%%%%%%%%%%%%%%%" + err);
			res.json({
				msg:"some error occured"
			});
			return;
		}
		return decoded.userId;
	});
	var oldpass = req.body.oldpass;
	var newpass = req.body.newpass;
	var newpass2 = req.body.newpass2;
	var user_id = userId;
	//console.log('user req. received');

	//take user_id from cookies once the website is functional
	db.getUserByIdWithPass(user_id, function(err, user){
		//console.log('user found with id : ' +  util.inspect(user, false, null));
		//console.log(oldpass + '      ' + user[0].user_password);
		bcrypt.compare(oldpass, user[0].user_password, function(err, isMatch){
			if(err){
				console.log(err)
				return res.json({
					success:false,
					msg:"there was some error"
				});
			}
			if(!isMatch){
				return res.json({
					success:true,
					msg:"old password is incorrect"
				})
			}
			if(newpass == newpass2){
				bcrypt.hash(newpass, 10, function(err, hash){
					if(err){
						//console.log(err)
						return res.json({
							success:false,
							msg:"there was some error"
						});
					}
					//console.log("about to call change password");
					db.changePassword(user_id, hash, function(err, user){
						//console.log(user);
						if(err){
							//console.log(err)
							return res.json({
								success:false,
								msg:"there was some error"
							});
						}
						return res.json({
							success:true,
							msg:"password changed successfully"
						})
					})
				})
			}else{
				res.json({
					success:false,
					msg:"password doesn't match"
				})
			}
		})
	});

});

router.post('/updateprofile', function(req, res){
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
		if(err){
			//console.log("%%%%%%%%%%%%%%%%%%%" + err);
			res.json({
				msg:"some error occured"
			});
			return;
		}
		return decoded.userId;

	});
	var name = req.body.name;
	var email = req.body.email;
	var mobile = req.body.mobile;


	var user = {
		name:name,
		email:email,
		mobile:mobile
	}
	//console.log("hitting db");
	db.updateUser(user, userId, function(err, user){
		if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err, please try again later"
			})
		}
		return res.json({
			success:true,
			user:user
		})
	})
});




module.exports = router;
