"use strict";
CQ.mainApp.dashboardController
   .controller('dashboardController', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.dashboardController = true;
    console.log("dashboardController started");
}]);