var pgp = require('pg-promise')();
var config = require("./config");

var cn = {
    host: config.postgresHost, // 'localhost' is the default;
    database: 'has',
    user: 'postgres',
    password: config.postgresPassword
};

var db = pgp(cn);

(function (incidentSubmissionCloudService) {

    incidentSubmissionCloudService.submitIncidentForProcessing = (incident) => {
        var jsonModel = JSON.stringify( incident );
        return db.none('INSERT INTO public."hasIncidentQueue"("incident", "status") ' + "values($1, 'Submitted')", 
            [jsonModel]);
    }

})(module.exports);