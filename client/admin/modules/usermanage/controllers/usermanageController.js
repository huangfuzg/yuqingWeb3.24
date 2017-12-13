"use strict";
CQ.mainApp.usermanageController
    .controller('usermanageController', ['$scope', '$rootScope','$http','ngDialog','$state', function($scope, $rootScope,$http,ngDialog,$state){
    $rootScope.usermanageController = true;
    $http({
            method:"get",
            url:"/static/assets/data/group.json"
        }).then(function(res){
            $scope.data=res.data;
            console.log($scope.data);
        });
    $scope.remove = function(d){
        ngDialog.open(
            {
                template: '/static/admin/modules/usermanage/pages/deleteUser.html',
                controller: 'deleteUser',
                width:"10%",
                scope:$scope
            });
    }
    $scope.adduser = function()
    {
        ngDialog.open(
            {
                template: '/static/admin/modules/usermanage/pages/addUser.html',
                controller: 'addUser',
                width:"20%",
                scope:$scope
            });
    }
    $scope.showUserattr = function(d)
    {
         $state.go("viewUserController",{userName:d}); 
         console.log(d);  
    };
    $scope.editTopic = function()
    {
         $state.go("manageTopicController");
    };
    console.log("usermanageController started");
    }])
    .controller("addUser", ["$rootScope","$scope","ngDialog","notice",function($rootScope, $scope, ngDialog, notice) {
        console.log("addUser","start!!!");
        var password_encode = function(pwd)
        {
            var secret = CQ.variable.SECRET,
            secret_arr = secret.split(''),
            hash = CryptoJS.SHA256(pwd+secret).toString().split(''),
            char_index = c=>c-'a';
            secret_arr.forEach(c=>{
                if(hash[char_index(c)])
                {
                    hash[char_index(c)] = c;
                }
            });
            return hash.join('');
        }
        $scope.submituser=function()
        {
            console.log(password_encode($scope.add.password));
            // PostDataService.addSenMessage(cons).then(function(res) {
            //     console.log(res);
            //     ngDialog.closeAll();
            //     notice.notify_info("您好","添加成功！","",false,"","");
            // },function(err) {
            //     console.log(err);
            //     notice.notify_info("您好","添加失败！请重试","",false,"","");
            // });
        }
    }])
    .controller("deleteUser", ["$rootScope","$scope","ngDialog","notice",function($rootScope, $scope, ngDialog, notice) {
        console.log("deleteUser","start!!!");
    }]);