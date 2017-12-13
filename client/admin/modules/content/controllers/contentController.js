"use strict";
CQ.mainApp.contentController
    .controller('contentController', ['$scope', '$rootScope', function($scope, $rootScope){
    $rootScope.friendLinkController = true;
    console.log("contentController started");
}]);