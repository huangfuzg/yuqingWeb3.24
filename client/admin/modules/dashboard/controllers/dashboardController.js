"use strict";
CQ.mainApp.dashboardController
   .controller('dashboardController', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.dashboardController = true;
    $scope.test = 'test';
    $scope.$watch('test',function(newValue,oldValue){
        console.log(newValue);
    });
    console.log("dashboardController started");
}]);