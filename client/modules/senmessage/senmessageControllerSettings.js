"use strict";
CQ.mainApp.senmessageController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("senmessageController", {
                url:"/senmessages",
                templateUrl: "/static/modules/senmessage/pages/senmessage.html",
                controller: "senmessageController"
            });
    }]);