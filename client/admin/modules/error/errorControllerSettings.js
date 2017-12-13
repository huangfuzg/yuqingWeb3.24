"use strict";
CQ.mainApp.errorController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('error', {
            url: "/error/:errorcode",
            templateUrl: "/static/modules/error/pages/404.html",
            controller: "errorController"
        });

}]);