
var express = require('express');
var router = express.Router();
var db = require('./db');
var jwt = require('jsonwebtoken');
var secret = 'thisisabigsecret';


//this route will return all the leads
router.post('/', function(req, res){
    db.getAllLeads(req.body.count, function(err, results){
        if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		for(var j=0; j< results.length; j++){
			var d = new Date(results[j].project_add_date);
			var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    			d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2);
    		results[j].project_add_date = datestring;
		}
		return res.json({
			success:true, 
			data: results
		});
    });
});

router.post('/archiveleads', function(req, res){
	
	db.getArchiveLeads(req.body.count, function(err, results){
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


//used to get the status list
router.get('/getstatuslist', function(req, res){
	db.getAllStatus(function(err, results){
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

router.get('/deletecalllog/:id', function(req, res){
	var id = req.params.id;
	db.deleteCallLog(id, function(err, results){
		if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err deleteing call log"
			})
		}
		return res.json({
			success:true,
			data: results
		});
	})
});

router.post('/updatecalllog', function(req, res){
	var project_call_log_id = req.body.id;
	var project_call_description = req.body.description;
	var project_id = req.body.projectId;

	var update = {
		project_call_description:project_call_description,
		project_id: project_id
	}

	//console.log(update);

	db.updateCallLog(project_call_log_id, update, function(err, results){
		if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err updating call log"
			})
		}
		return res.json({
			success:true,
			data: results
		});
	})
});



//used to add a new lead
router.post('/createnewlead', function(req, res){
	//console.log("req received");

	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            //console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;
        //console.log("user id decoded as " + userId);

		var project_name = req.body.projectName || 0;
		var project_client_name = req.body.clientName || 0;
		var project_client_contact_no= req.body.contact || 0;
		var project_client_email = req.body.email;
		var project_source = req.body.source || 0;
		var project_platforms = req.body.platform || 0;
		var project_budget_unit = req.body.currency || 0;
		var project_estimate_budget = req.body.budget || 0;
		var project_manager_id = req.body.manager || 0;
		var project_description = req.body.description || 0;
		//get these user id from session later
		var project_current_status_by = userId;
		var project_add_by = userId;
		var country_id = req.body.country || 0;
		var city = req.body.city || 0;
		var project_add_date = getFormattedDate();

		

		var lead = {
			project_name : project_name , 
			project_client_name : project_client_name , 
			project_client_contact_no: project_client_contact_no, 
			project_client_email : project_client_email , 
			project_source : project_source , 
			project_platforms : project_platforms , 
			project_budget_unit : project_budget_unit , 
			project_estimate_budget : project_estimate_budget , 
			project_manager_id : project_manager_id , 
			project_description : project_description , 
			//get these user id from session later
			project_current_status_by : project_current_status_by , 
			project_add_by : project_add_by , 
			country_id : country_id , 
			city : city,
			project_add_date: project_add_date,
			project_payment_amount:0,
			project_payment_recieved_date:0,
			project_payment_status:0,
			company_id:0
		}

		//console.log("lead created as " + lead);

		db.createLead(lead, function(err, results){
			if(err){
				//console.log(err);
				return res.json({
					success:false,
					msg:"there was some err"
				})
			}
			var insertId = results.insertId;

			var notification = {
				category:'Leads',
				sub_category : 'new_lead',
				category_id: insertId,
				notification_title : 'Added new lead',
				notification_description : project_description,
				user_id: userId,
				notification_add_dt: getFormattedDate(),
				notification_status:0,
				company_id:0
			}

			db.addNewNotification(notification, function(err, results1){
				if(err){
					//console.log(err);
					return res.json({
						success:false,
						msg:"there was some err"
					})
				}
				return res.json({
					success:true,
					result:results,
					data: results1
				});
			});
		});
	});
});

//this will get the details of a specific leac
router.get('/details/:id', function(req, res){
	
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            //console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;

		var id = req.params.id;

		db.findProjectById(id, function(err, results){
			if(err){
				//console.log(err);
				return res.json({
					success:false,
					msg:"there was some err"
				})
			}
			console.log(results[0].project_manager_id);
			if(results[0].project_manager_id == userId){
				results[0].editing = true;
			}
			return res.json({
				success:true, 
				data: results[0]
			});																					
		})
	});
});																																																																																																																																																								

