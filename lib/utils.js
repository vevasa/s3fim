var aws = require('aws-sdk');
var request = require('request');

var C = require('./constants');
var config = require('../config.json');

module.exports = {
  buildThreatStackRequest: function(notification) {
    return function(requestCallback) {
      var options = {
        url: C.THREATSTACK_ALERT_URL + notification.id + "?organization=" + config.organization,
        headers: {
          "Authorization": config.api_key
        }
      };

      request(options, function(err, response, body) {
        if (err) {
          requestCallback(err);
        } else {
          if (response.statusCode === 200) {
            requestCallback(null, JSON.parse(body));
          } else {
            requestCallback(body);
          }
        }
      });
    };
  },
  buildS3Request: function(bucket, name, body) {
    return function(s3Callback) {
      var s3 = new aws.S3();
      s3.putObject({
        Bucket: bucket,
        Key: name + ".json",
        Body: body
      }, function(err, data) {
        s3Callback(err, data);     
      });
    }
  }
};
