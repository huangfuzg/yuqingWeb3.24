"use strict";
CQ.mainApp.usermanageController
    .controller('usermanageController', ['$scope', '$rootScope','$http','ngDialog','$state', function($scope, $rootScope,$http,ngDialog,$state){
    $rootScope.usermanageController = true;
    $scope.selectList=[];
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
            $scope.time=$scope.alluser[1].user_logintime;
            console.log($scope.time);
            console.log(CurentTime($scope.time*1000));
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
            $scope.showbtn=true;
            if($scope.selectList.indexOf(d.user_id)==-1)
            {
               $scope.selectList.push(d.user_id);
                console.log(d);
            } 
        }    
        else
        {
            $scope.showbtn=false;
            for(var index = 0; index < $scope.selectList.length; index++)   
            {
                if($scope.selectList[index] == d.user_id)
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
        $scope.alluser1.forEach(function(d){
            console.log(d);
            d.selected = $scope.allselected;
            $scope.selectBoxChange(d);
        });
    };
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

    $scope.showUserattr = function(d)
    {
         $state.go("gviewUserController",{userName:d.user_account}); 
         console.log(d);  
            $rootScope.viewtemp=d;
             //console.log($rootScope.viewtemp)
    };
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
                var postData = [];
                // $scope.add.password=password_encode($scope.add.password);
                // console.log($scope.add);
                cons.user_account=$scope.add.username;
                cons.user_passwd=password_encode($scope.add.password);
                cons.user_role_id=$scope.selectauth;
                cons.user_group_id=~~($scope.selectgroup);
                //$scope.userData.logintime = CurentTime();
                cons.real_name="";
                cons.topic_kwd=[];
                cons.phone_num="";
                cons.email="";
                cons.user_logintime="";
                cons.img_url=$rootScope.regdata.head_img;
                console.log(cons);
                ngDialog.closeAll();
                //notice.notify_info("您好","添加成功！","",false,"","");
                addUserService.addUser(cons).then(function(res) {
                    console.log(res);
                    if(res.data.success===false){
                         notice.notify_info("您好","用户名已经存在！","",false,"","");
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
    .controller("gviewUserController", ["$rootScope","$scope","ngDialog","notice",'WatchuserService',function($rootScope, $scope, ngDialog, notice,WatchuserService) {
        console.log("gviewUser","start!!!");
        console.log($rootScope.viewtemp);
        WatchuserService.getUserattrData({user_name:$scope.viewtemp.user_account}).then(function(res){
            console.log(res);
            $scope.fusername=res.user_account;
            $scope.pwd = res.user_passwd;
            $scope.frealname=res.real_name;
            $scope.femail=res.email;
            $scope.ftel=res.phone_num;
            $scope.fgroup=res.user_group_id;
        })
        //再来一次上面的显示fusername和存储
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
                if($scope.username||$scope.realname||$scope.email||$scope.tel||$scope.work)
                {
                    console.log("5555");
                    if($scope.username){
                        $scope.userAttr.username=$scope.username;
                    }
                    else{
                        $scope.userAttr.username=$scope.fusername;
                    }
                    if($scope.realname){
                        $scope.userAttr.realname=$scope.realname;
                    }
                    else{
                        $scope.userAttr.realname=$scope.frealname;
                    }
                    if($scope.email){
                        $scope.userAttr.email=$scope.email;
                    }
                    else{
                        $scope.userAttr.email=$scope.femail;
                    }
                    if($scope.tel){
                        $scope.userAttr.tel=$scope.tel;
                    }
                    else{
                        $scope.userAttr.tel=$scope.ftel;
                    }
                    if($scope.work){
                        $scope.userAttr.work=$scope.work;
                    }
                    else{
                        $scope.userAttr.work=$scope.fwork;
                    }
                    console.log($scope.userAttr);
                    postData.push($scope.userAttr);
                    cons.postData=postData;
                    // UpuserattrService.updUserAttr(cons).then(function(res){
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

    }])
    .controller("deleteUser", ["$rootScope","$scope","ngDialog","notice",function($rootScope, $scope, ngDialog, notice) {
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
            // var cons = {

            // }
            // userService.delUser(cons).then(function(res){
            //     console.log(res);
            //     }
            // )
        }
    }]);