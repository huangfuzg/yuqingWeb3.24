var request = require('request');
var path = require('path');
var http = require('http');
exports.api = function (app, config) {
    app.get("/user/:username",function(request, response){
        console.log("------getuser------");
        var user = {userId:config.RESTAPI.userToken,username:config.RESTAPI.username};
        // console.log(user);
        if(user.username == request.params.username)
        {
            response.send(200,user);
        }
        else
        {
            response.send(500,"user error!!!!");
        }
    });
    app.get("/getuser",function(request, response){
        console.log("------getusername------");
        if (request.isAuthenticated()) {
            var user = {username:config.RESTAPI.username};
            console.log(user);
            response.status(200).send({data:user,code:0,success:true});
        } else {
            response.status(401).send("error：没有权限");
        }
    });
    //转发api
    app.all("/restapi*",function(req,res,next){
        console.log("----------request-----------");
        // console.log(req);
        if (!req.isAuthenticated())
        {
            res.status(401).send("error：没有权限");
        }
        else
        {
            var header = req.header;
            console.log(config.restServer.baseUrl);
            header.host = config.restServer.host;
            var apipath = req.url.slice(8);
            var url = config.restServer.baseUrl+apipath;
            var jsonData = null;
            if(req.method == "GET")
            {
                jsonData = req.query;
            }
            else if(req.method == "POST")
            {
                jsonData = req.body;
            }
            jsonData.userId = config.RESTAPI.userToken;
            console.log(jsonData);
            var options={
                url:url,
                // host:config.restServer.host,
                // port:config.restServer.port,
                // path:path.join(config.restServer.basePath,apipath),
                method:req.method,
                json:true,
                headers:header,
                body:jsonData,
            };
            // req.pipe(request(options,function(error, response, body){
            //     console.error(error);
            //     console.log(JSON.parse(body));
            //     if (!error && response.statusCode == 200) {
            //         console.log(response);
            //         var info = JSON.parse(body);
            //         console.log(info);
            //         res.send(200, info);
            //     }
            // }));
            var client = request(options,function(error,response,body){
                // res.status(response.statusCode);
                // res.send(response.statusCode,body)
            });
            // client.on('data',function(data){
            //     console.log(data);
            // });
            client.pipe(res);
        }
        // next();
    });
};
