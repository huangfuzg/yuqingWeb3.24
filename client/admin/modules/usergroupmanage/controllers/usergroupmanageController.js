"use strict";
CQ.mainApp.usergroupmanageController
   .controller('usergroupmanageController', ['$scope', '$rootScope', '$state','$http','ngDialog',function($scope, $rootScope,$state,$http,ngDialog){
    $rootScope.usergroupmanageController = true;
    console.log("usergroupmanageController started");
    $http({
            method:"get",
            url:"/static/assets/data/group.json"
        }).then(function(res){
            $scope.data=res.data;
            console.log($scope.data);
        });
    // $scope.showUserattr = function(d)
    // {
    // 	$state.go("viewUserController",{userName:d}); 
    //          console.log(d);
    // }
    $scope.mangroup = function()
    {
    	$state.go("usermanage");
    }
    $scope.addgroup = function()
    {
        ngDialog.open(
            {
                template: '/static/admin/modules/usergroupmanage/pages/addGroup.html',
                controller: 'addGroup',
                width:"20%",
                scope:$scope
            });
    }
}])
   .controller("addGroup", ["$rootScope","$scope","ngDialog","notice",function($rootScope, $scope, ngDialog, notice) {
        console.log("addGroup","start!!!");
    }]);