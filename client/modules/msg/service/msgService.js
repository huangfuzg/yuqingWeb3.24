"use strict";
angular.module("msgService", ["commons"])
    .factory("msgFac", ['$resource', 'parseResource', function ($resource, parseResource) {
        var factories = {};
        factories.sendMsg = $resource(CQ.variable.RESTFUL_URL+"send_user_msg", parseResource.params, parseResource.actions);
        factories.pushMsg = $resource(CQ.variable.RESTFUL_URL+"pushmsg", parseResource.params, parseResource.actions);
        // factories.sendMsg = $resource("http://118.190.133.203:8100/yqdata/send_user_msg", parseResource.params, parseResource.actions);
        factories.pushAlertMsg = $resource(CQ.variable.RESTFUL_URL+"pull_table", parseResource.params, parseResource.actions);
        // factories.showdetailMsg = $resource("http://118.190.133.203:8100/yqdata/showmsgdetail", parseResource.params, parseResource.actions);
        factories.deluserMsg = $resource(CQ.variable.RESTFUL_URL+"delusermsg", parseResource.params, parseResource.actions);
        factories.showdetailMsg = $resource(CQ.variable.RESTFUL_URL+"showmsgdetail", parseResource.params, parseResource.actions);
        factories.getuser = $resource(CQ.variable.RESTFUL_URL+"send_user_msg_ui", parseResource.params, parseResource.actions);
        factories.readMsg = $resource(CQ.variable.RESTFUL_URL+"isread",parseResource.params,parseResource.actions);
        return factories;
    }])
    .factory("msgService", ["msgFac", "RestService", function(msgFac, RestService) {
        var factories = {};
        factories.sendMsg = function(params) {
            return RestService.create(msgFac.sendMsg,params);
        }
        factories.pushMsg = function(params) {
            return RestService.get(msgFac.pushMsg,params);
        }
        factories.readMsg = function(params) {
            return RestService.get(msgFac.readMsg,params);
        }
        factories.deluserMsg = function(params) {
            return RestService.create(msgFac.deluserMsg,params);
        }
        factories.getuser = function(params) {
            return RestService.get(msgFac.getuser,params);
        }
        factories.showdetailMsg = function(params) {
            return RestService.get(msgFac.showdetailMsg,params);
        }
        factories.pushAlertMsg = function(params) {
            return RestService.get(msgFac.pushAlertMsg,params);
        }

        return factories;
    }]);
