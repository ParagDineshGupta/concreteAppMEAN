/**
 * Created by glitch on 27/11/17.
 */

var mongoose = require('mongoose');
var connection = mongoose.connect(process.env.DB);//('mongodb://localhost:27017/concrete');//connecting to our database named concrete

//creating the USER Schema
var CitySchema = mongoose.Schema({
    cityName:{
        type:String
    }
});


var City = module.exports = mongoose.model('City', CitySchema);


module.exports.saveCity = function (newCity, callback) {
    newCity.save(newCity, callback);
};

module.exports.getAllCities = function(callback){
	City.find({}, callback);
}