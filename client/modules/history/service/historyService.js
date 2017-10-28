"use strict";

angular.module('historyService',['commons']);
    // .factory("TopicFac", ['$resource', 'parseResource', function ($resource, parseResource) {
    //     var factories = {};
    //     factories.topicData = $resource(CQ.variable.RESTFUL_URL + "topic_statistics", parseResource.params, parseResource.actions);
    //     factories.hotTopicData = $resource(CQ.variable.RESTFUL_URL + "hot_topic", parseResource.params, parseResource.actions);
    //     factories.topicAnaly = $resource(CQ.variable.RESTFUL_URL + "topic_analysis", parseResource.params, parseResource.actions);
    //     return factories;
    // }])
    // .factory("TopicFacService",['TopicFac', 'RestService', function(TopicFac, RestService) {
    //     var factories = {};
    //     factories.getTopicData = function(params) {
    //         return RestService.get(TopicFac.topicData, params);
    //     };
    //     factories.getHotTopicData = function(params) {
    //         return RestService.get(TopicFac.hotTopicData, params);
    //     };
    //     factories.getTopicAnalyData = function(params) {
    //         return RestService.get(TopicFac.topicAnaly, params);
    //     };
    //     return factories;
    // }]);