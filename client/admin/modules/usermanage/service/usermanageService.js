"use strict";

angular.module('usermanageService',['commons'])
    .factory("addUserService", ["$http", function($http) {
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
    .factory('userFac', ['$resource','parseResource', function($resource,parseResource){
        var factories={};
        factories.deluserMsg = $resource(CQ.variable.RESTFUL_URL+"", parseResource.params, parseResource.actions);
        factories.showUser = $resource(CQ.variable.RESTFUL_URL+"", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("userService", ["userFac", "RestService",'$http',function(userFac, RestService,$http) {
        var factories = {};
        factories.delUser = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "deleteuser", data);
        }
        factories.showUserInfo = function(params){
            return RestService.get(userFac.showUser, params);
        }
        return factories;
    }])
    .factory('Watchattr', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.userattrData = $resource(CQ.variable.RESTFUL_URL + "watch_user_attr", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("WatchuserService",['Watchattr', 'RestService', function(Watchattr, RestService) {
        var factories = {};
        factories.getUserattrData = function(params) {
            return RestService.get(Watchattr.userattrData, params);
        };
        return factories;
    }])
    .factory('upuserattrService', ['$http', function($http){
        var factories={};
        factories.updUserAttr = function(data){
            return $http.post(CQ.variable.RESTFUL_URL + "modifyuserinfo", data);
        };
        return factories;
    }])
    .factory('DeleteUserService', ['$http', function($http){
        var factories={};
        factories.delUser = function(data){
            return $http.post(CQ.variable.RESTFUL_URL + "deleteuser", data);
        };
        return factories;
    }])
