"use strict";
CQ.mainApp.systemsettingController
.controller("manageTopicController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function ($rootScope, 
    $scope, $http, ngDialog, notice) {
    console.log("manageTopicController", "start!!!");
    $scope.topic_id = null;
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController){
                $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                $scope.userId = 1;
                var url1 = $scope.baseUrl+"/adminmanagetopic";
                //var url1 = "http://118.190.133.203:8100/yqdata/adminmanagetopic";

                var sites = "";
                $scope.page = 0;
                $http.get(url1).success(function(data){
                    console.log(data);
                    var dic=data.data.topic;
                    $scope.topicList=[];
                    for (var key in dic){
                        var topiclist=dic[key];
                        if(topiclist.length!=0)
                        {
                            topiclist[0].rowspan=topiclist.length;
                            topiclist.forEach(function(d){
                                d.username=key;
                                sites = "";
                                d.siteLists.forEach(function(site){
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
                    };
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
        $scope.onDropComplete1 = function($data,$event)
        {
            for(var i = 0; i < $scope.allsites1.length; i++)
            {
                for(var j = 0; j < $scope.allsites1[i].detail_sites.length; j++)
                {
                    if($scope.allsites1[i].detail_sites[j].siteId == $data.siteId)
                    {
                        if($scope.allsites1[i].detail_sites[j].selected)
                        {
                            return;
                        }
                        else
                        {
                            $scope.allsites1[i].detail_sites[j].selected = true;
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
            $scope.user_name=d.user_name;
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
                url: $scope.submitUrl,dataTypeLists,
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

        $scope.addTopics = function()
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
            $scope.jsonData.user_name=$scope.postuser;
            $scope.jsonData = JSON.stringify($scope.jsonData);
            console.log($scope.jsonData);
            $http({
                url: $scope.submitUrl,
                //url:"http://118.190.133.203:8100/yqdata/batchsettopic",
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
                        console.log("ZYZ");
                        console.log($scope.topic);
                    }
                    $("#myModal2").modal('hide');
                    window.location.reload("index.html#/manageTopic");
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
            console.log($scope.allsites);
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

        //添加话题
        $scope.newTopics = function()
        {
            $scope.postuser=[];
            $scope.senduser = null;
            var tmp={};
            var url1 = $scope.baseUrl+"/batchsetui";
            $http.get(url1).success(function(data) {
                $scope.senduser = data.data;
                console.log("zyz1");
                console.log($scope.senduser);
                $scope.senduser2=[];
                $scope.senduser.forEach(function(s){
                    var a={user_:s};
                    $scope.senduser2.push(a);
                });
                console.log($scope.senduser2);
                $('#users').selectize({
                    persist: false,
                    createOnBlur: true,
                    create: false,
                    sortField: {
                        field: 'text',
                        direction: 'asc'
                     },
                    valueField:'user_',
                    labelField:'user_',
                    //options:[{'user_':'yuqing'},{'user_':'admin'}],
                    options:$scope.senduser2,
                    onItemAdd:function (v) {
                        $scope.postuser.push(v);
                        // console.log($scope.recid);
                    },
                    onItemRemove:function (v) {
                        var index = ($scope.postuser .indexOf(v));
                        $scope.postuser.splice(index,1);
                        // console.log($scope.recid);
                    }
                });

                console.log("zyz2");
                console.log(data);
                $scope.grouplist=data.data;
                $scope.modelName = "批量添加话题";
                $scope.topic = {topicName:"",topicKeywords:[],siteLists:[]};
                $scope.topic.topicKeywords.push([]);
                console.log("allSites");
                console.log($scope.allsites);
                $scope.allsites.forEach(function(d1)
                {
                    d1.selected = false;
                    d1.detail_sites.forEach(function(d){
                        d.selected = false;
                    });
                });
                console.log($scope.topic);
                $scope.topicNameEnable = false;
                $scope.submitUrl  = $scope.baseUrl + "/batchsettopic";
            });
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
                d.siteLists = d.siteLists || [];
                d.sitesStr = d.siteLists.map(d=>d.siteName).join(',');
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
                    if($scope.topicList[i].topicId == d.topicId)
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
                    console.log(i);
                    if(i!=$scope.topicList.length-1&&$scope.topicList[i].rowspan&&(!$scope.topicList[i+1].rowspan)){
                        console.log("1");
                        $scope.topicList[i+1].rowspan=$scope.topicList[i].rowspan-1;
                    }
                    else if(!$scope.topicList[i].rowspan){
                        console.log("2");
                        var j=i-1;
                        while(!$scope.topicList[j].rowspan){
                            j--;
                        }
                        console.log(j);
                        $scope.topicList[j].rowspan--;
                    }

                   $scope.topicList.splice(i,1);
                   console.log("Here");
                   console.log($scope.topicList);
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
            for(var i=0;i<$scope.pageData.length;i++)
            {
                if(i==$scope.pageData.length-1||
                    $scope.pageData[i].username!=$scope.pageData[i+1].username)
                {
                    $scope.pageData[0].rowspan=i+1;
                    break;
                }

            }

            console.log($scope.pageData);
        };
        //修改话题
        $scope.changeTopic = function(d){
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
                    // $scope.submitUrl = "http://118.190.133.203:8100/yqdata/modifytopic";
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
            }])
.controller("deleteTopic", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope,
    $http, ngDialog, notice) {
    console.log("delete topic");
    $scope.deleteTopic = function() {
        $scope.removeUrl = $scope.baseUrl + "/deletetopicother";
        $http({
            params: {topicId : $scope.topic_id, user_name : $scope.user_name},
            //url:"http://118.190.133.203:8100/yqdata/deletetopicother",
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
.controller("deleteMyTopic_user", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope,
    $http, ngDialog, notice) {
    console.log("delete topic");
    $scope.deleteMyTopic = function() {
        $scope.removeUrl = $scope.baseUrl + "/deletetopic";
        $http({
            params: {topicId : $scope.topic_id},
            //url:"http://118.190.133.203:8100/yqdata/deletetopic",
            url: $scope.removeUrl,
            method: 'get',
        })
        .success(function(data, status, headers, config){
            ngDialog.closeAll();
            notice.notify_info("您好！","话题删除成功！","",false,"","");
            $scope.reload($scope.topic_id,"delete");
                // setTimeout(function(){
                //     window.location.reload("index.html/userSetting");
                // },2000);
            })
        .error(function(error){
            notice.notify_info("您好！", "操作失败，请重试！" ,"",false,"","");
        });
    };
}])
.controller("batchKeywords", ["$scope",function($scope) {
    console.log("batchKeywords");
    $scope.must_keywords = {"keywords":"","info":"关键词组1","error":{"null":"不能为空","pattern":"关键词之间需以英文,隔开"}};
    $scope.should_keywords = {"keywords":"","info":"关键词组2","error":{"null":"不能为空","pattern":"关键词之间需以英文,隔开"}};
    $scope.combination = function()
    {
        var keywords1 = $scope.must_keywords.keywords.split(","),
        keywords2 = $scope.should_keywords.keywords.split(",");
        for(var i = 0; i < keywords1.length; i++)
        {
            for(var j = 0; j < keywords2.length; j++)
            {
                var newKeywords = [keywords1[i],keywords2[j]];
                newKeywords.str = newKeywords.toString();
                $scope.topic.topicKeywords.push(newKeywords);
            }
        }
        console.log($scope.topic.topicKeywords);
        $scope.closeThisDialog();
    }
}])

// 以下是usersetting.html对应的控制器,这是被systemcontrollersetting决定的
.controller("userSettingController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function ($rootScope,
    $scope, $http, ngDialog, notice)
    {
    console.log("userSettingController", "start!!!");
    $scope.topic_id = null;
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                $scope.userId = 1;
                $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                var url = $scope.baseUrl+"/settopic";
                //?userId=" + $scope.userId;
                // var url = "/static/setup.json";
                var sites = "";
                $scope.page = 0;
                $http.get(url).success(function(data){
                    data.data.topicData.forEach(function(d){
                        sites = "";
                        d.siteLists.forEach(function(site){
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
                    });
                    $scope.topicList = data.data.topicData;
                    $scope.topicCount = $scope.topicList.length;
                    $scope.allsites = data.data.allSites;
                    $scope.getDataByPage($scope.page);
                });
                console.log("userSetting app start!!!");
                App.runui();
            }
        });
        $scope.changetype1 = function()
        {
            if($scope.flag1 == 0)
            {
                document.getElementById("type2").style.display="inline-block";
                $scope.flag1 = 1;
            }
            else
            {
                if($scope.topic1.type1 == '')
                {
                    $scope.flag1 = 0;
                    document.getElementById("type2").style.display="none";
                    document.getElementById("type3").style.display="none";
                }
                else
                {
                    $scope.topic1.type2 = ""
                    document.getElementById("type2").style.display="inline-block";
                    document.getElementById("type3").style.display="none";

                }
            }
        }

        $scope.changetype2 = function()
        {
            // $scope.modelName = "添加话题"
            if($scope.topic1.type2 == '')
                {
                    document.getElementById("type3").style.display="none";
                }
            else
            {
                $scope.usedmodel = "nomodel";
                document.getElementById("type3").style.display="inline-block";

            }

           $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                //htt:p//118.190.133.203:8100/yqdata/deletetopic
                var url = $scope.baseUrl+"/template_show";
                // var url="http://192.168.30.115:8001/yqdata/template_show";
                // console.log(url)
                // console.log($scope.topic1.type1,$scope.topic1.type2)

                if ($scope.topic1.type1 == "高考")
                {
                    $scope.type11 = 0
                }
                else if ($scope.topic1.type1 == "成考")
                {
                    $scope.type11 = 1
                }
                else if ($scope.topic1.type1 == "研考")
                {
                    $scope.type11 = 2
                } 

                if ($scope.topic1.type2 == "之前")
                {
                    $scope.type22 = 0
                }
                else if ($scope.topic1.type2 == "期间")
                {
                    $scope.type22 = 1
                }
                else if ($scope.topic1.type2 == "之后")
                {
                    $scope.type22 = 2
                } 
             
                //var url="http://118.190.133.203:8001/yqdata/template_show";
                //?userId=" + $scope.userId;
                // var url = "/static/setup.json";
                var sites = "";
                $scope.page = 0;
                $http({
                    params: {exam_type:$scope.type11,exam_period:$scope.type22},
                    //url:"http://118.190.133.203:8100/yqdata/deletetopic",
                    url: url,
                    method: 'get',
                })
                .success(function(data, status, headers, config){
                    console.log("LZP");
                    // console.log(data);
                    data.data.topicData.forEach(function(d){
                        sites = "";
                        d.siteLists.forEach(function(site){
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
                    });
                    //$scope.topicList = data.data.topicData;
                    //console.log($scope.topicList);
                    // $scope.topicCount1 = $scope.topicList.length;
                    // $scope.allsites = data.data.allSites;\
                    $scope.pageData1 = JSON.parse(JSON.stringify(data.data.topicData)) || {};
                    //$scope.pageData1 = data.data.topicData;
                    console.log($scope.pageData1);
                })
                .error(function(){
                //alert("未知的错误!即将为您跳转...");
                notice.notify_info( "连接服务器失败！" ,"",false,"","");
            });
                // $scope.pageData = scope.pageData1
        }


        
        $scope.selectmodel = function()
        {
            // console.log($scope.allsites);
            var type11=$scope.topic1.type1;
            var type22=$scope.topic1.type2;

            // console.log($scope.topicList);
            // console.log($scope.usedmodel);
            $scope.pageData1.forEach(function(d){
                if(d.topicName==$scope.usedmodel){  //如果模板库中有和返回的usemodel相同的名称
                    $scope.topic1 = JSON.parse(JSON.stringify(d)) || {};
                    // 提取某一模板的关键字
                     //console.log($scope.topic1.topicKeywords[2].str,'hi!!') //是某个模板的关键字数量
                    for(var i = 0; i < $scope.topic1.topicKeywords.length; i++)
                    {
                        $scope.topic1.topicKeywords[i].str = $scope.topic1.topicKeywords[i].toString();
                    }
                }
            });
            // console.log($scope.topic1);
            $scope.topic1.type1=type11;
            $scope.topic1.type2=type22;
            // 这部分其实就是为了将选定模板对应的所有爬取网站选中
            // console.log($scope.topic1)
            $scope.allsites.forEach(function(d1)
            {
                d1.selected = false;
                d1.detail_sites.forEach(function(d){
                d.selected = false;
                });
            });

            $scope.allsites1 = $scope.allsites
            $scope.allsites1.forEach(function(d3){
                        // console.log(d3);
                        // d3是网站类别  d1是d3的一个子类,是该网站类别下的具体网站名称
                        d3.selected = false;
                        d3.detail_sites.forEach(function(d1)
                        {
                            d1.selected = false;
                            $scope.topic1.siteLists.forEach(function(d2){
                                if(d2.siteId == d1.siteId)
                                {
                                    d1.selected = true;
                                }
                            });
                        });
                        update(d3);//将d3更新,这样返回mymodel的时候,某个模板对应的所有站点就被选中了
                    });
        
        };
        // 将mymodel1返回的topic对象与对应的allsite应用到mymodel界面
        $scope.usemodel = function()
        {
            console.log()
            $("#myModal1").modal('hide');
            $("#myModal").modal('show');
            $scope.modelName = "添加话题"
            $('#myModal').css({'overflow-y':'scroll'});
            // console.log("hhh");
            $scope.topic=$scope.topic1;
            $scope.allsites=$scope.allsites1;
            $scope.topic1.type1 = ''
        }
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
                template: '/static/modules/systemsetting/pages/deleteMyTopic.html',
                controller: 'deleteMyTopic_user',
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

            //$scope.topic中存储的是我们选择的模板对象,具有站点\名称\id等等属性!
            console.log($scope.topic);
            $scope.jsonData = {};
            $scope.jsonData.userId = $scope.userId;
            $scope.jsonData.topicId = $scope.topic.topicId

            // if($scope.topic.topicId)
            //     $scope.jsonData.topicId = $scope.topic.topicId;
            $scope.jsonData.topicName = $scope.topic.topicName;
            // console.log($scope.topic.topicName)
            // console.log($scope.topic.siteLists)
            // $scope.topic.topicKeywords._and = $scope.topic.topicKeywords.and.toString().split(',');
            // $scope.topic.topicKeywords._or = $scope.topic.topicKeywords.or.toString().split(',');
            $scope.jsonData.topicKeywords = $scope.topic.topicKeywords;
            for(var i = 0; i < $scope.topic.topicKeywords.length; i++)
            {
                $scope.topic.topicKeywords[i] = $scope.topic.topicKeywords[i].str.split(',');
            }
            // console.log($scope.topic.topicId);
            $scope.jsonData.sites = $scope.topic.siteLists;
            $scope.jsonData = JSON.stringify($scope.jsonData);
            console.log($scope.jsonData);
            //该json数据中有:
            //{"userId":1,"topicName":"dsadasdsadffasda","topicKeywords":[["dsadsa"]],"sites":[{"siteId":4,"siteName":"腾讯教育"},{"siteId":501,"siteName":"百度搜一搜"}]}
            $http({
                url: $scope.submitUrl,
                method: 'post',
                data: $scope.jsonData,
            }).success(function(data, status, headers, config){
                // console.log("LZPP");
                // console.log($scope.jsonData);
                if(data.success == false) {
                    //alert("操作失败!即将为您跳转...");
                    notice.notify_info("您好！", "操作失败，请重试！" ,"",false,"","");
                }
                else if(data.success == true){
                    notice.notify_info("您好！", "话题操作成功！" ,"",false,"","");
                    if(!!data.data)
                    {
                        console.log("ZYZ");
                        $scope.topic.topicId = data.data.topic_id;
                        console.log($scope.topic);
                    }
                    $scope.reload($scope.topic,"save");  //可以使添加的模板直接显示出来
                    $("#myModal").modal('hide');
                }
                // setTimeout(function(){
                // window.location.reload("index.html#/userSetting");
                // },2000);
            })
            .error(function(){
                //alert("未知的错误!即将为您跳转...");
                notice.notify_info("您好！", "已存在该模板！！" ,"",false,"","");
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
            // console.log($scope.allsites);
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
            $scope.topicNameEnable = false;
            $scope.submitUrl  = $scope.baseUrl + "/addtopic";
            $scope.modellist=[];
            $scope.usedmodel="nomodel";
            $scope.baseUrl = CQ.variable.RESTFUL_URL ;
               
        }
        $scope.usemodels = function()
        {
            //$("#myModal").modal('hide');
            //$('#myModal1').modal('show');
            $scope.topic1.type1 = ''
            console.log($scope.topic1.type1)

            document.getElementById("type2").style.display="none";
            document.getElementById("type3").style.display="none";
            $scope.topic = {topicName:"",topicKeywords:[],siteLists:[]};
            $scope.topic.topicKeywords.push([]);
            $scope.allsites.forEach(function(d1)
            {
                d1.selected = false;
                d1.detail_sites.forEach(function(d){
                    d.selected = false;
                });
            });
            // console.log($scope.allsites);

            $scope.topicNameEnable = false;
            $scope.submitUrl  = $scope.baseUrl + "/addtopic";
            $scope.modellist=[];
            $scope.usedmodel="nomodel";
            $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                // var url = $scope.baseUrl+"/template_show";
                // var url = $scope.baseUrl+"/settopic";
                //?userId=" + $scope.userId;
                // var url = "/static/setup.json";

                // $http({
                //     params: {exam_type : $scope.topic1.type1,exam_period:$scope.topic1.type2},
                //     //url:"http://118.190.133.203:8100/yqdata/deletetopic",
                //     url: url,
                //     method: 'get',
                // })

                // $http.get(url).success(function(data){
                //     console.log(data);
                //     data.data.topicData.forEach(function(d){
                //          $scope.modellist.push(d.topicName);
                //     });
                // });
            //$scope.allsites1=$scope.allsites;
            //$scope.topic1=$scope.topic;
            // $scope.topic1 = JSON.parse(JSON.stringify($scope.topic)) || {};
            // console.log($scope.topic);
            // console.log($scope.topic1);
            $scope.allsites1 = JSON.parse(JSON.stringify($scope.allsites)) || {};

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
            if(opretion == "save" && ($scope.modelName == "添加话题"))
            {
                d.siteLists = d.siteLists || [];
                d.sitesStr = d.siteLists.map(d=>d.siteName).join(',');
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
                console.log($scope.topicList);
                console.log($scope.pageData);
                return true;
            }

            else if(opretion == "save" && $scope.modelName == "修改话题")
            {
                d.siteLists = d.siteLists || [];
                d.sitesStr = d.siteLists.map(d=>d.siteName).join(',');
                for(var i = 0; i < $scope.topicList.length; i++)
                {
                    if($scope.topicList[i].topicId == d.topicId)
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
        $scope.getDataByPage_1 = function(page)
        {
            $scope.maxPage = $scope.maxPage || 0;
            $scope.page = $scope.page || 0;
            if(page >= 0 && page<= $scope.maxPage)
            {
                $scope.page = page;
            }
            $scope.pageSize = 5.0;
            $scope.maxPage = Math.ceil($scope.topicList.length/$scope.pageSize) - 1;
            // $scope.pageData1 = $scope.topicList.slice($scope.pageSize * $scope.page, $scope.pageSize * ($scope.page + 1));
                for(var i=0;i<$scope.pageData1.length;i++)
            {
                if(i==$scope.pageData1.length-1||
                    $scope.pageData1[i].username!=$scope.pageData1[i+1].username)
                {
                    $scope.pageData1[0].rowspan=i+1;
                    break;
                }

            }
        };
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
            for(var i=0;i<$scope.pageData.length;i++)
            {
                if(i==$scope.pageData.length-1||
                    $scope.pageData[i].username!=$scope.pageData[i+1].username)
                {
                    $scope.pageData[0].rowspan=i+1;
                    break;
                }

            }
            console.log($scope.pageData);
        };
        //修改话题
        $scope.changeTopic = function(d)
        {
            $scope.modelName = "修改话题";
            $scope.topicNameEnable = false;
            $scope.topic = JSON.parse(JSON.stringify(d)) || {};
            console.log($scope.topic.topicName);

            for(var i = 0; i < $scope.topic.topicKeywords.length; i++)
            {
                $scope.topic.topicKeywords[i].str = $scope.topic.topicKeywords[i].toString();
            }
            console.log($scope.topic);
                    // console.log(new d.constructor());
                    $scope.submitUrl = $scope.baseUrl + "/modifytopic";
                    // $scope.submitUrl = "http://118.190.133.203:8001/yqdata/modifytopic";
                                        // $scope.submitUrl = "http://118.190.133.203:8001/yqdata/template_modify";

                    $scope.allsites.forEach(function(d3){
                        // console.log(d3);
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

CQ.mainApp.systemsettingController.directive('nameexistCheck', nameexistCheck);
function nameexistCheck(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link:function($scope,element,attrs,ctrl){
            // 同步验证
            ctrl.$validators.exist = function(modelValue, viewValue) {
                if($scope.modelName!='添加话题' || $scope.topicList == undefined)
                    return true;
                var value = modelValue || viewValue;
                for(var index = 0; index<$scope.topicList.length; index++)
                {
                    if($scope.topicList[index].topicName == value)
                    {
                        return false;
                    }
                }
                return true;
            };
        }
    }
}
