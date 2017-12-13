"use strict";
angular.module("headerService", ['commons'])
    .factory("headerFac", ['$resource', 'parseResource', function ($resource, parseResource) {
        var factories = {};
        factories.getUnread = $resource(CQ.variable.RESTFUL_URL+"notreadlist", parseResource.params, parseResource.actions);
        factories.getUnreadNum = $resource(CQ.variable.RESTFUL_URL+"unreadnum", parseResource.params, parseResource.actions);
        // factories.getUnreadNum = $resource("http://118.190.133.203:8100/yqdata/unreadnum", parseResource.params, parseResource.actions);

        return factories;
    }])
    .factory("headerService", ["headerFac", "RestService", function(headerFac, RestService) {
        var factories = {};
        factories.getUnread = function(params) {
            return RestService.get(headerFac.getUnread,params,true);
        }
        factories.getUnreadNum = function(params) {
            return RestService.get(headerFac.getUnreadNum,params,true);
        }

        return factories;
    }]);
