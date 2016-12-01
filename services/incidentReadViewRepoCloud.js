var config = require("./config");

(function (incidentReadViewRepoCloud) {

//    var RestClient = require('node-rest-client').Client;


    var AWS = require("aws-sdk");
    AWS.config.update({
        region: "eu-west-1"
    });
    const dynamodb = new AWS.DynamoDB({correctClockSkew: true});


    incidentReadViewRepoCloud.GetAllIncidents = () => {
        return new Promise( function pr(resolve,reject) {

            var docClient = new AWS.DynamoDB.DocumentClient({correctClockSkew: true});
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

    incidentReadViewRepoCloud.GetIncidentsByLocation = (region) => {
        return new Promise( function pr(resolve,reject) {

            console.log("GetIncidentsByLocation() - " + region);

            var date = new Date();
            console.log("datetime - " + date);
            
            var docClient = new AWS.DynamoDB.DocumentClient({correctClockSkew: true});
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

    incidentReadViewRepoCloud.getLastPollDate = () => {
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

})(module.exports);