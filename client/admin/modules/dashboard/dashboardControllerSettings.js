"use strict";
CQ.mainApp.dashboardController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('dashboard', {
            url: "/dashboard",
            templateUrl: "/static/admin/modules/dashboard/pages/dashboard.html",
            controller: "dashboardController",
            permission:'1'
        });
}]);