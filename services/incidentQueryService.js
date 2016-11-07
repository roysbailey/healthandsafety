var config = require("./config");

(function (incidentQueryService) {

//    var RestClient = require('node-rest-client').Client;


    var AWS = require("aws-sdk");
    AWS.config.update({
        region: "eu-west-1"
    });
    const dynamodb = new AWS.DynamoDB();


    incidentQueryService.GetAllIncidents = () => {
        return new Promise( function pr(resolve,reject) {

            var docClient = new AWS.DynamoDB.DocumentClient();
            var results = [];

            var params = {
                TableName : "HealthAndSafetyIncidents"
            };

            docClient.scan(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log("GetAllIncidents succeeded.");
                    data.Items.forEach((item) => {
                        console.log(" -", item.IncidentID + ": " + item.Region);
                        results.push(item);
                    });

                    resolve(results);
                }
            });

        });
    }

    incidentQueryService.GetIncidentsByLocation = (region) => {
        return new Promise( function pr(resolve,reject) {

            var docClient = new AWS.DynamoDB.DocumentClient();
            var results = [];

            var params = {
                TableName : "HealthAndSafetyIncidents",
                KeyConditionExpression: "#reg = :region",
                ExpressionAttributeNames:{
                    "#reg": "Region"
                },
                ExpressionAttributeValues: {
                    ":region":region
                }
            };

            docClient.query(params, function(err, data) {
                if (err) {
                    console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
                    reject(err);
                } else {
                    console.log("Query succeeded.");
                    data.Items.forEach((item) => {
                        console.log(" -", item.IncidentID + ": " + item.Region);
                        results.push(item);
                    });

                    resolve(results);
                }
            });

        });
    }

    incidentQueryService.getLastPollDate = () => {
        return new Promise( function pr(resolve,reject) {
            getItem("HealthAndSafetyBookMark", "System", "HealthAndSafety", (error, data) => {
                if (error)
                    reject(error)
                else {
                    resolve(data.Item.LastPollDateTime.S);
                }
            });
        });
    }    

    function getItem (table, idName, id, callback) {
        let params ={
            TableName: table,
            Key: {}
        };
        params.Key[idName] = { S: id };

        dynamodb.getItem(params, callback);
    }


    // incidentQueryService.GetIncidentsByLocationREST_OLD = (location) => {
    //     return new Promise( function pr(resolve,reject) {

    //         // Convert queue format to BO format 
    //         var results = [];

    //         var client = new RestClient();
    //         var args = {
    //         headers: standardGetHeader()
    //         };

    //         var incidentQueryUri = config.incidentQueryUri.replace("{0}", location);
    //         console.log("Query Uri: " + incidentQueryUri) + " header: " + args.headers.Authorization; 
    //         client.get(incidentQueryUri, args, (data, response) => {
    //             console.log("RAW BODY response from query by region: " + JSON.stringify(data));
    //             results = data['rdfs:member'];
    //             console.log("Retrived incidents: " + results);                

    //             if (results && results.length > 0) {
    //                 console.log("Total matches: " + results.length);

    //                 var loadIncidentPromises = [];
    //                 results.forEach((item) => {
    //                     incidentUri = item['rdf:resource'].replace("localhost", config.incidentServiceHostname);
    //                     loadIncidentPromises.push(loadIndividualIncident(incidentUri));
    //                 })

    //                 Promise.all(loadIncidentPromises).then(values => { 
    //                     console.log(values); 
    //                     resolve(values);
    //                 });
    //             }
    //         }).on('error', function (err) {
    //             console.log('something went wrong on the GET', err.request.options);
    //             reject(err);
    //         });
    //     });
    // }

    // function loadIndividualIncident(incidentUri) {
    //     return new Promise( function pr(resolve,reject) {
    //         console.log("Load Item: " + incidentUri);

    //         var client = new RestClient();
    //         var args = {
    //         headers: standardGetHeader()
    //         };

    //         client.get(incidentUri, args, (data, response) => {
    //             console.log("Retrived incident: " + data);
    //             var incidentDTO = mapBOToDTO(data);
    //             resolve(incidentDTO);
    //         });
    //     });

    // }



    // function standardGetHeader() {
         
    //      var standardGetHeader = 
    //         { 
    //         "Accept": "application/json", 
    //         "Authorization": config.basicAuthHeaderVal 
    //         };

    //     return standardGetHeader;
    // }

    // function mapBOToDTO(incidentBO) {
    //     var dto =
    //     {
    //     "ID": incidentBO["spi:ControlNumber"],
    //     "problemReport": incidentBO["spi:cstIncidentDetails"],
    //     "incidentType": incidentBO["spi:cstIncidentType"],
    //     "region": incidentBO["spi:cstIncidentLocation"],
    //     "name":  incidentBO["spi:cstNameOfSubmitter"], 
    //     "created":  convertDateToEngland(incidentBO["spi:CreatedDateTime"]) 
    //     }

    //     return dto;
    // }
    
    // function convertDateToEngland(inputFormat) {
    //     function pad(s) { return (s < 10) ? '0' + s : s; }
    //     var d = new Date(inputFormat);
    //     return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/');
    // }
        
    // function mapModelToDTO(incidentModel) {
    //     var dto =
    //     {
    //         "ID": incidentModel.IncidentID,
    //         "problemReport": incidentModel.problemReport,
    //         "incidentType": incidentModel.incidentType,
    //         "region":incidentModel.Region,
    //         "name":  incidentModel.nameOfSubmitter, 
    //         "created": incidentModel.createdDateTime,
    //         "status": incidentModel.status,
    //     }

    //     return dto;
    // }    


})(module.exports);