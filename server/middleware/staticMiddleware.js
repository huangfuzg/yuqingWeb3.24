exports = module.exports = function(app, config, logger) {
	var express = require("express");
	var compression = require("compression");
	var serveFavicon = require("serve-favicon");

	//static files
	//set up server favicon
	//app.use(serveFavicon(config.server.distFolder + "/favicon.ico"));
	// First looks for a static file: index.html, css, images, etc.
	app.use(config.server.staticUrl, compression(config.server.distFolder));
	app.use(config.server.staticUrl, express.static(config.server.distFolder));
	app.use(config.server.staticUrl, function(request, response, next){
		logger.info("If we get here then the request for a static file is invalid");
		response.send(404);
	});
};