exports.auth = function (app, security, logger) {

	logger.info("start auth");

    app.post("/api/auth/login", require("../lib/signin").init);
    app.post("/api/auth/logout", require("../lib/signout").init,function(res,rep){
        res.redirect("login.html");
    });
    //查询当前
    app.get("/current-user", security.currentUser);

    app.get("/authenticated-user", function(request, response){
    	security.authentication(request, response, function(){
    		security.currentUser(request, response);
    	});
    });

    app.get("/admin-user", function(request, response){
    	security.adminAuthentication(request, response, function(){
    		security.currentUser(request, response);
    	});
    });

};
