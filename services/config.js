(function (config) {
  config.staleReadViewThresholdSeconds = 60;
  config.postgresHost = process.env.postgresHost || 'localhost';
  config.postgresPassword = process.env.postgresPassword || 'password';
})(module.exports);
