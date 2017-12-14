"use strict";
CQ.mainApp.systemsettingController
    .controller("roleSettingController", ["$rootScope", "$scope","$stateParams","UserattrService","WatchattrService","$http",function ($rootScope, $scope,$stateParams,UserattrService,WatchattrService,$http) {
            //$rootScope.fusername = "yuqing123";
            $scope.pwdyes=true;
            $scope.fbirth = "1949-10-01";
            $scope.femail = "123456@xjtu.com";
            $scope.fwork = "西安交通大学";
            $scope.fdistrict = "陕西省西安市碑林区";
            // $scope.$watch($rootScope.curentUser,function(newValue,oldValue){
            //  $scope.curentUser = newValue;
            //  console.log($scope.curentUser);
            // });
            UserattrService.getUserattrData().then(function(res){
             //$rootScope.fusername = res.user_logintime;
             console.log(res);
             $scope.fusername=res.user_account;
            });
            // WatchattrService.getUserattrData({username:'sxuser'}).then(function(res) {
            //     console.log(res);
            // });
            // $http.get("http://118.190.133.203:8899/yqdata/watch_user_attr",{username:"sxuser"}).then(function(data){
            //     console.log(data.data.data);
            //     $rootScope.fusername=data.data.data.user_account;
            // });
            $(".form_datetime")
                .datepicker({autoclose:true, format: 'yyyy-mm-dd'});
            $scope.changename = function(){
                $scope.changed1 = true;
            }
            $scope.changebirth = function(){
                $scope.changed2 = true;
            }
            $scope.changeemail = function(){
                $scope.changed3 = true;
            }
            $scope.changework = function(){
                $scope.changed4 = true;
            }
            $scope.changedistrict = function(){
                $scope.changed5 = true;
            }
            $scope.validatepwd = function(){
                if($('#pwd').val()==="yuqing")
                {
                    $scope.changed6=true;
                    $scope.pwdyes=false;
                }
                else{
                    $scope.pwd=true;
                }
            }
            $scope.savepwd = function(){
                if($('#input6').val()===$('#input7').val()){
                    $scope.changed6=false;
                    $scope.pwdyes=true;
                    $('#pwd').val("");
                    $('#input6').val("");
                    $('#input7').val("");
                }
            }
            $scope.saveattr = function(){
                if($('#input1').val())
                {
                    $rootScope.fusername = $scope.username;
                    //$rootScope.fusername = $('#input1').val();
                }
                if($('#input2').val())
                {
                    $rootScope.fbirth = $('#input2').val();
                }
                if($('#input3').val())
                {
                    $rootScope.femail = $('#input3').val();
                }
                if($('#input4').val())
                {
                    $rootScope.fwork = $('#input4').val();
                }
                //$rootScope.fdistrict = $('.province cxselect option:selected').text();
                //$rootScope.fdistrict = $('.province cxselect').val();
                $rootScope.fdistrict = $(".province cxselect").find("option:selected").text();
                //+$('.city cxselect option:selected').text()+$('.area cxselect option:selected').text();
                console.log($rootScope.fdistrict);
                $scope.changed1 = false;
                $scope.changed2 = false;
                $scope.changed3 = false;
                $scope.changed4 = false;
                $scope.changed5 = false;
            }   
        console.log("roleSettingController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("monitor app start!!!");
                App.runui();
            }
        });
            
            
   }]);