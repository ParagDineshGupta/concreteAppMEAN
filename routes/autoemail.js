var mail = require('@sendgrid/mail');
var express = require('express');
var router = express.Router();
var pug = require('pug');
var http = require('https');
//const Email = require('email-templates');


var db = require('./db');


mail.setApiKey(process.env.SENDGRID_API_KEY);

router.get('/', function(req, res){
	db.getMailsForSendingDailyUpdates(function(err, results){
		console.log(results);
		var d = new Date();
		var curDate = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" + d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ':00';
		var ldate =  d.getFullYear() + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +  ("0" + (d.getDate()-3)).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)  + ':00';
		var notifications = db.getNotificationsForDailyMail(ldate, function(err, notifications){
			if(err){
				return "there was some error accessing the notifications";
			}
			var newLeads = [];
			var updateLeads = [];
			var updateProgress = [];
			var updateAmount = [];
			var others = [];

			console.log(notifications);
			notifications.forEach((element) => {
				switch(element.sub_category){
					case 'new_lead':
						newLeads.push(element);
						break;
					case 'update_lead':
						updateLeads.push(element);
						break;
					case 'new call log':
						updateProgress.push(element);
						break;
					case 'update_amount':
						updateAmount.push(element);
						break;
					default:
						others.push(element); 
				}
			});
			
			var compiledEmail = pug.compileFile((__dirname+'/emailTemplate.pug'));


			console.log(compiledEmail);
			console.log(compiledEmail({
				lDate: ldate,
				curDate: curDate,
				newLeads: newLeads,
				updateLeads: updateLeads,
				updateAmount: updateAmount,
				updateProgress: updateProgress,
				others: others
			}))
			var html = compiledEmail({
				lDate: ldate,
				curDate: curDate,
				newLeads: newLeads,
				updateLeads: updateLeads,
				updateAmount: updateAmount,
				updateProgress: updateProgress,
				others: others
			});
			
			//const email = new Email({});
			
			results.forEach((element) => {
				console.log(element.user_email);

				var options = {
					"method": "POST",
					"hostname": "api.sendgrid.com",
					"port": null,
					"path": "/v3/mail/send",
					"headers": {
						"authorization": "Bearer SG.LWhvneW0QjWE-n190p3q_Q.NA5GDWc4O-VNQ-YnvBHQ890_gJ9NmKWL_jYnA3QEqxA",
						"content-type": "application/json"
					}
				};

				var req = http.request(options, function (res) {
					var chunks = [];

					res.on("data", function (chunk) {
						chunks.push(chunk);
					});

					res.on("end", function () {
						var body = Buffer.concat(chunks);
						console.log(body.toString());
					});
				});

				req.write(JSON.stringify({ personalizations: 
					[ { to: [ { email: element.user_email, name: element.user_name } ],
						subject: 'Hello, World!' } ],
					from: { email: 'test@test.com', name: 'JARVIS' },
					reply_to: { email: 'test@test.com', name: 'JARVIS' },
					subject: 'Daily Updates',
					content: 
					[ { type: 'text/html',
						value: html } ] }));
				req.end();
				console.log("email sent to " + element.user_email + "   " +  element.user_name );
			});
			res.json({
				html:html
			})
		});
	});
});

module.exports = router;