//this route willl update a lead details
//get these user id from session later
router.post('/updateleaddetails', function(req, res){


	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            //console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;
		var projectId = req.body.projectId;


		var project_name = req.body.projectName || 0;
		var project_client_name = req.body.clientName || 0;
		var project_client_contact_no= req.body.contact || 0;
		var project_client_email = req.body.email;
		var project_source = req.body.source || 0;
		var project_platforms = req.body.platform || 0;
		var project_budget_unit = req.body.currency || 0;
		var project_estimate_budget = req.body.budget || 0;
		var project_manager_id = req.body.manager || 0;
		var project_description = req.body.description || 0;
		var project_current_status_by = userId;
		var project_add_by = userId;
		var country_id = req.body.country||0;
		var city = req.body.city || 0;

		

		var lead = {
			project_name : project_name , 
			project_client_name : project_client_name , 
			project_client_contact_no: project_client_contact_no, 
			project_client_email : project_client_email , 
			project_source : project_source , 
			project_platforms : project_platforms , 
			project_budget_unit : project_budget_unit , 
			project_estimate_budget : project_estimate_budget , 
			project_manager_id : project_manager_id , 
			project_description : project_description , 
			project_add_by : project_add_by , 
			country_id : country_id , 
			city : city,
			company_id:0
		}
		//console.log(lead);
		db.updateLead(lead, projectId, function(err, results){
			if(err){
				//console.log(err);
				return res.json({
					success:false,
					msg:"there was some err"
				})
			}
			var updateId = results.updateId;
			//console.log(results);
			var notification = {
				category:'Leads',
				sub_category : 'update_lead',
				category_id: projectId,
				notification_title : project_name,
				notification_description : project_description,
				user_id: userId,
				notification_add_dt: getFormattedDate(),
				notification_status:0,
				company_id:0
			}

			db.addNewNotification(notification, function(err, results1){
				if(err){
					//console.log(err);
					return res.json({
						success:false,
						msg:"there was some err"
					})
				}
				return res.json({
					success:true,
					results:results,
					data: results1,
					msg:"leads updated successfully"
				});
			});
		});
	});
});


//this will update payment details as to when it is expected or is it received
//take the currency_unit_text(currency symbol) from the frontend instead of doing a DB query
//also take userId from session cookie rather than req.body
router.post('/updatepaymentdate', function(req, res){
	
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            //console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;

		//console.log("req hit");
		var projectId = req.body.projectId;
		var project_payment_amount = req.body.project_payment_amount;
		var project_payment_recieved_date = req.body.project_payment_recieved_date;
		var project_budget_unit = req.body.project_budget_unit;
		var userId = userId;


		var update_amount = {
			project_payment_amount:project_payment_amount,
			project_payment_recieved_date:project_payment_recieved_date,
			project_budget_unit:project_budget_unit
		}
		//console.log(update_amount);
		db.updateAmountInProject(update_amount, projectId, function(err, results){
			//console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
			//console.log(err);
			//console.log(results);
			if(err){
				//console.log(err);
				return res.json({
					success:false,
					msg:"there was some err"
				})
			}
			

			var currencyUnit = '₹';
			var projectStatus = db.connection.query('SELECT project_current_status FROM projects WHERE project_id = ' + db.connection.escape(projectId));
			var amountStatus = (projectStatus == 5)  ? 'Received' : 'Expected';

			var notification = {
				category:'Leads',
				sub_category : 'update_amount',
				category_id: projectId,
				notification_title : "Update "+ amountStatus + " amount " + currencyUnit +  project_payment_amount ,
				notification_description : "Update "+ amountStatus + " amount " + currencyUnit +  project_payment_amount,
				user_id: userId,
				notification_add_dt: getFormattedDate(),
				notification_status:0,
				company_id:0
			}

			db.addNewNotification(notification, function(err, results1){
				//console.log("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
				//console.log(err);
				//console.log(results1);
				if(err){
					//console.log(err);
					return res.json({
						success:false,
						msg:"there was some err"
					})
				}
				return res.json({
					success:true, 
					data: results1
				});
			});
		});
	});
});

