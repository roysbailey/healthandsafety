(function (config) {
  config.incidentQueryUri = process.env.incidentQueryUri;
  config.incidentServiceHostname = process.env.incidentServiceHostname;
  config.basicAuthHeaderVal = process.env.BasicAuthHeaderVal;
})(module.exports);
