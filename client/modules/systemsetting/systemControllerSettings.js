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
                url:"/roleSetting",
                templateUrl: "/static/modules/systemsetting/pages/roleSetting.html",
                controller: "roleSettingController"
            });
}]);