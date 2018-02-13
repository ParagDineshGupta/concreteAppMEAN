const express = require('express');
const google = require('googleapis');
const googleAuth = require('google-auth-library');
const fs = require('fs');
var async = require('async');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
var oauth2Client = null;

fs.readFile('./client_secret.json', function(err, content){
	if(err){
		console.log("error loading client secret file" + err);
		return;
	}
	var credentials = JSON.parse(content);
	var clientSecret = credentials.installed.client_secret;
	var clientId = credentials.installed.client_id;
	var redirectUrl = credentials.installed.redirect_uris[0];
	var auth = new googleAuth();
	oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);
		//temp variables
	var access_token = "ya29.GltcBZwZs9Ui5S-DHHRvA_4dWbt2q39KXjnY1zP3RDW4sBL8wbYbUFAkyXNSkWRUFdGhxWHJt1baEyOxgYkWXivsNmQ62nfZiQOVCoXsqUT4uQpRK5izIxt-9aTk";
	var refresh_token = "1/OPr4TYpdrlKGqDQDRJnYmx1N8YgoiBvxynNc3fuH6wI";
	var expiry_date = "1518080502922";
	var token_type = "Bearer";

	oauth2Client.credentials = {
		access_token: access_token,
		refresh_token: refresh_token,
		token_type: token_type,
		expiry_date: expiry_date
	}

	getThreadIds(["aditi@engineerbabu.com"]);
});

function setOAuth2Credentials(token){
	oauth2Client.credentials = token;
	return true;
}
function getAuthUrl(){
	var authUrl = oauth2Client.generateAuthUrl({
		access_type: 'offline',
		scope: SCOPES
	});
	console.log(authUrl);
	return authUrl;
}

function getToken(code){
	oauth2Client.getToken(code, function(err, token){
		if(err){
			console.log('Error while trying to get access to token ' + err);
			return false;
		}
		oauth2Client.credentials = token;
		db.storeGoogleAuthToken(token, function(err, result){
			if(err){
				console.log("error storing token to database " +  err);
				return false;
			}
			return true;
		})
	})
}

var gmail = google.gmail('v1');


function getThreadIds(clientEmails){
	var threadIds = [];
	var Emails = [];
	clientEmails.forEach((email) => {
		console.log("searching threads for : " + email);
		var toQuery = "{to:" + email + "}";
		var fromQuery= "{from:" + email  + "}";
		console.log("serching messages with query : " + toQuery);
		console.log("serching messages with query : " + fromQuery);
		async.parallel({
			to:function(callback){getThreadsForAQuery(toQuery, callback)},
			from:function(callback){getThreadsForAQuery(fromQuery, callback)}
		}, function(err, results){
			if(err){
				console.log("error retrieving threads " + err);
				return false;
			}
			//console.log(results.from);
			//console.log(results.to);
			results.to.threads.forEach((thread) => {
				console.log(thread.id);
				if(!threadIds.includes(thread.id)){
					threadIds.push(thread.id);
					getMessagesInThreadId(thread.id);
				}
			});
			results.from.threads.forEach((thread) => {
				if(!threadIds.includes(thread.id)){
					console.log(thread.id);
					getMessagesInThreadId(thread.id);
					threadIds.push(thread.id);
				}
			});
			//getMessagesInThreadId(threadIds[2]);
			console.log(threadIds);
		});
	})
}


function getThreadsForAQuery(query, callback){
	gmail.users.threads.list({
		auth:oauth2Client,
		userId:'me'
	}, {
		qs: {
			q:query
		}
	}, function(err, results){
		if(err){
			console.log("The api returned an error while retrieving threads for emails : " + err);
			return;
		}
		callback(err, results);
	});
}

function getMessagesInThreadId(id){
	gmail.users.threads.get({
		auth:oauth2Client,
		userId:'me',
		id:id
	}, function(err, emails){
		if(err){
			console.log(" There was some error retrieving the messages ");
			return;
		}
		console.log("messages for thread id : " + id);
		// emails.messages.forEach((message) => {
		// 	console.log(message.payload.parts)
		// })
		console.log(emails.messages[0].payload.parts);
		// emails.messages[0].payload.parts.forEach((part) => {
		// 	var str = (new Buffer(part.body.data, 'base64')).toString('utf-8');
		// 	console.log(str);
		// 	console.log('............................................');
		// } )
		
		console.log('&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
	});
}


function storeEmail(email){
	db.addNewEmail(email, function(err, results){
		if(err){
			console.log("error stoging email in database " + err);
			return;
		}
		console.log(results);
		return results;
	});
}