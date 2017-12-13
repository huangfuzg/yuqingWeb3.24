"use strict";
CQ.mainApp.reportController
    .controller('reportlistController', ['$scope', '$rootScope', '$http','ngDialog', function($scope, $rootScope, $http,ngDialog){

    }])
    .controller("reportdesignController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
        $http, ngDialog, notice) {
        
    }])
    .controller("reportController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
        $http, ngDialog, notice) {
        
    }])
    .controller("styleController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
        $http, ngDialog, notice) {
        $scope.formData = $scope.ngDialogData;
        console.log($scope.formData);
    }]);