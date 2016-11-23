var https = require("https");
require('array.prototype.find').shim();
var os = require("os");
var incidentQueryService = require("../../services/incidentQueryService");
var incidentSubmissionService = require("../../services/incidentSubmissionServiceFactory").instance;
IncidentModel = require('../../models/IncidentModel');


(function (hasReportAPIController) {

  hasReportAPIController.init = function (app) {

    app.get("/api/hasincidents/:incidentID", function (req, resp) {
    // app.get("/api/hasincidents/:incidentID", function (req, resp) {
    
      var found = false;
      var incidents = req.session.incidents;
      var incidentID = req.params.incidentID;
      if (incidents && incidentID) {
        var incident = incidents.find(function(incident){return incident.incidentID === parseInt(incidentID);})
        if (incident)
          found = true;
      }

      if (!found) {
        resp.statusCode = 404;
        return resp.send('Error 404: No quote found');
      }
        resp.set("Content-Type", "application/json");
        resp.send(incident);
    }); 

    // app.put("/api/hasincidents/:incidentID", function (req, resp) {
    //   var found = false;
    //   var incidents = req.session.incidents;
    //   var incidentID = req.params.incidentID;
    //   if (incidents && incidentID) {
    //     var incident = incidents.find(function(incident){return incident.incidentID === parseInt(incidentID);})
    //     if (incident)
    //       found = true;
    //   }

    //   if (!found) {
    //     resp.statusCode = 404;
    //     return resp.send('Error 404: No quote found');
    //   }
    //     resp.set("Content-Type", "application/json");
    //     resp.send(incident);
    // });     

    app.get("/api/hasincidents", function (req, resp) {
    
      incidentQueryService.GetAllIncidents()
      .then(data => {
        resp.set("Content-Type", "application/json");

        // Enable CORS, so an ionic app can make calls to the api.
        resp.header('Access-Control-Allow-Origin', '*');
        resp.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        resp.header('Access-Control-Allow-Headers', 'Content-Type');        
        resp.send(data);
      });
    });

    app.put("/api/hasincidents/:incidentID", function (req, resp) {
    
      console.log(req.body);      // your JSON

      var model = new IncidentModel(req.body.Region, req.body.incidentDate, 
          req.body.casualty, req.body.incidentClass, req.body.nameOfSubmitter, 
          req.body.problemReport, req.body.status, req.body.IncidentID);

      // Send the incident for processing by the back end.
      incidentSubmissionService.submitIncidentForProcessing(model)
        .then(() => {
          resp.statusCode = 204;
          // Enable CORS, so an ionic app can make calls to the api.
          resp.header('Access-Control-Allow-Origin', '*');
          resp.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
          resp.header('Access-Control-Allow-Headers', 'Content-Type');        
          resp.header('Content-Type', 'application/json');        
          resp.send(JSON.stringify( model ));
        });;
    });
    

  };
})(module.exports);