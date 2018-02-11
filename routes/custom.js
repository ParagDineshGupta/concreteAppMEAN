var express = require('express');
var router = express.Router();
var db = require('./database');
var clearbit = require('clearbit')('sk_c0d0b08bb9feef5b824acdd5d1460886');
var async = require('async');
var jwt = require('jsonwebtoken');
var secret = 'thisisabigsecret';

router.post('/createnewlead', function(req, res){
    console.log(req.headers);
    var userId = jwt.verify(req.headers.authorization, secret, function(err, decoded){
        if(err){
            console.log("%%%%%%%%%%%%%%%%%%%" + err);
            res.json({
                msg:"some error occured"
            });
            return;
        }
        var userId = decoded.userId;

        console.log('create lead enter')
        var email = req.body.email;
        var client_name = req.body.clientName || 0;
        var project_name = req.body.projectName || 0;
        var project_description = req.body.description || 0;
        var client_contact_no = req.body.contact || 0;
        var client_country = req.body.country || 0;
        var client_city = req.body.city || 0;
        var client_source = req.body.source || 0;
        var project_platform = req.body.platform || 0;
        var project_budget = req.body.budget || 0;
        var project_budget_currency = req.body.currency || 0;
        var lead_manager = req.body.manager || 0;
        var added_by = userId;
        var project_add_date = Date.now();


        var lead = {
            client_email :email,
            client_name :client_name,
            project_name :project_name,
            project_description :project_description,
            client_contact_no :client_contact_no,
            client_country :client_country,
            client_city :client_city,
            client_source :client_source,
            project_platform :project_platform,
            project_budget :project_budget,
            project_budget_currency :project_budget_currency,
            lead_manager :lead_manager,
            added_by :added_by,
            project_add_date : project_add_date,
            project_upfront_amount: 0,
            project_upfront_received_date: 0
        }
        console.log(lead);
        db.createLead(lead, function(err, result){
            if(err){
                console.log(err);
                return res.json({
                    success:false,
                    msg:"there was some error, please try again later"
                })
            }
            return res.json({
                success:true,
                msg:"lead created",
                result:result
            })
        })

    });
    
});


router.post('/updateleaddetails', function(req, res){

    var leadId = req.body.leadId;

    var client_email = req.body.email || 0;
    var client_name = req.body.clientName || 0;
    var project_name = req.body.projectName || 0;
    var project_description = req.body.description || 0;
    var client_contact_no = req.body.contact || 0;
    var client_country = req.body.country || 0;
    var client_city = req.body.city || 0;
    var client_source = req.body.source || 0;
    var project_platform = req.body.platform || 0;
    var project_budget = req.body.budget || 0;
    var project_budget_currency = req.body.currency || 0;
    var lead_manager = req.body.manager || 0;
    var added_by = req.body.userId || 0;


    var updatelead = {
        client_email :client_email,
        client_name :client_name,
        project_name :project_name,
        project_description :project_description,
        client_contact_no :client_contact_no,
        client_country :client_country,
        client_city :client_city,
        client_source :client_source,
        project_platform :project_platform,
        project_budget :project_budget,
        project_budget_currency :project_budget_currency,
        lead_manager :lead_manager,
        added_by :added_by,
    }

    db.updateLead(updatelead, leadId, function(err, results){
        if(err){
            console.log(err);
            return res.json({
                success:false,
                msg:"there was some error, please try again later"
            })
        }
        return res.json({
            success:true,
            msg:"lead updated"
        })
    })
});

router.get('/allleads', function(req, res){
    db.getAllLeads(function(err, results){
        if(err){
            console.log(err);
            return res.json({
                success:false,
                msg:"there was some err",
                err:err
            })
        }
        return res.json({
            success:true, 
            data: results
        });
    });
});

router.get('/details/:id', function(req, res){
    db.getLeadById(req.params.id, function(err, results){
        if(err){
            console.log(err);
            return res.json({
                success:false,
                msg:"there was some err",
                err:err
            })
        }
        return res.json({
            success:true, 
            data: results
        });
    });
});

router.post('/clearbit', function(req, res){
    var email = req.body.email;

    var Person = clearbit.Person.find({email:email})
        .then(function(person){
            console.log(person);
            res.json(person);
        });
});


//this route will load platforms, countries etc. data for the dropdowns on add lead page
router.get('/addleadspage', function(req, res){
    async.parallel({
        countries: function(callback){db.getAllCountries(callback)},
        platforms: function(callback){db.getAllPlatforms(callback)},
        leadManagers: function(callback){db.getAllUsers(callback)},
        currency: function(callback){db.getAllCurrency(callback)},
        sources: function(callback){db.getAllSources(callback)}
    }, function(err, results){
        if(err){
            console.log(err);
            return res.json({
                success:false,
                err:err,
                msg:'some error occured'
            })
        }
        return res.json({
            success:true,
            results:results
        })
    })                                                                                                                                                                                                                                                  
});

module.exports = router;