var azureStorage = require('azure-storage');

(function (incidentSubmissionService) {
    incidentSubmissionService.submitIncidentForProcessing = (incident) => {
        return new Promise( function pr(resolve,reject) {
            dumpEnv();
            
            var connectionString = process.env.AzureProcessingQueueConnection;
            var queueSvc = azureStorage.createQueueService(connectionString);
            queueSvc.createQueueIfNotExists('has-incidents', function(error, result, response){
                if(!error){
                    // Azure storage queues excpect base64 encoding (specifically the tools like storage explorer).
                    // http://www.codingdefined.com/2015/07/how-to-encode-string-to-base64-in-nodejs.html
                    var jsonModel = JSON.stringify( incident );
                    var buffer = new Buffer(jsonModel);
                    var jsonModelBase64 = buffer.toString('base64');

                    queueSvc.createMessage('has-incidents', jsonModelBase64, function(error, result, response){
                        if(error){
                            console.log("Error prosting message (createMessage): " + error);
                            reject(error);
                        } else {
                            resolve();
                        }
                    });
                } else {
                    console.log("Error prosting message (createQueueIfNotExists): " + error);
                    reject(error);
                }
            });
        });
    }

function dumpEnv() {
    console.log("Environemnt...");
    console.log(process.env);
}

})(module.exports);