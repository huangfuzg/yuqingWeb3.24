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
            .state('gmsgController', {
                url: "/msg/",
                templateUrl: "/static/admin/modules/msg/pages/send.html",
                controller: "msgController",
                params:{"sendUsers":[]}
            });
    }]);