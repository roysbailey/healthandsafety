var https = require("https");
require('array.prototype.find').shim();
var os = require("os");

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
    
      var incidents = req.session.incidents;
      resp.set("Content-Type", "application/json");
      resp.send(incidents);

      // var RestClient = require('node-rest-client').Client;
      // var client = new RestClient();
      // var args = {
      //   headers:{"Authorization": process.env.CH_BASIC_AUTH} 
      // };
    
      // // Call companies house  
      // client.get("https://api.companieshouse.gov.uk/search/companies?q=" + req.query.q, args, function(data, response){
        
      //   // Return the data from companies house back to our client UI
      //   resp.set("Content-Type", "application/json");
      //   resp.send(data);
      // });
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