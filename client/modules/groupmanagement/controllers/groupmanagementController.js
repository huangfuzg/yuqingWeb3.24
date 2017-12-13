"use strict";
CQ.mainApp.groupmanagementController
    .controller('groupmanagementController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
        //$rootScope.usermanagementController = true;
        console.log("groupmanagementController started");
       
        $http({
            method:"get",
            url:"/static/assets/data/group.json"
        }).then(function(res){
            $scope.data=res.data.data;
            console.log($scope.data);
        });
        $scope.showwhich = function()
        {
        	$scope.show1=true;
        }
    }]);