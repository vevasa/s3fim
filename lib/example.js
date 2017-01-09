var _ = require('lodash');
var async = require('async');
var aws = require('aws-sdk');
var moment = require('moment');

var config = require('../config.json');
var utils = require('./utils');

function saveAlertsToS3(bucketName, alerts, saveToS3Callback) {
  async.parallel(_.map(alerts, function(alert) {
    return utils.buildS3Request(bucketName, alert.id, JSON.stringify(alert));
  }), saveToS3Callback);
}

function storeAlerts(alerts, context) {
  var dateString = moment.utc().format('YYYY-MM-DD');
  var bucketName = config.s3_bucket + "/" + dateString;
  var tsRequests = _.map(alerts, utils.buildThreatStackRequest);
  async.parallel(tsRequests, function(err,alerts) {
    if (err) {
      context.fail(err);
    } else {
      saveAlertsToS3(bucketName, alerts, function(err) {
        if (err) {
          context.fail(err);
        } else {
          context.succeed();
        }
      });
    }
  });
}

module.exports = function(alerts, context) {
  storeAlerts(alerts, context);
};
