"use strict";
CQ.mainApp.usergroupmanageController
   .controller('usergroupmanageController', ['$scope', '$rootScope', '$state','$http','ngDialog',function($scope, $rootScope,$state,$http,ngDialog){
    $rootScope.usergroupmanageController = true;
    console.log("usergroupmanageController started");
    $scope.selectList=[];
    $http({
            method:"get",
            url:CQ.variable.RESTFUL_URL + "groupmessage",
        }).then(function(res){
            $scope.data=res.data.data;
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
                appendClassName: "ngdialog-theme-details",
                width:"100%",
                scope:$scope
            });
    }
    $scope.selectBoxChange = function(d){
        if(d.selected)
        {
            $scope.showbtn=true;
            if($scope.selectList.indexOf(d.group_id)==-1)
            {
               $scope.selectList.push(d.group_id);
                console.log(d);
            } 
        }    
        else
        {
            $scope.showbtn=false;
            for(var index = 0; index < $scope.selectList.length; index++)   
            {
                if($scope.selectList[index] == d.group_id)
                {
                    $scope.selectList.splice(index,1);
                    break;
                } 
            }
        }
        console.log($scope.selectList);
    };
    $scope.selectAll = function()
    {
        $scope.data.forEach(function(d){
            console.log(d);
            d.selected = $scope.allselected;
            $scope.selectBoxChange(d);
        });
    };
}])
   .controller("addGroup", ["$rootScope","$scope","ngDialog","notice",'addGroupService',function($rootScope, $scope, ngDialog, notice,addGroupService) {
        console.log("addGroup","start!!!");
        $scope.submitgroup = function()
        {
            console.log($scope.newgroup_name);
            //console.log($scope.newgroup_info);
            var cons={};
            cons.group_name=$scope.newgroup_name;
            addGroupService.addGroup(cons).then(function(res) {
                    console.log(res);
                    if(res.data.success===false){
                         notice.notify_info("您好","组名已经存在！","",false,"","");
                    }
                    else
                    {
                        ngDialog.closeAll();
                        notice.notify_info("您好","添加成功！","",false,"","");
                    }
                },function(err) {
                    console.log(err);
                    notice.notify_info("您好","添加失败！请重试","",false,"","");
                });

        }
    }]);