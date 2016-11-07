var https = require("https");
require('array.prototype.find').shim();
var os = require("os");
var incidentQueryService = require("../../services/incidentQueryService");


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

    app.post("/api/hasincidents", function (req, resp) {
    
      console.log(req.body);      // your JSON

      var incidents = req.session.incidents;
      if (!incidents) {
        req.session.incidents = [];
        incidents = req.session.incidents;
      }

      var locationUri = "/api/hasincidents/" + req.body.incidentID;

      var incidentModel = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            region: req.body.region,
            problemReport: req.body.problemReport,
            incidentType: req.body.incidentType,
            incidentID: req.body.incidentID,
            links: {
              self: locationUri
            }
        };

        incidents.push(incidentModel);

        resp.set("Content-Type", "application/json");
        resp.location(locationUri);
        resp.statusCode = 201;

        resp.send(incidentModel);
    });
    

  };
})(module.exports);