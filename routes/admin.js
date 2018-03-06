var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var nodemailer = require('nodemailer');
//this is used for generating SVG Captchas
var svgCaptcha = require('svg-captcha');
var async = require('async');

var User = require('../models/User')

router.get('/', (req, res) => {
	User.getPendingProfilesForVerification((err, profiles) => {
		console.log(profiles);
		res.render('adminDashboard', {
			profiles: profiles
		})
	})
});


router.get('/verifyuser/:id', function(req, res){
	var id = req.params.id;
	console.log(id);
	User.findOneById(id, function(err, user){
		if(err){
			console.log(err);
			res.status(500);
		}
		user.verified = true;
		console.log(user);
		user.save()
		res.status(200);
	});
})



module.exports = router;