//pickup user ID from session rather than req.body
//this will update the current status of the project
router.post('/updatestatus', function(req, res){
	
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            //console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;
		var status = {
			project_current_status:req.body.projectCurrentStatus,
			project_current_status_by:userId
		}

		var projectId = req.body.projectId;
		var userId = userId;



		//!!!!!!!!!!!!!!!!!!!!! LOGIC OF WHAT TO DO WHEN THE PAYMENT IS RECEIVED......................	
		if(status.project_current_status == 5){
			db.updateProjectStatus(status, projectId, function(err, result){
				if(err){
					//console.log(err);
					return res.json({
						success:false,
						msg:"there was some err"
					})
				}
				var query = "SELECT project_name  from projects where project_id = " +  db.connection.escape(projectId) ;
				db.connection.query(query , function(err, results){
					if(err){
						throw err
						return;
					}
					var project_name = results[0].project_name;
					db.connection.query('SELECT project_status_name FROM project_status where project_status_id = ' + status.project_current_status, function(err, projectStatus1){
						
						var current_status_text = projectStatus1[0].project_status_name;
						//console.log(project_name);
						//console.log(current_status_text);
						//console.log(status.project_current_status);
		
						var notification = {
							category:'Leads',
							sub_category : 'update_status',
							category_id: projectId,
							notification_title : "Update Status! Project: "+ project_name + " status:  " + current_status_text,
							notification_description : "",
							user_id: userId,
							notification_add_dt: getFormattedDate(),
							notification_status:0,
							company_id:0
						}
				
						db.addNewNotification(notification, function(err, results1){
							if(err){
								//console.log(err);
								return res.json({
									success:false,
									msg:"there was some err"
								})
							}
							return res.json({
								success:true,
								data:results1
							}); 
						});
					});
				});
			});
		}else{
			db.updateProjectStatus(status, projectId, function(err, result){
				if(err){
					//console.log(err);
					return res.json({
						success:false,
						msg:"there was some err"
					})
				}
		
		
				db.connection.query('SELECT project_name from projects where project_id = ' +  db.connection.escape(projectId), function(err, results){
					if(err){
						throw err;
						return;
					}
					var project_name = results[0].project_name;
					db.connection.query('SELECT project_status_name FROM project_status where project_status_id = ' + status.project_current_status, function(err, projectStatus1){
						
						var current_status_text = projectStatus1[0].project_status_name;
						//console.log(project_name);
						//console.log(current_status_text);
						//console.log(status.project_current_status);
		
						var notification = {
							category:'Leads',
							sub_category : 'update_status',
							category_id: projectId,
							notification_title : "Update Status! Project: "+ project_name + " status:  " + current_status_text,
							notification_description : "",
							user_id: userId,
							notification_add_dt: getFormattedDate(),
							notification_status:0,
							company_id:0
						}
				
						db.addNewNotification(notification, function(err, results1){
							if(err){
								//console.log(err);
								return res.json({
									success:false,
									msg:"there was some err"
								})
							}
							return res.json({
								success:true,
								data:results1
							}); 
						});
					});
				});
			});
		}
	});
})

router.post('/addcalllog', function(req,res){
	
	var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            //console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;
		var status = {
			project_current_status:req.body.projectCurrentStatus,
			project_current_status_by:userId
		}

		var projectId = req.body.projectId;

		var progress =  {
			project_call_description : req.body.callDesc,
			project_id : req.body.projectId,
			user_id : userId
		} 
		db.addNewProgress(progress, function(err, results){
			if(err){
				//console.log(err);
				return res.json({
					success:false,
					msg:"there was some err",
					err:err
				})
			}


			var notification = {
				category:'Leads',
				sub_category : 'new call log',
				category_id: req.body.projectId,
				notification_title : "New progress on a lead" ,
				notification_description : req.body.callDesc,
				user_id: userId,
				notification_add_dt: getFormattedDate(),
				notification_status:0,
				company_id:0
			}

			db.addNewNotification(notification, function(err, results1){
				if(err){
					//console.log(err);
					return res.json({
						success:false,
						msg:"there was some err"
					})
				}
				return res.json({
					success:true, 
					data: results1
				});
			});
		});
	});
});

//route to get call logs for a particular project
router.get('/getcalllogs/:id', function(req, res){
	var projectId = req.params.id;
	db.getCallLogsByProjectId(projectId, function(err, results){
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

//route to new country to the list of already present countries
router.post('/addcountry', function(req, res){
	db.addCountry({country_name:req.body.countryName}, function(err, result){
		if(err){
			//console.log(err);
			return res.json({
				success:false,
				msg:"there was some err"
			})
		}
		return res.json({
			success:true,
			data: result
		});
	})
});



function getFormattedDate() {
	var date = new Date();
	var str = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " +  date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
	return str;
}

function formatDate(date) {            // function for reusability
    var d = date.getUTCDate().toString(),           // getUTCDate() returns 1 - 31
        m = (date.getUTCMonth() + 1).toString(),    // getUTCMonth() returns 0 - 11
        y = date.getUTCFullYear().toString(),       // getUTCFullYear() returns a 4-digit year
        formatted = '';
    if (d.length === 1) {                           // pad to two digits if needed
        d = '0' + d;
    }
    if (m.length === 1) {                           // pad to two digits if needed
        m = '0' + m;
    }
    formatted = d + '-' + m + '-' + y;              // concatenate for output
    return formatted;
}    


//this will convert a lead to a project when the upfront amount is received
function convertLeadToProject(projectId, userId){
	
}
module.exports = router;
