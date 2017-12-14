"use strict";

angular.module('systemsettingService',['commons'])
    // .factory('UserattrService', ['$http', function($http){
    //     var factories = {};
    //     factories.getUserattrData = function() {
    //         return $http.get("http://118.190.133.203:8899/yqdata/user_attr");
    //     };
    //     return factories;
    // }])
    .factory('Userattr', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.userattrData = $resource(CQ.variable.RESTFUL_URL + "user_attr", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("UserattrService",['Userattr', 'RestService', function(Userattr, RestService) {
        var factories = {};
        factories.getUserattrData = function(params) {
            return RestService.get(Userattr.userattrData, params);
        };
        return factories;
    }])
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