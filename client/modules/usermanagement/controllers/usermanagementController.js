"use strict";
CQ.mainApp.usermanagementController
    .controller('usermanagementController', ['$scope', '$rootScope', '$state','$http','ngDialog', function($scope, $rootScope, $state,$http,ngDialog){
        //$rootScope.usermanagementController = true;
        console.log("usermanagementController started");
        $scope.pagelist = [];
        $scope.selectList = [];
        $scope.pages = 10;
        $scope.newpage = $scope.pages > 5 ? 5:$scope.pages;       
        $scope.data=[];
        $http({
            method:"get",
            url:"/static/assets/data/user.json"
        }).then(function(res){
            $scope.data=res.data;
            $scope.search = function()
            {
                console.log($scope.data);
                $scope.result = [];
                angular.forEach($scope.data, function(array){
                    console.log(array.username);
                    if(array.username===$scope.searchname)
                    {
                        $scope.data = array;
                        console.log($scope.data);
                    }
                });
         
                console.log($scope.result);

            }
        },function(res) {
            console.log(res);
        });
        $scope.adduser = function()
        {
            ngDialog.open(
                {
                    template: '/static/modules/usermanagement/pages/addUser.html',
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
        $scope.selectBoxChange = function(d){
            if(d.selected)
            {
                $scope.selectList.push(d.id);
            }
            else
            {
                for(var index = 0; index < $scope.selectList.length; index++)   
                {
                    if($scope.selectList[index] == d.id)
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
        $scope.addUser = function()
        {
            $scope.jsonData={};
            $scope.jsonData.username = $scope.detailData.username;
            $scope.jsonData.password = $scope.detailData.password;
            $scope.jsonData.group = $scope.detailData.group;
            $scope.jsonData.auth = $scope.detailData.auth;
            console.log($scope.jsonData);
            $http.post("http://localhost:8091/static/assets/data/user.json", $scope.jsonData).then(function(res) {
                console.log(res);
            });
        };

        $scope.remove = function(d)
        {
            $scope.user_id = d.auth;
            console.log($scope.topic_id);
            ngDialog.open(
            {
                template: '/static/modules/usermanagement/pages/deleteUser.html',
                controller: 'deleteTopic',
                width:"10%",
                scope:$scope
            });
        };
        
    }])
    .controller("addUser", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
        $http, ngDialog, notice) {
        console.log("addUser");
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
    }])
    .controller("deleteUser", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
        $http, ngDialog, notice) {
        console.log("delete topic");
        $scope.deleteUser = function() {
            $scope.removeUrl = $scope.baseUrl + "/deletetopic";
            $http({
                params: {topicId : $scope.topic_id, userId : $scope.userId},
                url: $scope.removeUrl,
                method: 'get',
            })
            .success(function(data, status, headers, config){
                ngDialog.closeAll();
                notice.notify_info("您好！","话题删除成功！","",false,"","");
                $scope.reload($scope.topic_id,"delete");
                // setTimeout(function(){
                //     window.location.reload("index.html#/userSetting");
                // },2000);
            })
            .error(function(error){
                notice.notify_info("您好！", "操作失败，请重试！" ,"",false,"","");
            });
        };
    }]);