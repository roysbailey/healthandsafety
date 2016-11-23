var pgp = require('pg-promise')();

var cn = {
    host: 'localhost', // 'localhost' is the default;
    database: 'test',
    user: 'postgres',
    password: 'password'
};

var db = pgp(cn);

(function (incidentSubmissionCloudService) {

    incidentSubmissionCloudService.submitIncidentForProcessing = (incident) => {
        var jsonModel = JSON.stringify( incident );
        return db.none('INSERT INTO public."hasIncidentQueue"("incident", "status") ' + "values($1, 'Submitted')", 
            [jsonModel]);
    }

})(module.exports);