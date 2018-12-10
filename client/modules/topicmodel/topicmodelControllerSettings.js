"use strict";
CQ.mainApp.topicmodelController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("topicmodelController", {
                url:"/topicmodel/:exam_type/:exam_period",
                templateUrl: "/static/modules/topicmodel/pages/topicmodel3.html",
                controller: "topicmodelController"
            })
            // .state("topicController1", {
            //     url:"/topicmodel",
            //     templateUrl: "/static/modules/topicmodel/pages/topicmodel1.html",
            //     controller: "modelController1"
            // })
            // .state("topictime", {
            //     url:"/topicmodel/events",
            //     templateUrl: "/static/modules/topicmodel/pages/topictime.html",
            //     params:{"subject":null},
            //     controller: "topictimeController"
            // })
           // .state("topicmodelController", {
           //      url:"/topicmodel/model",
           //      templateUrl: "/static/modules/topicmodel/pages/topicmodel3.html",
           //      params:{"event":null},
           //      controller: "topicmodelController"
           //  })
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
