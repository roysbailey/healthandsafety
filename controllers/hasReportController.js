(function (hasReportController) {

    var config = require('../services/config');
    var azureStorage = require('azure-storage');
    var incidentQueryService = require("../services/incidentQueryService");

  hasReportController.init = function (app) {

    app.get("/hasReport", function (req, res) {
        res.render("hasreportStep1", { title: "Where are you reporting from?" });
    });

    app.post("/hasReport", function (req, res) {

        var firstName = req.body.firstname;
        var lastName = req.body.lastname;

        // res.writeHead(302, {
        //     'Location': '/hasreportStep2'
        //     });
        // res.end();

        res.render("hasreportStep2", { firstName: firstName, lastName: lastName});
    });


    app.post("/hasreportStep2", function (req, res) {

        var firstName = req.body.firstname;
        var lastName = req.body.lastname;
        var region = req.body.locationSelection;

        res.render("hasreportStep3", { region: region, firstName: firstName, lastName: lastName});
    });

    app.post("/hasreportStep3", function (req, res) {

        var model = {
            firstName: req.body.firstname,
            lastName: req.body.lastname,
            region: req.body.region,
            problemReport: req.body.problemReport,
            incidentType: req.body.incidentType,
            incidentID: Math.floor((Math.random() * 1000) + 1)
        };

        var connectionString = process.env.AzureProcessingQueueConnection;
        var queueSvc = azureStorage.createQueueService(connectionString);
        queueSvc.createQueueIfNotExists('has-incidents', function(error, result, response){
            if(!error){
                // Azure storage queues excpect base64 encoding (specifically the tools like storage explorer).
                // http://www.codingdefined.com/2015/07/how-to-encode-string-to-base64-in-nodejs.html
                var jsonModel = JSON.stringify( model );
                var buffer = new Buffer(jsonModel);
                var jsonModelBase64 = buffer.toString('base64');

                queueSvc.createMessage('has-incidents', jsonModelBase64, function(error, result, response){
                    if(!error){


                        // queueSvc.getMessages('has-incidents', function(error, result, response){
                        // if(!error){
                        //     // Message text is in messages[0].messageText
                        //     var message = result[0];
                        // }
                        // });

                        
                    }
                });
            }
        });

        res.render("hasReportCompleted", model);
    });

    app.get("/admin/submissions", function (req, res) {
        res.render("submissions", { title: "Select a location?" });
    });

    app.post("/admin/submissions", function (req, res) {
        console.log("region selected: " + req.body.region);

        Promise.all([incidentQueryService.getLastPollDate(), incidentQueryService.GetIncidentsByLocation(req.body.region)])
        .then(allResults => {
            console.log(allResults);
            var lastReadViewUpdateDateTime = allResults[0]; 
            var values = allResults[1];
            //var lastReadViewUpdateDateTime = "2016-10-25T07:54:23.092Z";
            console.log("Loaded all values... " + values);
            var readViewStaleState = seeIfReadViewStale(lastReadViewUpdateDateTime);
            console.log("ReadViewStaleState... " + readViewStaleState);
            res.render("submissions", { title: "Select a location?", incidents: values, region: req.body.region, readViewStaleState: readViewStaleState, lastReadViewUpdateDateTime: convertDateTimeToEngland(lastReadViewUpdateDateTime) });            
        });
    });

    function seeIfReadViewStale(lastReadViewUpdateDateTime) {
        var now = new Date();
        var lastUdate = new Date(lastReadViewUpdateDateTime);
        var outOfDateInSeconds = (now - lastUdate) / 1000;

        return outOfDateInSeconds > config.staleReadViewThresholdSeconds ? "Stale" : "OK";
    }

    function convertDateTimeToEngland(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat);
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/') + " at " + 
           [pad(d.getHours()), pad(d.getMinutes() + 1), d.getSeconds()].join(':') ;
    }    

  };

})(module.exports);