//Local
exports.init = function (request, response) {

    var passport = request._passport.instance;
    var config = require("../configuration");
    var username = request.body.username;
    var password = request.body.password;

    var validate = function () {
        if (!username) {
            return response.send(400, 'Username required');
        }
        if (!password) {
            return response.send(400, 'Password required');
        }

        attemptLogin();
    };

    attemptLogin = function () {
        passport.authenticate('local', function (err, user, info) {
            if (err) {
                return response.send(500, err);
            }
            request.login(user, function (err) {
                console.log(err);
                var Info={data:{user:{}},code:1,success:false};
                if(err) return response.send(200, JSON.stringify(Info));
                // if (err) return response.send(404, user);
               // user.data.password = undefined;
                console.log("[-------------logIn success!!----------------]", JSON.stringify(user));
                var Info={data:{user:{username:user.username}},code:0,success:true};
                return response.send(200, JSON.stringify(Info));
            });
        })(request, response);
    };

    validate();
}
