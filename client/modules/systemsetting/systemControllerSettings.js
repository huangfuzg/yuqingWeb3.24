"use strict";
CQ.mainApp.systemsettingController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("userSettingController", {
                url:"/userSetting",
                templateUrl: "/static/modules/systemsetting/pages/userSetting.html",
                controller: "userSettingController"
            })
            .state("roleSettingController", {
                url:"/userattr/:userName",
                templateUrl: "/static/modules/systemsetting/pages/roleSetting.html",
                controller: "roleSettingController"
            })
            .state("manageTopicController", {
                url:"/manageTopic",
                templateUrl: "/static/modules/systemsetting/pages/manageTopic.html",
                controller: "manageTopicController"
            });
}]);
