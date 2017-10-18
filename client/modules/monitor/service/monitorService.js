"use strict";

angular.module('monitorService',['commons'])
    .factory("MonitorFac", ['$resource', 'parseResource', function ($resource, parseResource) {
        var factories = {};
        // get monitor data
        factories.monitorData = $resource(CQ.variable.RESTFUL_URL + "monitor/all", parseResource.params, parseResource.actions);
        // load data
        factories.loadData = $resource(CQ.variable.RESTFUL_URL + "monitor/load", parseResource.params, parseResource.actions);
        // get post detail data
        factories.getPostDetail = $resource(CQ.variable.RESTFUL_URL + "senmassage/addui", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("MonitorFacService",['MonitorFac', 'RestService', function(MonitorFac, RestService) {
        var factories = {};
        factories.getMonitorData = function(params) {
            return RestService.get(MonitorFac.monitorData, params);
        };
       
        factories.getLoadData = function(params) {
            return RestService.get(MonitorFac.loadData, params);
        };

        factories.getPostDetail = function(params) {
            return RestService.get(MonitorFac.getPostDetail, params);
        };

        return factories;
    }])
    .factory("PostDataService", ["$http", function($http) {
        var factories = {};
        // flush data every 30s
        factories.flushData = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "monitor/flush", data);
        };

        factories.addSenmessage = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "senmassage/addmsg", data);
        };

        return factories;
    }]);