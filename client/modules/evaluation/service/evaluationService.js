"use strict";
angular.module('dkService',['commons'])
    .factory('DKFac', ['$resource','parseResource',function($resource,parseResource){
        var factories = {};
        factories.getDK_community = $resource(CQ.variable.RESTFUL_URL + "community_detection", parseResource.params, parseResource.actions);
        factories.getDK_opinion = $resource(CQ.variable.RESTFUL_URL + "opinion_mining", parseResource.params, parseResource.actions);        
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
        factories.getDkData = function(params) {
            return RestService.get(DKFac.getDkData, params);
        };
        factories.upDkData = function(data){
            return $http.post(CQ.variable.RESTFUL_URL + "", data);
        };
        return factories;
    }])
    