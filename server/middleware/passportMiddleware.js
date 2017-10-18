exports = module.exports = function (app, passport, config) {

    var LocalStrategy = require("passport-local").Strategy;
    var request = require('request');
    //Local
    passport.use("local", new LocalStrategy(function (username, password, done) {
        console.log(username+" "+ password+ " "+ config.RESTAPI.apikey);
        process.nextTick(function () {
            var user = {userId:1,username:"yuqing",password:"yuqing"};
            if(username == user.username && password == user.password)
            {
                return done(null, user);
            }
            else
            {
                return done(new Error("用户名密码错误"),null);
            }
            var options = {
                url: config.RESTAPI.basicUrl + "systemsetting/user/login?username=" + username + "&password=" + password,
                headers: {
                    "apikey": config.RESTAPI.apikey,
                    "User-Agent": "request"
                }
            };

            request(options, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var user = JSON.parse(body);
                    console.log("--------user------:",user);
                    config.RESTAPI.userToken = user.data.usertoken;
                    return done(null, user);
                }else{
                    //服务器链接失败
                    console.log("[--------error------]:",error);
                    return done(error, null);
                }
            });
        });

    }));

    //Serialize
    passport.serializeUser(function (user, done) {
        console.log(user);
        config.RESTAPI.username = user.userId;
        console.log("serializeUser-----------------", user.userId);
        done(null, user.userId);
    });

    //Deserializa
    passport.deserializeUser(function (username, done) {
        console.log(username);
        var user = {userId:1,username:"yuqing",password:"yuqing"};
        if(username == user.userId)
        {
            return done(null, user);
        }
        else
        {
            return done(new Error("用户名密码错误"),null);
        }
        var options = {
            url: config.RESTAPI.basicUrl + "systemsetting/user/" + username,
            headers: {
                "apikey": config.RESTAPI.apikey,
                "usertoken": config.RESTAPI.userToken,
                "username": username,
                "User-Agent": "request"
            }
        };
        request(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var user = JSON.parse(body);
                console.log("deserializeUser-----------------");
                done(null, user);
            } else {
                done(error, null);
            }
        });
    });

};
