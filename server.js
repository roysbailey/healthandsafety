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
app.use(function(req, res, next) {
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
//    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  }
  next();
});


// set the public static resource folder
app.use(express.static(__dirname + "/public"));

// Map the routes
controllers.init(app);

var server = http.createServer(app);

var port = process.env.PORT || 3000;
console.log("Running on port A: " + process.env.PORT);
console.log("Running on port: " + port);

dumpEnv();

server.listen(port);


function dumpEnv() {
    // console.log("Environemnt...");
    // console.log(process.env);
}
