var config = require("./config");
var incidentSubmissionCloudService = require("./incidentSubmissionCloudService");
var incidentSubmissionLocalService = require("./incidentSubmissionLocalService");

(function (incidentSubmissionServiceFactory) {

    incidentSubmissionServiceFactory.instance = config.hostModel === 'Cloud'
        ? incidentSubmissionCloudService 
        : incidentSubmissionLocalService;

})(module.exports);