'use strict';

module.exports = function (region, incidentDate, casualty, incidentClass, nameOfSubmitter, problemReport, status) {
  this.Region = '' + region;
  this.incidentDate = incidentDate;
  this.casualty = casualty;
  this.incidentClass = incidentClass;
  this.nameOfSubmitter = '' + nameOfSubmitter;
  this.problemReport = problemReport;
  this.status = status;
} 



