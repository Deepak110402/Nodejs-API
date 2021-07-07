var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mysql = require('mysql');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

global.role = 0

var con = mysql.createConnection({
    database:"animals",
    host:"localhost",
    user:"FaunaNation",
    password:"%FaunaNationIntern2021%"
  });
  
con.connect(function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Database Connected!")
    }
});

// This post function is for adding a user in database
app.post('/add-admin',function(request, response){
    var values =  [[request.body['Name'],request.body['Email'],request.body['Password'],"admin"]];
    var sql = "INSERT INTO login_details VALUES ?";  
    con.query(sql,[values], function (err, result) {  
        if (err) {
            return console.error(err.message);
        } else {
            response.status(200).send("Success");  
        }
    });      
});

// This post function is for login
app.post('/login',function(request, response){
    var email = request.body['Email'];
    var password = request.body['Password'];
    var sql = `SELECT Password,Role FROM login_details WHERE Email = ?`;
    con.query(sql,[email], function (err, result) {  
        if (err) {
            return console.error(err.message);
        } else {
            if (result[0]['Role'] == "Admin"){
                if (result[0]['Password'] == password) {
                    role = 1
                    console.log(role);
                    response.status(200).send("Success");
                } else {
                    response.status(400).send("Password is wrong.");
                }
            }  
        }
    });  
});

// This get function is for logout
app.get('/logout',function(request, response){
    if (role != 0) {
        role = 0
        response.status(200).send("Success");
    } else {
        return console.error(err.message);
    } 
});

// This get function is used to get all the data of sanple_data table
app.get('/getdata', function(request, response) {
    var sql = `SELECT * FROM sample_data`;
    con.query(sql, (error, results, fields) => {
        if (error) {
          return console.error(error.message);
        }
        response.status(200).send(results);
      });
});

// This post function is for adding a animal in sample_data table
app.post('/add-animal',function(request, response){
    if (role == 1) {
        var values =  [request.body['CommonName'],request.body['ScientificName'],request.body['Type'],request.body['CountryOfOriginme'],request.body['IfIndianStateAndPlace/IfExotic Landmark'],request.body['SpeciesLegalStatus'],request.body['SpeciesStatus(IUCN)'],request.body['GenderTypes'],request.body['AverageLifeExpectancy'],request.body['OptimumWeight'],request.body['OptimumTemperatureRange'],request.body['SeasonOfHighestActivity'],request.body['SocialPreference'],request.body['BreedingSeason(Start)'],request.body['CBreedingSeason(End)'],request.body['GestationPeriod'],request.body['LitterSize'],request.body['ParentalCare'],request.body['WeaningPeriod'],request.body['AgeOfMaturity'],request.body['NaturalDiet'],request.body['CaptiveFoodRecommendation'],request.body['FrequencyOfFood'],request.body['FastingInstructions'],request.body['VaccinationSchedul/ImmunizationRequired'],request.body['Habitat'],request.body['BiggestThreat'],request.body['ThreatPerception'],request.body['IUCN Link'],request.body['Wikipedia Link'],request.body['Photograph'],request.body['OtherLinksAndSources'],request.body['SpecialFacts']];
        var sql = "INSERT INTO sample_data VALUES ?";  
        con.query(sql,[values], function (err, result) {  
            if (err) {
                return console.error(err.message);
            } else {
                response.status(200).send("Success");  
            }
        });   
    } else {
        response.status(400).send("You are not a admin")
    } 
});

// This post function is used to delete one row of table
app.post('/delete',function(request, response){
    if (role == 1) {
        var values =  request.body['CommonName']
        var sql = "DELETE FROM sample_data WHERE Name = ?";  
        con.query(sql,[values], function (err, result) {  
            if (err) {
                return console.error(err.message);
            } else {
                response.status(200).send("Success");  
            }
        });   
    } else {
        response.status(400).send("You are not a admin")
    } 
});

// This post function is used to update in table
app.post('/update',function(request, response){
    if (role == 1) {
        var data = request.body;
        var name = request.body['CommonName'];
        if (name == null) {
            response.status(400).send("You have not entered CommonName")
        }
        sql = `UPDATE sample_data SET ? WHERE CommonName = ?;`;
        con.query(sql,[data,name], function (err, result) {  
            if (err) {
                return console.error(err.message);
            } else {
                response.status(200).send("Success");  
            }
        });  
    } else {
        response.status(400).send("You are not a admin")
    } 
});

app.listen(3000, function() {
    console.log("API running on port 3000!");
});