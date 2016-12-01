var incidentSubmissionCloudService = require("./incidentSubmissionCloudService");
var incidentSubmissionLocalService = require("./incidentSubmissionLocalService");

(function (incidentSubmissionServiceFactory) {

    incidentSubmissionServiceFactory.instance = process.env.HOST_MODEL === 'Azure' 
        ? incidentSubmissionCloudService 
        : incidentSubmissionLocalService;

})(module.exports);