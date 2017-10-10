exports.index = function (app, config) {


    app.all(config.client.baseUrl + "/index.html*", function (req, res, next) {
        console.log("req.isAuthenticated()---------------", req.isAuthenticated());
        // res.sendfile("index.html", { root: config.server.distFolder });
        if (req.isAuthenticated()) {
            res.sendfile("index.html", { root: config.server.distFolder });
            // return next();
        } else {
            res.redirect(config.client.baseUrl + "/login");
        }
    });
    

    app.get(config.client.baseUrl + "/login", function (req, res) {
        // Just send the index.html for other files to support HTML5Mode
        console.log("log in!!!");
        res.sendfile("login.html", { root: config.server.distFolder });
    });
};
