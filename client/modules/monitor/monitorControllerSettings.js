"use strict";
CQ.mainApp.monitorController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("monitorController", {
                url:"/monitor/:dataType/:siteId",
                templateUrl: "/static/modules/monitor/pages/monitor.html",
                controller: "monitorController"
            });
            // .state("cardPost", {
            //     url:"/monitor/:siteId",
            //     templateUrl: "/static/modules/monitor/pages/monitor.html",
            //     controller: "manageSettingController"
            // })
            // .state("", {
            //     url:"",
            //     templateUrl: "/static/modules/monitor/pages/monitor.html",
            //     controller: "manageSettingController"
            // })
            // .state("", {
            //     url:"",
            //     templateUrl: "/static/modules/monitor/pages/monitor.html",
            //     controller: "manageSettingController"
            // })
    }]);