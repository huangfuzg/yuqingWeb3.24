"use strict";
angular.module('dkService',['commons'])
    .factory('DKFac', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.getDK_community = $resource(CQ.variable.RESTFUL_URL + "community_detection", parseResource.params, parseResource.actions);
        factories.getDK_opinion = $resource(CQ.variable.RESTFUL_URL + "opinion_mining", parseResource.params, parseResource.actions);        
        factories.getDK_method = $resource(CQ.variable.RESTFUL_URL + "strategy_search", parseResource.params, parseResource.actions);        
        return factories;
    }])
    .factory("DKFacService",['DKFac', 'RestService', '$http',function(DKFac, RestService,$http) {
        var factories = {};
        factories.getDK_community = function(params) {
            return RestService.get(DKFac.getDK_community, params);
        };
        factories.getDK_opinion = function(params) {
            return RestService.get(DKFac.getDK_opinion, params);
        };
        factories.getDK_method = function(params) {
            return RestService.get(DKFac.getDK_method, params);
        };
        factories.UpdateMethod = function(data) {
            return $http.post("http://118.190.133.203:8899/yqdata/strategy_save", data);
        };
        return factories;
    }])
    .factory('PGFac', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.getPG_data = $resource(CQ.variable.RESTFUL_URL + "score_search", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("PGFacService",['PGFac', 'RestService', '$http',function(PGFac, RestService,$http) {
        var factories = {};
        factories.getPG_data = function(params) {
            return RestService.get(PGFac.getPG_data, params);
        };
        factories.UpdatePG = function(data) {
            return $http.post("http://118.190.133.203:8899/yqdata/score_save", data);
        };
        return factories;
    }])