var config = require("./config");
var incidentReadViewRepoCloud = require("./incidentReadViewRepoCloud");
var incidentReadViewRepoLocal = require("./incidentReadViewRepoLocal");

(function (incidentReadViewRepoFactory) {

    incidentReadViewRepoFactory.instance = config.hostModel === 'Cloud' 
        ? incidentReadViewRepoCloud 
        : incidentReadViewRepoLocal;

})(module.exports);