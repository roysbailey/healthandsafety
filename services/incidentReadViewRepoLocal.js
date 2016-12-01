var _ = require('underscore');
var config = require("./config");

var pgp = require('pg-promise')();

var cn = {
    host: config.postgresHost, // 'localhost' is the default;
    database: 'has',
    user: 'postgres',
    password: config.postgresPassword
};
var db = pgp(cn);

(function (incidentReadViewRepoLocal) {

    incidentReadViewRepoLocal.GetAllIncidents = () => {
        return new Promise( function pr(resolve,reject) {

            db.any('select "incident" from public."hasIncidentsReadView"', [])
                .then(function (data) {
                    var incidents = _(data).map( (i) =>{
                        return i.incident;
                    });
                    resolve(incidents);
                })
                .catch(function (error) {
                    console.log("error (incidentReadViewRepoLocal.GetAllIncidents): " + error)
                    reject(error);
                });
        });
    }

    incidentReadViewRepoLocal.GetIncidentsByLocation = (region) => {
        return new Promise( function pr(resolve,reject) {

            console.log("GetIncidentsByLocation() - " + region);

            db.any('select "incident" from public."hasIncidentsReadView" where "Region"=$1', [region])
                .then(function (data) {
                    var incidents = _(data).map( (i) => {
                        return i.incident;
                    });
                    
                    resolve(incidents);
                })
                .catch(function (error) {
                    console.log("error (incidentReadViewRepoLocal.GetIncidentsByLocation): " + error)
                    reject(error);
                });
        });
    }


    incidentReadViewRepoLocal.getLastPollDate = () => {
        return new Promise( function pr(resolve,reject) {
            db.any('select "LastPollDateTime" from public."HealthAndSafetyBookmark" where "System"=$1', ['HealthAndSafety'])
                .then((data) => {
                    if (data.length)
                        resolve(data[0].LastPollDateTime.toISOString())
                    else 
                        resolve("2016-10-01T05:51:42.930-04:00");
                })
                .catch( (error) => {
                    reject(error);
                });
        });
    }    


})(module.exports);