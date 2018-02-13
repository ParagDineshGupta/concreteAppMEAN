var mysql = require('mysql');
var connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'root',
  database:'lead_management'
})

connection.connect();


module.exports.connection = connection;

module.exports.getAllUsers = function(callback){
    var query = 'Select * from users';
    connection.query(query, callback);
}

module.exports.getSingleUserForLogin = function(username, callback){
    var query = 'Select user_id, user_email, user_password from users where user_email=  ' + connection.escape(username);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getUserById = function(id, callback){
    var query = 'select user_id, user_email, user_profile_pic from users where user_id = ' + connection.escape(id);
    connection.query(query, callback);
}

module.exports.getUserByIdWithPass = function(id, callback){
    var query = 'select user_id, user_email, user_password from users where user_id = ' + connection.escape(id);
    connection.query(query, callback);
}

module.exports.createUser =function(user, callback){
    var query = 'Insert into users set ' + connection.escape(user);
    //console.log('about to execute query with '+ user + query);
    connection.query(query, callback);
}

module.exports.changePassword = function(id, hash, callback){
    var query = 'update users set user_password = "' + hash + '" where user_id = ' + connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}
module.exports.updateProfilePic = function(id, payload, callback){
    var query = 'UPDATE users SET ' +  connection.escape(payload) + ' WHERE user_id = ' + connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}
module.exports.updateUser = function(user, id,callback){
    var query = 'update users set user_name= ' + connection.escape(user.name) + ', user_email = ' +  connection.escape(user.email) + ',  user_mobile = ' + connection.escape(user.mobile) + ' where user_id =' + id;
    ////console.log(query);
    connection.query(query, callback);
}

module.exports.getTodaysExpectedPayments = function(date, callback){
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_payment_amount, projects.project_payment_recieved_date, projects.project_current_status, users.user_name, users.user_profile_pic, currency_unit.currency_unit_text FROM projects  LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE project_payment_recieved_date = ' + connection.escape(date) + 'AND projects.project_payment_status = 0 ORDER BY projects.project_payment_recieved_date LIMIT 10';
    //console.log('querying database %%%%%%%%%%%%%%%%%%%%%%%%%%%%%' + query);
    connection.query(query, callback);
}

module.exports.getTodaysExpectedPaymentsByUserId = function(date, userId, callback){
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_payment_amount, projects.project_payment_recieved_date, projects.project_current_status, users.user_name, users.user_profile_pic, currency_unit.currency_unit_text FROM projects  LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE project_payment_recieved_date = ' + connection.escape(date) + 'AND projects.project_payment_status = 0  AND projects.project_manager_id = ' + connection.escape(userId) + ' ORDER BY projects.project_payment_recieved_date LIMIT 10';
    //console.log('querying database %%%%%%%%%%%%%%%%%%%%%%%%%%%%%' + query);
    connection.query(query, callback);
}

module.exports.getMyLeads = function(id, count, callback){
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_client_name, projects.project_client_email, projects.project_client_contact_no, projects.project_platforms, projects.project_manager_id, projects.project_current_status, projects.project_add_date, projects.project_estimate_budget, projects.project_budget_unit, projects.project_payment_amount, projects.project_payment_recieved_date, users.user_name, current_status.user_name AS current_status_by, project_status.project_status_name, project_status.project_status_class_name, currency_unit.currency_unit_text FROM projects LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN users current_status ON current_status.user_id = projects.project_current_status_by  LEFT JOIN project_status ON project_status.project_status_id = projects.project_current_status LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE projects.project_manager_id = ' + connection.escape(id) +' ORDER BY projects.project_id DESC LIMIT  ' + count + ', 10';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getSingleUserProfile = function(userid, callback){
    var query = 'SELECT users.user_name, users.user_email, users.user_mobile, users.user_profile_pic, users.user_designation, users.user_add_date FROM users WHERE users.user_id = ' + connection.escape(userid);
    //console.log(query);
    connection.query(query, callback);
}

//this gets the leads that the current user isn't associated with.
module.exports.getAllLeadsForDashboard = function(id, count, callback){
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_client_name, projects.project_client_email, projects.project_client_contact_no, projects.project_platforms, projects.project_manager_id, projects.project_current_status, projects.project_add_date, projects.project_estimate_budget, projects.project_budget_unit, projects.project_payment_amount, projects.project_payment_recieved_date, users.user_name, current_status.user_name AS current_status_by, project_status.project_status_name, project_status.project_status_class_name, currency_unit.currency_unit_text FROM projects LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN users current_status ON current_status.user_id = projects.project_current_status_by  LEFT JOIN project_status ON project_status.project_status_id = projects.project_current_status LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE projects.project_manager_id != ' + connection.escape(id) +' ORDER BY projects.project_id DESC LIMIT ' + count + ', 10';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getAllCallLogs = function(callback){
    var query = 'SELECT project_call_log.*, users.user_name, projects.project_name FROM project_call_log LEFT JOIN users ON project_call_log.user_id = users.user_id LEFT JOIN projects ON project_call_log.project_id = projects.project_id ORDER BY project_call_log.project_call_log_id DESC LIMIT 10';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getCallLogsForUserId = function(userId, callback){
    var query = 'SELECT project_call_log.*, users.user_name, projects.project_name FROM project_call_log LEFT JOIN users ON project_call_log.user_id = users.user_id LEFT JOIN projects ON project_call_log.project_id = projects.project_id WHERE project_call_log.user_id = ' + connection.escape(userId) + ' ORDER BY project_call_log.project_call_log_id DESC LIMIT 10';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getThisWeeksExpectedPayments = function(ldate, udate, callback){
    //console.log(ldate);
    //console.log(udate);
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_manager_id, projects.project_payment_amount, projects.project_payment_recieved_date, users.user_name, users.user_profile_pic, currency_unit.currency_unit_text FROM projects  LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE (project_payment_recieved_date BETWEEN ' + connection.escape(ldate) + ' AND ' + connection.escape(udate) + ') AND projects.project_payment_status = 0 ORDER BY projects.project_payment_recieved_date LIMIT 10';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getThisWeeksExpectedPaymentsById = function(ldate, udate, userId, callback){
    //console.log(ldate);
    //console.log(udate);
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_manager_id, projects.project_payment_amount, projects.project_payment_recieved_date, users.user_name, users.user_profile_pic, currency_unit.currency_unit_text FROM projects  LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE (project_payment_recieved_date BETWEEN ' + connection.escape(ldate) + ' AND ' + connection.escape(udate) + ') AND projects.project_payment_status = 0 AND projects.project_manager_id = ' + connection.escape(userId) + ' ORDER BY projects.project_payment_recieved_date LIMIT 10';
    //console.log(query);
    connection.query(query, callback);
}

//this will fetch all the leads irrespective of the user
module.exports.getAllLeads = function(count, callback){
    var query = 'SELECT projects.project_id, projects.project_name, projects.project_client_name, projects.project_client_email, projects.project_client_contact_no, projects.project_platforms, projects.project_manager_id, projects.project_current_status, projects.project_add_date, projects.project_estimate_budget, projects.project_budget_unit, projects.project_payment_amount, projects.project_payment_recieved_date, users.user_name, project_status.project_status_name, project_status.project_status_class_name, currency_unit.currency_unit_text FROM projects LEFT JOIN users ON users.user_id=projects.project_manager_id LEFT JOIN project_status ON project_status.project_status_id=projects.project_current_status LEFT JOIN currency_unit ON projects.project_budget_unit=currency_unit.currency_unit_id where project_current_status NOT IN (6,7) order by projects.project_id DESC LIMIT ' + connection.escape(count) + ', 10';

    //console.log(query);
    connection.query(query, callback);
}

module.exports.getArchiveLeads = function(count, callback){
    var query = "SELECT projects.project_id, projects.project_name, projects.project_client_name, projects.project_client_email, projects.project_client_contact_no, projects.project_platforms, projects.project_manager_id, projects.project_current_status, projects.project_add_date, projects.project_estimate_budget, projects.project_budget_unit, projects.project_payment_amount, projects.project_payment_recieved_date, users.user_name, project_status.project_status_name, project_status.project_status_class_name, currency_unit.currency_unit_text FROM projects LEFT JOIN users ON users.user_id=projects.project_manager_id LEFT JOIN project_status ON project_status.project_status_id=projects.project_current_status LEFT JOIN currency_unit ON projects.project_budget_unit=currency_unit.currency_unit_id where project_current_status IN (6,7) order by projects.project_id DESC LIMIT " + connection.escape(count) + ", 10";
    connection.query(query, callback);
}

module.exports.createLead = function(lead, callback){
    var query = 'INSERT INTO projects SET ' +  connection.escape(lead);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.updateLead = function(lead, projectId, callback){
    var query = 'UPDATE projects SET ' +  connection.escape(lead) + ' WHERE project_id = ' + connection.escape(projectId);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.addNewNotification = function(notification, callback){
    var query = 'INSERT INTO notifications SET ' + connection.escape(notification);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.addCountry = function(country_name, callback){
    connection.query('INSERT INTO country SET ' + connection.escape(country_name), callback);
}

module.exports.getAllUsers = function(callback){
    var query = 'SELECT user_name,  user_mobile, user_email, user_profile_pic, user_designation, user_add_date FROM users';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.updateProjectStatus = function(status, projectId, callback){
    var query = 'UPDATE projects SET ' + connection.escape(status) + ' WHERE project_id = ' +  connection.escape(projectId);
    connection.query(query, callback);
}

module.exports.findProjectById =  function(id, callback){
    // var query = 'SELECT projects.*, users.user_id, users.user_name, currency_unit.currency_unit_text , project_status.project_status_name, sources.source_name, project_status.project_status_class_name FROM projects LEFT JOIN users ON projects.project_manager_id = users.user_id LEFT JOIN project_status ON project_status.project_status_id = projects.project_current_status LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id LEFT JOIN sources ON sources.source_id=projects.project_source WHERE projects.project_id = ' + connection.escape(id);
    var query = 'SELECT projects.*, users.user_name, current_status.user_name AS current_status_by, project_status.project_status_name, sources.source_name, project_status.project_status_class_name, currency_unit.currency_unit_text FROM projects LEFT JOIN users ON  users.user_id = projects.project_manager_id LEFT JOIN users current_status ON current_status.user_id = projects.project_current_status_by  LEFT JOIN project_status ON project_status.project_status_id = projects.project_current_status LEFT JOIN sources ON sources.source_id=projects.project_source LEFT JOIN currency_unit ON projects.project_budget_unit = currency_unit.currency_unit_id WHERE projects.project_id = ' + connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getAllStatus = function(callback){
    var query = 'SELECT * from project_status';
    //console.log(query);
    connection.query(query, callback);
}
module.exports.getAllCountries = function(callback){
    var query = 'Select * from country';
    //console.log(query);
    connection.query(query, callback);
}
module.exports.getAllPlatforms = function(callback){
    var query = 'Select * from platforms';
    //console.log(query);
    connection.query(query, callback);
}
module.exports.getAllUsers = function(callback){
    var query = 'Select * from users';
    //console.log(query);
    connection.query(query, callback);
}
module.exports.getAllCurrency = function(callback){
    var query = 'Select * from currency_unit';
    //console.log(query);
    connection.query(query, callback);
}
module.exports.getAllSources = function(callback){
    var query = 'Select * from sources';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.addNewProgress = function(progress, callback){
    var query = 'INSERT INTO project_call_log SET ' +  connection.escape(progress);
    //console.log(query);
    connection.query(query, callback);
}
module.exports.updateAmountInProject = function(updateAmount, id, callback){
    var query = 'UPDATE projects SET ' + connection.escape(updateAmount) + ' WHERE project_id = ' +  connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getCallLogsByProjectId = function(projectId, callback){
    var query = 'SELECT project_call_log.*, users.user_name FROM project_call_log LEFT JOIN users ON project_call_log.user_id = users.user_id WHERE project_id = ' + connection.escape(projectId);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.deleteCallLog = function(id, callback){
    var query = 'DELETE FROM project_call_log WHERE project_call_log_id = ' + connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.updateCallLog = function(id, update, callback){
    var query = 'UPDATE project_call_log SET ' + connection.escape(update) + ' WHERE project_call_log_id = ' + connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getMailsForSendingDailyUpdates = function(callback){
    var query = 'SELECT user_email, user_name FROM users WHERE user_status = 1';
    connection.query(query, callback);
}

module.exports.getNotificationsForDailyMail = function(lDate, callback){
    var query = 'SELECT notifications.sub_category, notifications.notification_title, notifications.notification_description, notification_add_dt, projects.project_name, users.user_name FROM notifications LEFT JOIN users ON users.user_id = notifications.user_id LEFT JOIN projects ON projects.project_id = notifications.category_id WHERE notifications.notification_add_dt >= ' + connection.escape(lDate) + ' ORDER BY notifications.sub_category DESC, notifications.notification_add_dt;'
    console.log(query);
    connection.query(query, callback);
}