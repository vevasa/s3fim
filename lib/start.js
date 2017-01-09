var _ = require('lodash');
var async = require('async');
var aws = require('aws-sdk');
var moment = require('moment');
var C = require('./constants');
var request = require('request');


var config = require('../config.json');
var utils = require('./utils');

var fs = require('fs');


var dateString = "";

function parseRule(obj){
	var keyarray = Object.keys(obj);
	var ruleArrays = [];
	for (var i = 0; i < keyarray.length; i++) {
		ruleArray = [keyarray[i],  obj[keyarray[i]]];
		ruleArrays.push(ruleArray);
	}
	console.log(ruleArrays);
	findRule (ruleArrays,"bucketname");

}

function findRule(ruleArrays,findString){
	ruleArrays.forEach(function (ruleArray) {
		if (ruleArray[0] == findString) {
			console.log(ruleArray[1]);
		}
	});
}

function getKeyValue(obj, searchString) {
	var objectConstructor = {}.constructor;
	var keyarray = Object.keys(obj);
	for (var i = 0; i < keyarray.length; i++) {
		if ( (obj[keyarray[i]]).constructor == objectConstructor) { 
			getKeyValue(obj[keyarray[i]]);
		}
		else {
			if ( obj[keyarray[i]] == searchString) {
				console.log(keyarray[i],  obj[keyarray[i]]);		
				getKeyValue(obj, "s3aceessjan3");
			}
		}
	}
} 

function buildTSRequest (callback) {
    //var dateString = moment.utc().format('YYYY-MM-DD');
    var obj = JSON.parse(fs.readFileSync('./files/PutObject.json', 'utf8'));
    var obj = JSON.parse(fs.readFileSync('./s3obj.rules', 'utf8'));
    parseRule(obj);  
    getKeyValue(obj,"AccessDenied");  
    console.log("end");  
    //console.log(obj);

    var options = { 
    	url : C.THREATSTACK_ALERT_URL + "?organization=" + config.organization + "--data-urlencode start=",
	headers: {
		"Authorization": config.api_key
	} 
    };

     request(options, function(err, response, body) {
	//console.log("inside request"+response.statusCode);
	//console.log (body);
	var parsedbody = JSON.parse(body);
	//console.log("after parsed body");
	var dateString = moment.utc().format('YYYY-MM-DD');
	var bucketName = config.s3_bucket + "/" + dateString;
	//buildS3Request(bucketName, dateString, parsedbody);

     });

}

function buildS3Request(bucket, name, parsedbody){
	var AWS = require('aws-sdk');
	AWS.config.update({region: 'us-east-1'});
	var s3 = new AWS.S3();
	console.log("ins3"+ bucket + name);
	s3.createBucket({Bucket: 'tswebhookjan'}, function(err, data) {
		console.log("createbucket" + err);
	});
	s3.putObject({
		Bucket: 'tswebhookjan',
		Key: name + ".json",
		Body: JSON.stringify(parsedbody)
		}, function(err, data) {
			console.log("putbucket" + err);
		});
}


buildTSRequest ( function (err,ret){

	console.log(ret)

});
