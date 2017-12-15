"use strict";
CQ.mainApp.msgController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('showController', {
                url: "/msg/show/",
                templateUrl: "/static/modules/msg/pages/show.html",
                controller: "showController"
            })
            .state('detailController', {
                params:{"msgid":null},
                url: "/msg/show/msgdetail/",
                templateUrl: "/static/modules/msg/pages/msgdetail.html",
                controller: "msgdetailController"
            })
            .state('msgController', {
                url: "/msg/",
                templateUrl: "/static/modules/msg/pages/send.html",
                controller: "msgController"
            });
    }]);