"use strict";
CQ.mainApp.friendLinkController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("friendLinkController", {
                url:"/friendLink",
                templateUrl: "/static/modules/friendLink/pages/friendLink.html",
                controller: "friendLinkController"
            });
}]).controller('friendLinkController', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.friendLinkController = true;
    console.log("friendLinkController started");
}]);