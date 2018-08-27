"use strict";
CQ.mainApp.topicmodelController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("topicmodelController", {
                url:"/topicmodel",
                templateUrl: "/static/modules/topicmodel/pages/topicmodel.html",
                controller: "topicmodelController"
            })
            // .state("roleSettingController", {
            //     url:"/userattr/:userName",
            //     templateUrl: "/static/modules/systemsetting/pages/roleSetting.html",
            //     controller: "roleSettingController"
            // })
            // .state("manageTopicController", {
            //     url:"/manageTopic",
            //     templateUrl: "/static/modules/topicmodel/pages/manageTopic.html",
            //     controller: "manageTopicController"
            // });
}]);
