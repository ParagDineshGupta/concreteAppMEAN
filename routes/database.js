var mysql = require('mysql');
var connection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    database:'lead_management'
});

module.exports = connection;

module.exports.createLead = function(lead, callback){
    var query = 'INSERT INTO leads SET ' +  connection.escape(lead);
    //console.log(query);
    connection.query(query, callback);
}

module.exports.updateLead = function(updatelead, leadId, callback){
    var query = 'UPDATE leads SET ' +  connection.escape(updatelead) + ' WHERE lead_id = ' + connection.escape(leadId);
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

module.exports.getAllLeads = function(callback){
    var query = 'SELECT leads.*, users.user_name, project_status.project_status_name, project_status.project_status_class_name, currency_unit.currency_unit_text FROM leads LEFT JOIN users ON users.user_id=leads.lead_manager  LEFT JOIN project_status ON project_status.project_status_id=leads.project_current_status LEFT JOIN currency_unit ON leads.project_budget_currency=currency_unit.currency_unit_id where project_current_status NOT IN (6,7) order by leads.lead_id desc';
    //console.log(query);
    connection.query(query, callback);
}

module.exports.getLeadById =  function(id, callback){
    var query = 'SELECT leads.*, users.user_id, users.user_name, currency_unit.currency_unit_text , project_status.project_status_name, sources.source_name, project_status.project_status_class_name FROM leads LEFT JOIN users ON leads.lead_manager = users.user_id LEFT JOIN project_status ON project_status.project_status_id = leads.project_current_status LEFT JOIN currency_unit ON leads.project_budget_currency = currency_unit.currency_unit_id LEFT JOIN sources ON sources.source_id=leads.client_source WHERE leads.lead_id = ' + connection.escape(id);
    //console.log(query);
    connection.query(query, callback);
}