"use strict";
CQ.mainApp.systemsettingController
    .controller("roleSettingController", ["$rootScope", "$scope","$stateParams","UserattrService","$http","notice","ngDialog",function ($rootScope, $scope,$stateParams,UserattrService,$http,notice,ngDialog) {
            // $scope.$watch($rootScope.curentUser,function(newValue,oldValue){
            //  $scope.curentUser = newValue;
            //  console.log($scope.curentUser);
            // });
            $(function () {
                //比较简洁，细节可自行完善
                $('#uploadSubmit').click(function () {
                    var data = new FormData($('#uploadForm')[0]);
                    $.ajax({
                        url: 'xxx/xxx',
                        type: 'POST',
                        data: data,
                        async: false,
                        cache: false,
                        contentType: false,
                        processData: false,
                        success: function (data) {
                            console.log(data);
                            if(data.status){
                                console.log('upload success');
                            }else{
                                console.log(data.message);
                            }
                        },
                        error: function (data) {
                            console.log(data.status);
                        }
                    });
                });

            })
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
            UserattrService.getUserattrData().then(function(res){
            console.log(res);
            $scope.userdata=res;
            $scope.fusername=res.user_account;
            $scope.pwd = res.user_passwd;
            $scope.frealname=res.real_name;
            $scope.femail=res.email;
            $scope.ftel=res.phone_num;
            $scope.fgroup=res.user_group_id;
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
            $scope.validatepwd = function(){
            	if(password_encode($scope.valpwd)===$scope.pwd)
            	{
            		console.log("666");
            		ngDialog.open(
	                {
	                    template: '/static/modules/systemsetting/pages/changepwd.html',
	                    controller: 'changePwd',
	                    appendClassName: "ngdialog-theme-details",
	                    width:"100%",
	                    scope:$scope
	                });
            	}
            	else
            	{
            		notice.notify_info("您好","密码验证未通过！请重试","",false,"","");
            	}
            }
            // $scope.validatepwd = function(){
            //     if($('#pwd').val()==="yuqing")
            //     {
            //         $scope.changed6=true;
            //         $scope.pwdyes=false;
            //     }
            //     else{
            //         $scope.pwd=true;
            //     }
            // }
            // $scope.savepwd = function(){
            //     if($('#input6').val()===$('#input7').val()){
            //         $scope.changed6=false;
            //         $scope.pwdyes=true;
            //         $('#pwd').val("");
            //         $('#input6').val("");
            //         $('#input7').val("");
            //     }
            // }
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
        console.log("roleSettingController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("monitor app start!!!");
                App.runui();
            }
        });    
   }])
	.controller("changePwd", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
    	$http, ngDialog, notice) {
		console.log("change pwd");
		$scope.submitpwd = function()
		{
			if($scope.add.password!=$scope.add.repassword)
            {
                $scope.notsame=true;
                notice.notify_info("您好","两次输入密码不一致！请重试","",false,"","");
            }
            else
            {
            	
            }
		}
	}]);