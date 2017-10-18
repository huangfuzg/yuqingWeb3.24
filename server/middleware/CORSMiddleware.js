exports = module.exports = function(app) {

	app.use(function(request, response, next){
		response.header("Access-Control-Allow-Origin", app.get("client-url"));
		response.header("Access-Control-Allow-Header", "Content-Type,X-Requested-With");
		response.header("Access-Control-Allow-Credentials", "true");
		next();
	});

	app.options("*", function(request, response){
		response.send(200);
	});
};