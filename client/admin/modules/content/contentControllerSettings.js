"use strict";
CQ.mainApp.contentController
.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('content', {
            url: "/content",
            templateUrl: "/static/admin/modules/content/pages/content.html",
            controller: "contentController",
            permission:'3'
        });

}]);