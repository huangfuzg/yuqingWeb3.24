"use strict";
CQ.mainApp.usermanageController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('usermanage', {
            url: "/usermanage",
            templateUrl: "/static/admin/modules/usermanage/pages/usermanage.html",
            controller: "usermanageController",
            permission:'3'
        });

}]);