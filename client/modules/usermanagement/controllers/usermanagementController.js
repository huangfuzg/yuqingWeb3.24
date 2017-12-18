"use strict";
CQ.mainApp.usermanagementController
    .controller('usermanagementController', ['$scope', '$rootScope', '$state','$http','ViewuserService','ngDialog', function($scope, $rootScope, $state,$http,ViewuserService,ngDialog){
        //$rootScope.usermanagementController = true;
        console.log("usermanagementController started");
        $scope.pagelist = [];
        $scope.selectList = [];
        $scope.pages = 10;
        $scope.pageSize = 5;
        $scope.pageNum = 1;
        $scope.newpage = $scope.pages > 5 ? 5:$scope.pages;       
        $scope.data=[];
        
            ViewuserService.getUserData({user_name:$rootScope.curentUser}).then(function(res)
            {         
                console.log(res);         
                $scope.data=res; 
                // $scope.pages = Math.ceil(res.length/10);
                // $scope.newpage = Math.ceil(res.length/5);
                console.log($scope.newpage);
                for(var i=0;i<$scope.newpage;i++){
                    $scope.pagelist[i]=i+1;
                }
                for(var i = $scope.data.length - 1; i >= 0; i--) {

                $scope.data[i].user_logintime=CurentTime($scope.data[i].user_logintime*1000) 
            }
        });      
        
        
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

        $scope.showUserattr = function(d)
        {
             $state.go("viewUserController",{userName:d.user_account}); 
             console.log(d);  
                $rootScope.viewtemp=d;
                 //console.log($rootScope.viewtemp)
        };
        $scope.editTopic = function()         
        {
            $state.go("manageTopicController"); 
        };  
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
            $scope.data.forEach(function(d){
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
                    template: '/static/modules/usermanagement/pages/deleteUser.html',
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
                    template: '/static/modules/usermanagement/pages/addUser.html',
                    controller: 'addUser',
                    appendClassName: "ngdialog-theme-details",
                    width:"100%",
                    scope:$scope
                });
        }
        //打开用户属性页面
        $scope.editUser = function(user)
        {
            $scope.editCurUser = user;
            ngDialog.open({
                template: '/static/modules/usermanagement/pages/editUser.html',
                controller: 'editUser',
                appendClassName: "ngdialog-theme-details",
                width:"100%",
                scope:$scope
            });
        }
        //发送消息
        $scope.sendMessage = function(userList)
        {
            console.log(userList);
            $state.go('msgController',{'sendUsers':userList});
        }
    // $scope.selectPage = function (page) {
    //         if (page < 1 || page > $scope.pages) return;
    //         //最多显示分页数5
    //         if (page > 2) {
    //             //因为只显示5个页数，大于2页开始分页转换
    //             var newpageList = [];
    //             for (var i = (page - 3) ; i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)) ; i++) {
    //                 newpageList.push(i + 1);
    //             }
    //             $scope.pageList = newpageList;
    //         }
    //         $scope.pageNum = page;
    //         $scope.dataObj.pageNum = page;
    //         $scope.isActivePage(page);
    //         console.log("选择的页：" + page);
    //         getData();
    //     };
    //     $scope.isActivePage = function (page) {
    //         if($scope.pageNum==page){
    //             return "btn btn-primary";
    //         }else return "btn";
    //     };

    //     //上一页
    //     $scope.Previous = function () {
    //     $scope.selectPage($scope.pageNum - 1);
    //     };
    //     //下一页
    //     $scope.Next = function () {
    //     $scope.selectPage($scope.pageNum + 1);
    //     };
        
    }])
    .controller("addUser", ["$rootScope", "$scope", "$http", "ngDialog", "notice","gaddUserService",function($rootScope, $scope, 
        $http, ngDialog, notice,gaddUserService) {
        console.log("add User");
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
                $scope.userData={};
                $scope.userData.user_account=$scope.add.username;
                $scope.userData.user_passwd=password_encode($scope.add.password);
                $scope.userData.user_role_id=1;
                $scope.userData.user_group_id=$rootScope.regdata.user_group_id;
                //$scope.userData.logintime = CurentTime();
                $scope.userData.real_name="yuqing";
                $scope.userData.topic_kwd=[];
                $scope.userData.phone_num="";
                $scope.userData.email="";
                $scope.userData.user_logintime="";
                $scope.userData.img_url=$rootScope.regdata.head_img;
                postData.push($scope.userData);
                //cons.postData=postData;
                cons.user_account=$scope.add.username;
                cons.user_passwd=password_encode($scope.add.password);
                cons.user_role_id=1;
                cons.user_group_id=$rootScope.regdata.user_group_id;
                //$scope.userData.logintime = CurentTime();
                cons.real_name=$scope.add.realname;
                cons.topic_kwd=[];
                cons.phone_num=$scope.add.phonenum;
                cons.email=$scope.add.email;
                cons.user_logintime="";
                cons.img_url=$rootScope.regdata.head_img;
                console.log(cons);
                // ngDialog.closeAll();
                // notice.notify_info("您好","添加成功！","",false,"","");
                gaddUserService.addUser(cons).then(function(res) {
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
    .controller("deleteUser", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope, 
        $http, ngDialog, notice) {
        console.log($scope.temp);
        console.log("delete User");
        
       
    }])
    .controller("editUser", ["$rootScope", "$scope", "$http", "ngDialog", "notice","UpuserattrService",function($rootScope, $scope, 
        $http, ngDialog, notice,UpuserattrService) {
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
            UpuserattrService.updUserAttr(cons).then(function(res){
                console.log(res);
                if(res.data.success=true){
                    ngDialog.closeAll();
                    notice.notify_info("您好","用户属性修改成功！","",false,"","");
                }
            })
        }
    }])
    .controller("viewUserController", ["$rootScope", "$scope", "$http", "ngDialog", "notice","WatchattrService",function($rootScope, $scope, 
        $http, ngDialog, notice,WatchattrService) {
        console.log("viewUserController start!!!");
        console.log($rootScope.viewtemp);
        WatchattrService.getUserattrData({user_name:$scope.viewtemp.user_account}).then(function(res){
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
    .controller("managetopicController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function ($rootScope, 
    $scope, $http, ngDialog, notice) 
    {
    console.log("managetopicController", "start!!!");
    $scope.topic_id = null;
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                $scope.userId = 1;
                $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                var url = $scope.baseUrl+"/adminmanagetopic";
                //?userId=" + $scope.userId;
                // var url = "/static/setup.json";
                var sites = "";
                $scope.page = 0;
                $http.get(url).success(function(data){
                    console.log(data);
                    var dic=data.data.topic;
                    $scope.topicList=[];
                    var key="sxuser";
                    var topiclist=dic[key]; 
                    console.log(topiclist);
                    if(topiclist.length!=0)
                    {
                        topiclist.forEach(function(d)
                        {
                            d.username=key;
                            sites = "";
                            d.siteLists.forEach(function(site)
                            {
                                if(sites != "")
                                {
                                    sites += ",";
                                }
                                if(site.siteName)
                                {
                                    sites += site.siteName;
                                }
                            });
                            d.sitesStr = sites;
                            $scope.topicList.push(d);
                        });
                    }
                    console.log($scope.topicList);                                               
                    $scope.topicCount = $scope.topicList.length;
                    $scope.allsites = data.data.allSites;
                    $scope.getDataByPage($scope.page);
                    
                });
                console.log("userSetting app start!!!");
                App.runui();
            }
        });

        $scope.onDragComplete = function($data,$event)
        {

        };

        $scope.onDropComplete = function($data,$event)
        {
            for(var i = 0; i < $scope.allsites.length; i++)
            {
                for(var j = 0; j < $scope.allsites[i].detail_sites.length; j++)
                {
                    if($scope.allsites[i].detail_sites[j].siteId == $data.siteId)
                    {
                        if($scope.allsites[i].detail_sites[j].selected)
                        {
                            return;
                        }
                        else
                        {
                            $scope.allsites[i].detail_sites[j].selected = true;
                            $scope.topic.siteLists.push($data);
                            return;
                        }
                    }
                }
            }
        };
        //拖动全选
        $scope.onAllDrag = function($data,$event)
        {
            //$event.stopPropagation();
            for(var i = 0; i < $scope.allsites.length; i++)
            {
                if($scope.allsites[i].siteTypeId ==$data.siteTypeId)
                {
                    $scope.allsites[i].selected = true;
                    $scope.allsites[i].detail_sites.forEach(function(d1){
                        d1.selected = $scope.allsites[i].selected;
                        $scope.checkBoxChange(d1);
                    });
                    return;
                }
            }
        };

        //全选
        $scope.onAllSelected = function(d)
        {
            d.detail_sites.forEach(function(d1){
                d1.selected = d.selected;
                $scope.checkBoxChange(d1);
            });
        }
        //删除话题
        $scope.remove = function(d)
        {
            $scope.topic_id = d.topicId;
            console.log($scope.topic_id);
            ngDialog.open(
            {
                template: '/static/modules/systemsetting/pages/deleteTopic.html',
                controller: 'deleteTopic',
                width:"10%",
                scope:$scope
            });
        };
        $scope.toggle = function (scope) {
            scope.toggle();
        };
        //修改、添加话题
        $scope.save = function()
        {
            console.log($scope.topic);
            $scope.jsonData = {};
            $scope.jsonData.userId = $scope.userId;
            // if($scope.topic.topicId)
            //     $scope.jsonData.topicId = $scope.topic.topicId;
            $scope.jsonData.topicName = $scope.topic.topicName;
            // $scope.topic.topicKeywords._and = $scope.topic.topicKeywords.and.toString().split(',');
            // $scope.topic.topicKeywords._or = $scope.topic.topicKeywords.or.toString().split(',');
            $scope.jsonData.topicKeywords = $scope.topic.topicKeywords;
            for(var i = 0; i < $scope.topic.topicKeywords.length; i++)
            {
                $scope.topic.topicKeywords[i] = $scope.topic.topicKeywords[i].str.split(',');
            }
            console.log($scope.topic.topicKeywords);
            $scope.jsonData.sites = $scope.topic.siteLists;
            $scope.jsonData = JSON.stringify($scope.jsonData);
            console.log($scope.jsonData);
            $http({
                url: $scope.submitUrl,
                method: 'post',
                data: $scope.jsonData,
            }).success(function(data, status, headers, config){
                if(data.success == false) {
                    //alert("操作失败!即将为您跳转...");
                    notice.notify_info("您好！", "操作失败，请重试！" ,"",false,"","");
                }
                else if(data.success == true){
                    notice.notify_info("您好！", "话题操作成功！" ,"",false,"","");
                    if(!!data.data)
                    {
                        $scope.topic.topicId = data.data;
                        console.log($scope.topic);
                    }
                    $scope.reload($scope.topic,"save");
                }
                // setTimeout(function(){
                //     window.location.reload("index.html#/userSetting");
                // },2000);
            })
            .error(function(){
                //alert("未知的错误!即将为您跳转...");
                notice.notify_info("您好！", "服务器出错！！" ,"",false,"","");
            });
        }
        $scope.openBatchPage = function()
        {
            ngDialog.open(
            {
                template: '/static/modules/systemsetting/pages/batchKeywords.html',
                controller: 'batchKeywords',
                appendClassName: "ngdialog-theme-form",
                width: "100%",
                scope: $scope
            }
            );
        }
        //添加与关键词组
        $scope.addAndKeywords = function()
        {
            var andKeywords = [];
            $scope.topic.topicKeywords.push(andKeywords);
            console.log($scope.topic.topicKeywords);
        }
        //删除与关键词组
        $scope.delAndKeywords = function(i)
        {
            $scope.topic.topicKeywords.splice(i,1);
        }
        //关键词显示
        $scope.toStr = function(kw)
        {
            if(!(kw instanceof Array))
            {
                return console.error("kw is not a array");
            }
            var result = kw[0].toString();
            for(var i = 1; i < kw.length; i++)
            {
                result += ";" + kw[i].toString();
            }
            return result;
        }
        //添加话题
        $scope.newTopic = function()
        {
            $scope.modelName = "添加话题";
            $scope.topic = {topicName:"",topicKeywords:[],siteLists:[]};
            $scope.topic.topicKeywords.push([]);
            $scope.allsites.forEach(function(d1)
            {
                d1.selected = false;
                d1.detail_sites.forEach(function(d){
                    d.selected = false;
                });
            });
            console.log($scope.topic);
            $scope.topicNameEnable = false;
            $scope.submitUrl  = $scope.baseUrl + "/addtopic";
        }
        //选择站点
        $scope.checkBoxChange = function(d,typesite)
        {
            if(typesite)
            {
                update(typesite);
            }
            if(d.selected)
            {
                for(var index = 0; index < $scope.topic.siteLists.length; index++)
                {
                    if($scope.topic.siteLists[index].siteId == d.siteId)
                        return;
                }
                $scope.topic.siteLists.push({"siteId":d.siteId,"siteName":d.siteName});
            }
            else
            {
                for(var index = 0; index < $scope.topic.siteLists.length; index++)
                {
                    if($scope.topic.siteLists[index].siteId == d.siteId)
                        $scope.topic.siteLists.splice(index, 1);
                }
            }
            console.log($scope.topic.siteLists);
        }
        function update(d)
        {
            d.selected = true;
            for(var i = 0; i < d.detail_sites.length; i++)
            {
                d.selected = (d.selected && d.detail_sites[i].selected);
            }
        }
        //刷新
        $scope.reload = function(d,opretion)
        {
            if(opretion == "save" && $scope.modelName == "添加话题")
            {
                d.sitesStr = "";
                for(var i = 0; i < d.siteLists.length-1; i++)
                {
                    d.sitesStr += (d.siteLists[i].siteName + ',');
                }
                d.sitesStr += d.siteLists[i].siteName;
                $scope.topicList.push(d);
                $scope.pageData.push(d);
                if($scope.pageData.length > $scope.pageSize)
                {
                    $scope.getDataByPage(++$scope.page);
                }
                else
                {
                    $scope.getDataByPage($scope.page);
                }
                $("#myModal").modal('hide');
                $scope.topicCount++;
                return true;
            }
            else if(opretion == "save" && $scope.modelName == "修改话题")
            {
                d.sitesStr = "";
                for(var i = 0; i < d.siteLists.length-1; i++)
                {
                    d.sitesStr += (d.siteLists[i].siteName + ',');
                }
                d.sitesStr += d.siteLists[i].siteName;
                for(var i = 0; i < $scope.topicList.length; i++)
                {
                    if($scope.topicList[i].topicName == d.topicName)
                    {
                       $scope.topicList[i] = d;
                       $scope.pageData[i%$scope.pageSize] = d;
                       $("#myModal").modal('hide');
                       return true; 
                   }
               }
           }
           else if(opretion == "delete")
           {
                for(var i = 0; i < $scope.topicList.length; i++)
                {
                    if($scope.topicList[i].topicId == d)
                    {
                        $scope.topicList.splice(i,1);
                        $scope.getDataByPage($scope.page);
                        $scope.topicCount--;
                        return true; 
                    }
                }
            }
            return false;
        }
        //分页
        $scope.getDataByPage = function(page)
        {
            $scope.maxPage = $scope.maxPage || 0;
            $scope.page = $scope.page || 0;
            if(page >= 0 && page<= $scope.maxPage)
            {
                $scope.page = page;
            }
            $scope.pageSize = 5.0;
            $scope.maxPage = Math.ceil($scope.topicList.length/$scope.pageSize) - 1;
            $scope.pageData = $scope.topicList.slice($scope.pageSize * $scope.page, $scope.pageSize * ($scope.page + 1));
        };
        //修改话题
        $scope.changeTopic = function(d)
        {
            console.log(d);
            $scope.modelName = "修改话题";
            $scope.topicNameEnable = true;
            $scope.topic = JSON.parse(JSON.stringify(d)) || {};
            for(var i = 0; i < $scope.topic.topicKeywords.length; i++)
            {
                $scope.topic.topicKeywords[i].str = $scope.topic.topicKeywords[i].toString();
            }
            console.log($scope.topic);
                    // console.log(new d.constructor());
                    $scope.submitUrl = $scope.baseUrl + "/modifytopic";
                    $scope.allsites.forEach(function(d3){
                        console.log(d3);
                        d3.selected = false;
                        d3.detail_sites.forEach(function(d1)
                        {
                            d1.selected = false;
                            $scope.topic.siteLists.forEach(function(d2){
                                if(d2.siteId == d1.siteId)
                                {
                                    d1.selected = true;
                                }
                            });
                        });
                        update(d3);
                    });
        };
    }]);