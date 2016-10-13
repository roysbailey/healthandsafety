var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var controllers = require("./controllers");

// var incidentQueryService = require("./services/incidentQueryService");
//     incidentQueryService.GetIncidentsByLocation("PJOBS").then(values => {
//         console.log("Loaded all values... " + values);
//     });

// Setup the View Engine
app.set("view engine", "vash");

// instruct the app to use the `bodyParser()` middleware for all routes
app.use(bodyParser());

// Enable server side sessions
app.use(express.cookieParser());
app.use(express.session({secret: '1234567890QWERTY'}));

// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
controllers.init(app);

var server = http.createServer(app);

server.listen(process.env.PORT || 3000);
