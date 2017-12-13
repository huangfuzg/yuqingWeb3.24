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