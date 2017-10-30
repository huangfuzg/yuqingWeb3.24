"use strict";
CQ.mainApp.monitorController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("monitorController", {
                url:"/monitor/:dataType/:siteId",
                templateUrl: "/static/modules/monitor/pages/monitor.html",
                controller: "monitorController"
            })
            .state("sentopicAnalysController", {
                url:"/topicAnalys/:topicId",
                templateUrl: "/static/modules/monitor/pages/topicAnalys.html",
                controller: "sentopicAnalysController"
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