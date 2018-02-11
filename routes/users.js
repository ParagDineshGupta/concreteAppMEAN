var express = require('express');
var router = express.Router();
var db = require('./db');

/* GET users listing. */
router.get('/', function(req, res, next) {
	db.getAllUsers(function(err, users){
		if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			});
		}
		return res.json({
			success:true, 
			data: users
		});
	})
});

module.exports = router;
