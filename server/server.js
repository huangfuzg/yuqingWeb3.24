var express = require("express");
var http = require("http");
var https = require("https");
var fs = require("fs");
var cookieSession = require("cookie-session");
var session = require("express-session");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var cookieParser = require("cookie-parser");
var passport = require("passport");

//config logger and save the file.
var logger = require("logger").createLogger();

//define config file
var config = require("./configuration");
var security = require("./lib/security");
var protectJSON = require('./lib/protectJSON');

var privateKey = fs.readFileSync(__dirname + "/cert/privatekey.pem").toString();
var certificate = fs.readFileSync(__dirname + "/cert/certificate.pem").toString();
var credentials = { key: privateKey, cert: certificate };

var app = express();
var secureServer = https.createServer(credentials, app);
var server = http.createServer(app);

require("./middleware/staticMiddleware")(app, config, logger);
app.use(cookieParser(config.server.cookieSecret));
app.use(session({ secret: config.server.sessionSecret, cookie: { maxAge: 30 * 60 * 1000 } }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(protectJSON);

require("./middleware/CORSMiddleware")(app);
require("./middleware/passportMiddleware")(app, passport, config);
app.use(function (request, response, next) {
    if (request.url.indexOf(config.server.staticUrl) === -1 && request.url !== "/" && request.url !== "/login") {
        if (request.user) {
            logger.info('Current User:', request.user);
            next();
        } else {
            logger.error("Unauthenticated!!!");
            next();
        }
    } else {
        next();
    }
});

require('./middleware/RedirectMiddleware')(app);
require("./routes/auth").auth(app, security, logger);
require("./routes/index").index(app, config);
require("./middleware/errorHandleMiddleware")(app);

server.listen(config.server.listenPort, '0.0.0.0', 511, function () {
    // Once the server is listening we automatically open up a browser
    console.log("server start!!");
    var open = require('open');
    open('http://localhost:' + config.server.listenPort + '/yuqing/login');
});
logger.info('Angular App Server - listening on port: ' + config.server.listenPort);

secureServer.listen(config.server.securePort);

logger.info('Angular App Server - listening on secure port: ' + config.server.securePort);
