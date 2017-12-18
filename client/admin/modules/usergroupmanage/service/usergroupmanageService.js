"use strict";

angular.module('usergroupmanageService',['commons'])
    .factory("addGroupService", ["$http", function($http) {
        var factories = {};
        // flush data every 30s
        /*factories.flushData = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "monitor/flush", data);
        };*/
        factories.addGroup = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "groupmessage", data);
            //return $http.post("http://118.190.133.203:8100/yqdata/senmassage/addmsg", data);
        };
        return factories;
    }])