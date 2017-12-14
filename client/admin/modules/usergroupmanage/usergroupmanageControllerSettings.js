"use strict";
CQ.mainApp.usergroupmanageController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('usergroupmanage', {
            url: "/usergroupmanage",
            templateUrl: "/static/admin/modules/usergroupmanage/pages/usergroupmanage.html",
            controller: "usergroupmanageController",
            permission:'3'
        })
        .state("viewUserController", {
                url:"/viewUser/:userName",
                templateUrl: "/static/modules/usermanagement/pages/viewUser.html",
                controller: "usergroupmanageController"
            })
        .state("manageTopicController", {
                url:"/manageTopic",
                templateUrl: "/static/modules/systemsetting/pages/manageTopic.html",
                controller: "usergroupmanageController"
            })

}]);