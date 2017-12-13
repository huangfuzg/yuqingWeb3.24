"use strict";
CQ.mainApp.systemsettingController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("roleSettingController", {
                url:"/userattr/:userName",
                templateUrl: "/static/modules/systemsetting/pages/roleSetting.html",
                controller: "roleSettingController"
            });    
}]);
