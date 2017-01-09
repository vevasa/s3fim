
exports.handler = function (event, context, callback) 
{
    // TODO implement
	
	console.log ("cloudwatchemail");
    	//console.log(JSON.stringify(event));
	var records = event;
	console.log(records);
	console.log("after records");
	console.log(records.detail.eventName);
	if (records.detail.eventName == "PutObject") {
		console.log("Object Removed" + records.detail.requestParameters.bucketName+":"+records.detail.requestParameters.key);
	}
       	if (records.detail.eventName == "GetObject") {
		console.log("Object Accessed"+records.detail.requestParameters.bucketName+":"+records.detail.requestParameters.key);
	}
	 	
};
