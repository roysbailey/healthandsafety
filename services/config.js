(function (config) {
  config.staleReadViewThresholdSeconds = 60;
  config.postgresHost = process.env.postgresHost || 'localhost';
  config.postgresPassword = process.env.postgresPassword || 'password';
  config.hostModel = process.env.HOST_MODEL || 'Local'
})(module.exports);
