"use strict";
CQ.mainApp.usermanageController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('usermanage', {
            url: "/usermanage",
            templateUrl: "/static/admin/modules/usermanage/pages/usermanage.html",
            controller: "usermanageController",
            permission:'3'
        })
        .state('gviewUserController', {
            url: "/viewUser/:userName",
            templateUrl: "/static/admin/modules/usermanage/pages/viewUser.html",
            controller: "gviewUserController",
            permission:'3'
        })

}]);