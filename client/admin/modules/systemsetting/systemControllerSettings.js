"use strict";
CQ.mainApp.systemsettingController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("adminroleSettingController", {
                url:"/userattr/:userName",
                templateUrl: "/static/admin/modules/systemsetting/pages/roleSetting.html",
                controller: "adminroleSettingController"
            });    
}]);
