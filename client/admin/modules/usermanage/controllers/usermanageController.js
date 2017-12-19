"use strict";
CQ.mainApp.usermanageController
    .controller('usermanageController', ['$scope', '$rootScope','$http','ngDialog','notice','$state','DeleteUserService', function($scope, $rootScope,$http,ngDialog,notice,$state,DeleteUserService){
    $rootScope.usermanageController = true;
    $scope.selectList=[];
    $scope.selectobj=[];
    function CurentTime(d)
        { 
            var now = new Date(d);
           
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
           
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
           
            var clock = year + "-";
           
            if(month < 10)
                clock += "0";
           
            clock += month + "-";
           
            if(day < 10)
                clock += "0";
               
            clock += day + " ";
           
            if(hh < 10)
                clock += "0";
               
            clock += hh + ":";
            if (mm < 10) clock += '0'; 
            clock += mm; 
            return clock; 
            console.log(clock);
        } 
    $http({
            method:"get",
            url:CQ.variable.RESTFUL_URL + "groupmessage",
        }).then(function(res){
            $scope.group=res.data.data;
            console.log($scope.group);
        });
    $http({
            method:"get",
            url:CQ.variable.RESTFUL_URL + "showuserlist",
        }).then(function(res){
            $scope.alluser=res.data.data;
            $scope.alluser1=res.data.data;
            for (var i = $scope.alluser.length - 1; i >= 0; i--) {
                $scope.alluser[i].user_logintime=CurentTime($scope.alluser[i].user_logintime*1000)
            }
            console.log($scope.alluser);
        }); 

    $scope.selectGroup = function(){
        console.log($('#select1').val());
        var temp=[];
        console.log($scope.selectedGroup);
        console.log($scope.alluser1.length);
        for (var i = 0; i < $scope.alluser1.length; i++) {
            if($scope.alluser1[i].user_group_id==$scope.selectedGroup)
            {
                console.log($scope.alluser1[i]);
                temp.push($scope.alluser1[i]);
                //$scope.alluser.splice(i,1);
                //console.log($scope.alluser);
            } 
        }
        console.log(temp);
        $scope.alluser=temp;
        if($('#select1').val()==='全部')
            $scope.alluser=$scope.alluser1;
        
    }
    
    $scope.selectBoxChange = function(d){
            if(d.selected)
            {
                //$scope.showbtn=true;
                if($scope.selectList.indexOf(d.user_account)==-1)
                {
                   $scope.selectList.push(d.user_account);
                   $scope.selectobj.push(d);
                    console.log(d);
                } 
            }    
            else
            {
                //$scope.showbtn=false;
                for(var index = 0; index < $scope.selectList.length; index++)   
                {
                    if($scope.selectList[index] == d.user_account)
                    {
                        $scope.selectList.splice(index,1);
                        $scope.selectobj.splice(index,1);
                        break;
                    } 
                }
            }
            
            console.log($scope.selectList);
            console.log($scope.selectobj);
        };
        $scope.sendmul = function(){
            if($scope.selectobj.length>0){

                $state.go('gmsgController',{'sendUsers':$scope.selectobj.map(d=>d.user_account)});
            }
            else{
                notice.notify_info("您好！", "未选择操作对象！" ,"",false,"","");
            }
        }
         $scope.delmul = function(){
            if($scope.selectList.length>0){
                //console.log($scope.dellistmul);
                 var cons = {
                        user_name:$scope.selectList
                    };
                    //cons.user_account = d.user_account;
                    DeleteUserService.delUser(cons).then(function(res){
                        console.log(res);
                        if(res.data.success===true){
                        notice.notify_info("您好！", "删除成功！" ,"",false,"","");
                        ngDialog.closeAll();
                        }
                        else{
                            notice.notify_info("您好！", "删除失败！" ,"",false,"","");
                        }
                    })
            }
            else{
                 notice.notify_info("您好！", "未选择操作对象！" ,"",false,"","");
            }
        }
    $scope.selectAll = function()
    {
        $scope.alluser1.forEach(function(d){
            console.log(d);
            d.selected = $scope.allselected;
            $scope.selectBoxChange(d);
        });
    };
    $scope.editUser = function(user)
        {
            $scope.editCurUser = user;
            ngDialog.open({
                template: '/static/admin/modules/usermanage/pages/editUser.html',
                controller: 'editUser',
                appendClassName: "ngdialog-theme-details",
                width:"100%",
                scope:$scope
            });
        }
    $scope.delsin = function(d){
        $scope.temp=d;
        // console.log($scope.temp);
        ngDialog.open(
            {
                template: '/static/admin/modules/usermanage/pages/deleteUser.html',
                controller: 'deleteUser',
                appendClassName: "ngdialog-theme-details",
                width:"100%",
                scope:$scope
            });
    }
    $scope.adduser = function()
    {
        ngDialog.open(
            {
                template: '/static/admin/modules/usermanage/pages/addUser.html',
                controller: 'addUser',
                appendClassName: "ngdialog-theme-details",
                width:"100%",
                scope:$scope
            });
    }
    $scope.sendMessage = function(userList)
        {
            console.log(userList);
            $state.go('gmsgController',{'sendUsers':userList.map(d=>d.user_account)});
        }
    $scope.editTopic = function()
    {
         $state.go("manageTopicController");
    };
    console.log("usermanageController started");
    }])
    .controller("addUser", ["$rootScope","$scope","ngDialog","notice","$http","addUserService",function($rootScope, $scope, ngDialog, notice,$http,addUserService) {
        console.log("addUser","start!!!");
        $scope.selectgroup=2;
        $scope.selectauth=1;
        $http({
                method:"get",
                url:CQ.variable.RESTFUL_URL + "usersignupui",
            }).then(function(res){
                $rootScope.regdata=res.data.data;
                console.log($rootScope.regdata);
            });
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
        function CurentTime()
        { 
            var now = new Date();
           
            var year = now.getFullYear();       //年
            var month = now.getMonth() + 1;     //月
            var day = now.getDate();            //日
           
            var hh = now.getHours();            //时
            var mm = now.getMinutes();          //分
           
            var clock = year + "-";
           
            if(month < 10)
                clock += "0";
           
            clock += month + "-";
           
            if(day < 10)
                clock += "0";
               
            clock += day + " ";
           
            if(hh < 10)
                clock += "0";
               
            clock += hh + ":";
            if (mm < 10) clock += '0'; 
            clock += mm; 
            return clock; 
            console.log(clock);
        } 
        $scope.submituser=function()
        {
            console.log($scope.add.password);
            console.log($scope.add.repassword);
            if($scope.add.password!=$scope.add.repassword)
            {
                $scope.notsame=true;
                notice.notify_info("您好","两次输入密码不一致！请重试","",false,"","");
            }
            else
            {
                console.log(password_encode($scope.add.password));
                var cons = {};
                cons.user_account=$scope.add.username;
                cons.user_passwd=password_encode($scope.add.password);
                cons.user_role_id=$scope.selectauth;
                cons.user_group_id=~~($scope.selectgroup);
                cons.real_name=$scope.add.realname;
                cons.topic_kwd=[];
                cons.phone_num=$scope.add.phonenum;
                cons.email=$scope.add.email;
                cons.user_logintime="";
                cons.img_url=$rootScope.regdata.head_img;
                console.log(cons);
                ngDialog.closeAll();
                //notice.notify_info("您好","添加成功！","",false,"","");
                addUserService.addUser(cons).then(function(res) {
                    console.log(res);
                    if(res.data.success===false){
                         notice.notify_info("您好","添加失败！","",false,"","");
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
        }
    }])
    .controller("editUser", ["$rootScope", "$scope", "$http", "ngDialog", "notice","upuserattrService",function($rootScope, $scope, 
        $http, ngDialog, notice,upuserattrService) {
        console.log($scope.editCurUser);
        console.log("modify User!!!!");
        $scope.edituser = function()
        {
            var cons={};
            cons.user_account=$scope.editCurUser.user_account;
            //cons.user_passwd=$scope.editCurUser.user_passwd;
            cons.user_role_id=$scope.editCurUser.user_role_id;
            cons.user_group_id=$scope.editCurUser.user_group_id;
            cons.real_name=$scope.editCurUser.real_name;
            cons.topic_kws=$scope.editCurUser.topic_kws;
            cons.phone_num=$scope.editCurUser.phone_num;
            cons.email=$scope.editCurUser.email;
            cons.user_logintime="";
            cons.img_url=$scope.editCurUser.img_url;
            console.log(cons);
            upuserattrService.updUserAttr(cons).then(function(res){
                console.log(res);
                if(res.data.success=true){
                    ngDialog.closeAll();
                    notice.notify_info("您好","用户属性修改成功！","",false,"","");
                }
            })
        }
    }])
    .controller("deleteUser", ["$rootScope","$scope","ngDialog","notice",'userService',function($rootScope, $scope, ngDialog, notice,userService) {
        console.log("deleteUser","start!!!");
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
        $scope.delete = function(d)
        {
            console.log("deleting user");
            d.password=password_encode(d.password);
            console.log(d);
            $scope.dellist=[];
            $scope.dellist.push(d.user_account);
            console.log($scope.dellist);
            var cons = {
                user_name:$scope.dellist
            };
            //cons.user_account = d.user_account;
            userService.delUser(cons).then(function(res){
                console.log(res);
                if(res.data.success===true){
                notice.notify_info("您好！", "删除成功！" ,"",false,"","");
                ngDialog.closeAll();
                }
                else{
                    notice.notify_info("您好！", "删除失败！" ,"",false,"","");
                }
            })
        }
    }]);