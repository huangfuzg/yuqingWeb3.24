"use strict";
CQ.mainApp.systemsettingController
    .controller("userSettingController", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function ($rootScope, 
        $scope, $http, ngDialog, notice) {
        console.log("userSettingController", "start!!!");
        $scope.topic_id = null;
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                $scope.userId = 1;
                $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                var url = $scope.baseUrl+"/settopic?userId=" + $scope.userId;
                // var url = "/static/setup.json";
                var sites = "";
                $scope.page = 0;
                $http.get(url).success(function(data){
                    console.log(data.data.topicData);
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