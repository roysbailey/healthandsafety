(function (hasReportController) {

    var azureStorage = require('azure-storage');


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


  };

})(module.exports);