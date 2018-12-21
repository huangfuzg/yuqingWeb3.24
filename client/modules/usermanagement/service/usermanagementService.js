"use strict";
angular.module("usermanagementService", ["commons"])
// 	.factory("PostUserService", ["$http", function($http) {
//         var factories = {};
//         // flush data every 30s
//         factories.flushData = function(data) {
//             return $http.post(CQ.variable.RESTFUL_URL + "monitor/flush", data);
//         };

//         factories.addUser = function(data) {
//             return $http.post("/static/assets/data/user.json", data);
//             //return $http.post("http://118.190.133.203:8100/yqdata/senmassage/addmsg", data);
//         };

//         return factories;
//     }]);
	.factory('Watchattr', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.userattrData = $resource(CQ.variable.RESTFUL_URL + "watch_user_attr", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("WatchattrService",['Watchattr', 'RestService', function(Watchattr, RestService) {
        var factories = {};
        factories.getUserattrData = function(params) {
            return RestService.get(Watchattr.userattrData, params);
        };
        return factories;
    }])
    .factory('Viewuser', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.userData = $resource(CQ.variable.RESTFUL_URL + "showuserlist", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("ViewuserService",['Viewuser', 'RestService', function(Viewuser, RestService) {
        var factories = {};
        factories.getUserData = function(params) {
            return RestService.get(Viewuser.userData, params);
        };
        return factories;
    }])
    .factory("gaddUserService", ["$http", function($http) {
        var factories = {};
        // flush data every 30s
        /*factories.flushData = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "monitor/flush", data);
        };*/
        factories.addUser = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "usersignup", data);
            //return $http.post("http://118.190.133.203:8100/yqdata/senmassage/addmsg", data);
        };
        return factories;
    }])
    .factory('UpuserattrService', ['$http', function($http){
        var factories={};
        factories.updUserAttr = function(data){
            //return $http.post(CQ.variable.RESTFUL_URL + "modifyuserinfo", data);
            return $http.post(CQ.variable.RESTFUL_URL + "modifyuserinfo", data);
        };
        return factories;
    }])
    .factory('deleteUserService', ['$http', function($http){
        var factories={};
        factories.delUser = function(data){
            return $http.post(CQ.variable.RESTFUL_URL + "deleteuser", data);
        };
        return factories;
    }])