"use strict";
CQ.mainApp.usergroupmanageController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('usergroupmanage', {
            url: "/usergroupmanage",
            templateUrl: "/static/admin/modules/usergroupmanage/pages/usergroupmanage.html",
            controller: "usergroupmanageController",
            permission:'3'
        });

}]);