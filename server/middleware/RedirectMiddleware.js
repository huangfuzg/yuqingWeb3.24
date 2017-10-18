exports = module.exports = function (app) {

    app.use(function (request, response, next) {
        if (request.url === "/") {
            // response.writeHead(302, {
            // 	'content-type': 'text/html',
            //     'Location': "/login"
            // });
            // response.send();
            response.redirect("yuqing/login");
        }
        next();
    });
};
