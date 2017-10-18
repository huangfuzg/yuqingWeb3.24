"use strict";
angular.module("yuqingsearchService", ["commons"])
	.factory("SearchFac", ['$resource', 'parseResource', function ($resource, parseResource) {
		var factories = {};

        factories.getRuleData = $resource(CQ.variable.RESTFUL_URL + "settopic", parseResource.params, parseResource.actions);
        
        factories.searchData = $resource(CQ.variable.RESTFUL_URL + "retrieval", parseResource.params, parseResource.actions);

        factories.advanceSearch = $resource(CQ.variable.RESTFUL_URL + "retrieval", parseResource.params, parseResource.actions);
        return factories;
	}])
	.factory("SearchFacService", ["SearchFac", "RestService", function(SearchFac, RestService) {
		var factories = {};

        factories.getRuleData = function(params) {
            return RestService.get(SearchFac.getRuleData,params);
        }

        factories.searchData = function(data) {
            return RestService.create(SearchFac.searchData,data);
        }

        factories.advanceSearch = function(data) {
            return RestService.create(SearchFac.advanceSearch,data);
        }
		return factories;
	}]);
