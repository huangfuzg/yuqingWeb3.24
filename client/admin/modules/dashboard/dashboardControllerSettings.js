"use strict";
CQ.mainApp.dashboardController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/static/admin/modules/error/pages/dashboard.html",
            controller: "dashboardController",
            permission:'3'
        });
}]);