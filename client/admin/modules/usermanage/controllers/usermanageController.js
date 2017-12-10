"use strict";
CQ.mainApp.usermanageController
    .controller('usermanageController', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.usermanageController = true;
    console.log("usermanageController started");
}]);