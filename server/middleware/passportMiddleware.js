var crypto = require('crypto');
exports = module.exports = function (app, passport, config) {

    var LocalStrategy = require("passport-local").Strategy;
    var request = require('request');
    //Local
    passport.use("local", new LocalStrategy(function (username, password, done) {
        console.log(username+" "+ password+ " "+ config.RESTAPI.apikey);
        process.nextTick(function () {
            // var user = {userId:1,username:"yuqing",password:"yuqing"};
            var md5 = crypto.createHash('md5');
            var userInfo = {user_account:username,user_pwd:password};
            // if(username == user.username && password == user.password)
            // {
            //     return done(null, user);
            // }
            // else
            // {
            //     return done(new Error("用户名密码错误"),null);
            // }
            var options = {
                url: config.restServer.baseUrl + "/log_in",
                headers: {
                    "apikey": config.RESTAPI.apikey,
                    "User-Agent": "request"
                },
                method:'POST',
                json:true,
                body:userInfo,
            };
            request(options, function (error, response, body) {
                console.log(body);
                if (!error && response.statusCode == 200) {
                    var data = body;
                    var user={username:data.data.user_name,userId:data.data.token};
                    console.log("---------------user-------------:",user);
                    config.RESTAPI.username = user.username;
                    config.RESTAPI.userToken = user.userId;
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
        config.RESTAPI.username = user.username;
        console.log("serializeUser-----------------", user.userId);
        done(null, user.username);
    });

    //Deserializa
    passport.deserializeUser(function (username, done) {
        // var user = {userId:1,username:"yuqing",password:"yuqing"};
        // if(username == user.username)
        // {
        //     return done(null, user);
        // }
        // else
        // {
        //     return done(new Error("用户名密码错误"),null);
        // }
        var options = {
            url: "http://localhost:8091/user/" + username,
            headers: {
                "apikey": config.RESTAPI.apikey,
                "usertoken": config.RESTAPI.userToken,
                "username": username,
                "User-Agent": "request"
            },
            method:"GET"
        };
        request(options, function (error, response, body) {
            console.log("deserializeUser-----------------");
            if (!error && response.statusCode == 200) {
                var user = body;
                // console.log(user);
                done(null, user);
            } else {
                done(error, null);
            }
        });
    });

};
