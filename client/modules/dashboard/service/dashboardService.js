"use strict";

angular.module('dashboardService',['commons'])
    .factory("Chart", ['$resource', 'parseResource', function ($resource, parseResource) {
        var factories = {};
        factories.dashboardData = $resource(CQ.variable.RESTFUL_URL + "dashboard", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("ChartService",['Chart', 'RestService', function(Chart, RestService) {
        var factories = {};
        factories.getDashboardData = function(params) {
            return RestService.get(Chart.dashboardData, params);
        };
        return factories;
    }]);