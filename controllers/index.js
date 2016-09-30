(function (controllers) {

  var homeController = require("./homeController");
  var hasReportController = require("./hasReportController");
  var hasReportAPIController = require("./api/hasReportAPIController");

  controllers.init = function (app) {
    homeController.init(app);
    hasReportAPIController.init(app);
    hasReportController.init(app);
  };

})(module.exports);