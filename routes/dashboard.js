var express = require('express');
var router = express.Router();
var db = require('./db');
var jwt = require('jsonwebtoken');	
var secret = 'thisisabigsecret';

//this will give  the leads of current logged in user
//replace the id '4' with user id from session
router.get('/myleads', function(req, res){
	//console.log('**************************************');
	//console.log(req.headers.authorization);
	jwt.verify(req.headers.authorization, secret, function(err, decoded){
		if(err){
			//console.log("%%%%%%%%%%%%%%%%%%%" + err);
			res.json({
				msg:"some error occured"
			});
			return;
		}
		var userId =  decoded.userId;

		//console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&" + JSON.stringify(userId));
	    db.getMyLeads(userId, function(err, results){
	    	console.log(results);
	        if(err){
				//console.log(err);
				return res.json({
					success:false,
					msg:"there was some err"
				})
			}
			return res.json({
				success:true, 
				data: results
			});
	    });
	});
});

router.get('/getallplatforms', function(req, res){
	db.getAllPlatforms(function(err, results){
		if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		res.json({
			success:true,
			data:results
		})
	})
})

//this will list the latest 10  leads not from the current logged in user
router.get('/allleads', function(req, res){
    db.getAllLeadsForDashboard(4, function(err, results){
        if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		return res.json({
			success:true, 
			data: results
		});
    })
});


//this will give the last 10 call logs on all the projects
router.get('/calllogs', function(req, res){
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
    db.getCallLogsForUserId(userId, function(err, results){
        if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		return res.json({
			success:true, 
			data: results
		});
    })
});


//this will list the payments expected on current date
//replace the 0000-00-00 with current date in format 'yyyy-dd-mm'
router.get('/gtep', function(req, res){
	var d = new Date();
	var datestring = d.getFullYear() +  "-" +  ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
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
    //console.log(datestring);
    db.getTodaysExpectedPaymentsByUserId(datestring, userId, function(err, results){
        if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		return res.json({
			success:true, 
			data: results
		});
    });
});


//this will give payments expected in the nexy 7 days
//replace the date with current date + 7 days in format 'yyyy-mm-dd'
router.get('/twep', function(req, res){
	var d = new Date();
	var ldatestring = d.getFullYear() +  "-" +  ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
	var udatestring = d.getFullYear() +  "-" +  ("0"+(d.getMonth()+1)).slice(-2) + "-" + ("0" + (d.getDate() + 7)).slice(-2);
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
    //console.log(ldatestring);
    db.getThisWeeksExpectedPaymentsById(ldatestring, udatestring, userId, function(err, results){
        if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		return res.json({
			success:true, 
			data: results
		});
    })
})

module.exports = router;