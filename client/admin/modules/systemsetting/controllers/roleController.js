"use strict";
CQ.mainApp.systemsettingController
    .controller("adminroleSettingController", ["$rootScope", "$scope","$stateParams","$http",'notice','adminattrService',function ($rootScope, $scope,$stateParams,$http,notice,adminattrService) {
         adminattrService.getUserattrData().then(function(res){
            console.log(res.data.data);
            $scope.userdata=res.data.data;
            $scope.fusername=$scope.userdata.user_account;
            $scope.pwd = $scope.userdata.user_passwd;
            $scope.frealname=$scope.userdata.real_name;
            $scope.femail=$scope.userdata.email;
            $scope.ftel=$scope.userdata.phone_num;
            $scope.fgroup=$scope.userdata.user_group_id;
            console.log($scope.pwd);
            });
            $scope.changename = function(){
                $scope.changed1 = true;
            }
            $scope.changername = function(){
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
            $scope.changetel = function(){
                $scope.changed6 = true;
            }  
            $scope.saveattr = function(){
                var cons={};
                var postData=[];
                $scope.userAttr=[];
                if($scope.username||$scope.realname||$scope.email||$scope.tel)
                {
                    console.log("5555");
                    if($scope.username){
                        $scope.userAttr.user_account=$scope.username;
                    }
                    else{
                        $scope.userAttr.user_account=$scope.fusername;
                    }
                    if($scope.realname){
                        $scope.userAttr.real_name=$scope.realname;
                    }
                    else{
                        $scope.userAttr.real_name=$scope.frealname;
                    }
                    if($scope.email){
                        $scope.userAttr.email=$scope.email;
                    }
                    else{
                        $scope.userAttr.email=$scope.femail;
                    }
                    if($scope.tel){
                        $scope.userAttr.phone_num=$scope.tel;
                    }
                    else{
                        $scope.userAttr.phone_num=$scope.ftel;
                    }
                    $scope.userAttr.user_id=$scope.userdata.user_id;
                    $scope.userAttr.user_group_id=$scope.userdata.user_group_id;
                    $scope.userAttr.user_passwd=$scope.userdata.user_passwd;
                    $scope.userAttr.user_role_id=$scope.userdata.user_role_id;
                    $scope.userAttr.topic_kws=$scope.userdata.topic_kws;
                    $scope.userAttr.img_url=$scope.userdata.img_url;
                    $scope.userAttr.user_logintime=$scope.userdata.user_logintime;
                    console.log($scope.userAttr);
                    postData.push($scope.userAttr);
                    cons.postData=postData;
                    // UserattrService.updUserAttr(cons).then(function(res){
                    //     console.log(res);
                    //     notice.notify_info("您好！", " 用户属性被更新！" ,"",false,"","");
                    // },function(err){
                    //     console.log(err);
                    //      notice.notify_info("您好！", " 用户属性更新失败！请重试" ,"",false,"","");
                    // });
                    
                }
                else
                {
                     notice.notify_info("您好！", "没有属性被更新！" ,"",false,"","");
                }
                console.log($scope.province+$scope.city+$scope.district);
                $scope.fdistrict=$scope.province+$scope.city+$scope.district;
                $scope.changed1 = false;
                $scope.changed2 = false;
                $scope.changed3 = false;
                $scope.changed4 = false;
                $scope.changed5 = false;
                $scope.changed6 = false;
            }   
        console.log("adminroleSettingController", "start!!!");      
   }]);