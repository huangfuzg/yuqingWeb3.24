"use strict";
CQ.mainApp.monitorController
   .controller("monitorController", ["$rootScope", "$scope", "$interval", "ngDialog","MonitorFacService",
    "$location","$stateParams", "$http", "PostDataService", "$timeout", "notice",function ($rootScope, $scope, $interval,
        ngDialog, MonitorFacService, $location, $stateParams, $http, PostDataService,
        $timeout, notice) {
        console.log("monitorController", "start!!!");
        //页面UI初始化；
        $scope.topic_id = null;
        $scope.monitortopic_id = null;
        $scope.monitorData = null;
        $scope.topicLists = null;
        $scope.dataType = $stateParams.dataType;
        $scope.siteId = $stateParams.siteId;
        $rootScope.freshLists = $rootScope.freshLists || [];
        $rootScope.freshLists.forEach(function(d,i){
            while($interval.cancel(d));
            console.log($interval.cancel(d));
        });
        $rootScope.freshLists = [];
        $scope.cons = {};
        $scope.date = getFormatData();
        $scope.pics = ["/static/assets/img/news2.svg","/static/assets/img/luntan.svg", "/static/assets/img/weibo.svg"
        ,"/static/assets/img/tieba.svg","/static/assets/img/weixin1.svg","/static/assets/img/baidu.svg"];
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("monitor app start!!!");
                App.runui();
                getMonitorData();
            }
        });

        $("#datepicker-default")
            .datepicker({todayHighlight:true, autoclose:true, format: 'yyyy-mm-dd'})
            .datepicker('setEndDate', getFormatData())
            .on('changeDate', function(ev){
                $scope.monitorData = [];
                $rootScope.freshLists.forEach(function (d) {
                    $interval.cancel(d);
                });
                setTimeout(function(){
                $scope.$apply(function(){
                    getMonitorData();　　　//在这里去手动触发脏检查
                });
                },1000);
            });
        function getMonitorData() {
            var cons = {};
            cons.dataType = $scope.dataType ;
            cons.siteId = $scope.siteId;
            cons.date = $scope.date;
            cons.pageCount = 20;
            $scope.cons = angular.copy(cons);
            MonitorFacService.getMonitorData(cons).then(function(res){
                console.log(res);
                res.unshift(res[res.length - 1]);
                res.splice(res.length - 1, 1);
                console.log(res);
                $scope.monitorData = res;
                var topicLists = [];
                $scope.monitorData.forEach(function (d) {
                    d.fresh = true;
                    // var tl = {};
                    // tl.topicId = d.topicId;
                    // tl.newTime = d.newTime;
                    // tl.fresh = true;
                    // topicLists.push(tl);
                    // d.postData.forEach(function(post){
                    //     var max_users = 20;
                    //     var max_display = 18;
                    //     if(Math.random() < 0.8)
                    //         post.img_url = "/static/assets/img/display/" + ~~(max_display * Math.random() + 1) + ".jpg"; 
                    //     post.poster = post.poster || {};
                    //     post.poster.img_url = "/static/assets/img/user/user-" + ~~(max_users * Math.random() + 1) + ".jpg"; 
                    // });
                });
                // $scope.freshTopicLists = topicLists;
                getFreshData(cons);
            },function(error){
                console.log(error);
                notice.notify_info("抱歉！","数据请求出错，请重试！","",false,"","");
            });
        };

        // get format data
        function getFormatData() {
            var datetime = new Date();  
            var year=datetime.getFullYear();//获取完整的年份(4位,1970)  
            var month=datetime.getMonth()+1;//获取月份(0-11,0代表1月,用的时候记得加上1)  
            if(month<=9){  
                month="0"+month;  
            }  
            var date=datetime.getDate();//获取日(1-31)  
            if(date<=9){  
                date="0"+date;  
            }  
            return year+"-"+month+"-"+date;  
        }
        // fresh data
        function getFreshData(cons) {
            var ll = $interval(function(){
                console.log($scope.monitorData);
                $scope.monitorData.forEach(function(topic){
                    if(topic.fresh)
                    {
                        $scope.refreshData(topic.topicId);
                    }
                });
            //     $(".loads").slideDown("slow");
            //     var topicLists = [];
            //     $scope.monitorData.forEach(function (d) {
            //         var tl = {};
            //         tl.topicId = d.topicId;
            //         tl.newTime = d.newTime;
            //         topicLists.push(tl);
            //     });
            //     cons.topicLists = topicLists;
            //     //console.log(JSON.stringify(cons));
            //         PostDataService.flushData(cons).then(function(freshdata) {
            //             console.log(freshdata.data.data);
            //             var res = freshdata.data.data;
            //             $scope.monitorData.forEach(function(d) {
            //                 res.forEach(function(rr) {
            //                     if(rr.topicId == d.topicId){
            //                         d.newTime = rr.newTime;
            //                         if(rr.postData.length != 0) {
            //                             d.count = rr.count;
            //                             $(".addnums").slideDown("slow");
            //                             d.postData = rr.postData.concat(d.postData);
            //                         }
            //                     }
            //                 });
            //             });
            //             //console.log($scope.monitorData);
            //             $timeout(function(){
            //                 $(".addnums").slideUp("slow");
            //             }, 4000);
            //             $(".loads").slideUp("slow");
            //         },function(error) {
            //             $(".loads").slideUp("slow");
            //             console.log(error);
            //         });
            },30000);
            $rootScope.freshLists.push(ll);
        }
        $scope.$on('$destroy',function(){
           $rootScope.freshLists.forEach(function (d) {
                while($interval.cancel(d));
           });
           // console.log(ll);
        }); 

        // move positions
        $scope.movePosition = function(topic_id) {
            console.log(topic_id);
            var ht = $("#topic_"+topic_id+"");
            if($("#topic_"+topic_id+"")) {
                $("#topic_"+topic_id+"").hide("slow");
                $timeout(function(){
                    $("#topicLists").prepend(ht);
                    $("#topic_"+topic_id+"").fadeIn("slow");
                },1000);
            }
        };
        $scope.openDia = function(topic_id, topic_name) {
            $scope.topic_name = topic_name;
            ngDialog.open(
            {
                template: '/static/modules/monitor/pages/openTopic.html',
                controller: 'openTopic',
                width:"40%",
                scope:$scope
            }
            );
        };

        $scope.isfresh = function(topic_id)
        {
            console.log($scope.freshTopicLists);
            for(var i = 0; i < $scope.freshTopicLists.length; i++)
            {
                if($scope.freshTopicLists[i].topicId == topic_id)
                {
                    return $scope.freshTopicLists[i].fresh;
                }
            }
        }

        $scope.pausefresh = function(topic)
        {
            topic.fresh = false;
            // for(var i = 0; i < $scope.freshTopicLists.length; i++)
            // {
            //     if($scope.freshTopicLists[i].topicId == topic_id)
            //     {
            //         $scope.freshTopicLists[i].fresh = false;
            //         return;
            //     }
            // }
        }

        $scope.startfresh = function(topic)
        {
            topic.fresh = true;
            // for(var i = 0; i < $scope.freshTopicLists.length; i++)
            // {
            //     if($scope.freshTopicLists[i].topicId == topic_id)
            //     {
            //         $scope.freshTopicLists[i].fresh = true;
            //         return;
            //     }
            // }
        }

        $scope.refreshData = function(topic_id) {
            var doms = "#topic_" + topic_id;
            angular.element(doms).find(".loads").slideDown("slow");
                var topicLists = [];
                $scope.monitorData.forEach(function (d) {
                    if(d.topicId == topic_id) {
                        var tl = {};
                        tl.topicId = d.topicId;
                        tl.newTime = d.newTime;
                        topicLists.push(tl);
                    }
                });
            $scope.cons.topicLists = topicLists;
            //console.log(JSON.stringify($scope.cons));
            PostDataService.flushData($scope.cons).then(function(freshdata) {
                // console.log(freshdata.data.data);
                var res = freshdata.data.data;
                $scope.monitorData.forEach(function(d) {
                    res.forEach(function(rr) {
                        if(rr.topicId == d.topicId){
                            d.newTime = rr.newTime;
                            if(rr.postData.length != 0) {
                                d.count = rr.count;
                                angular.element(doms).find(".addnums").slideDown("slow");
                                $timeout(function(){
                                    d.postData = rr.postData.concat(d.postData);
                                }, 100);
                                //d.postData = rr.postData.concat(d.postData);
                                //angular.element(doms).find(".addnums").slideUp("slow");
                            }
                        }
                    });
                });
                //console.log($scope.monitorData);
                angular.element(doms).find(".loads").slideUp("slow");
                $timeout(function(){
                        angular.element(doms).find(".addnums").slideUp("slow");
                }, 4000);
            },function(error) {
                angular.element(doms).find(".loads").slideUp("slow");
                angular.element(doms).find(".addnums").slideUp("slow");
                console.log(error);
            });
            
        };

        $scope.showMore = function(topicId) {
            console.log(topicId);
            console.log('show more triggered');  
            var cons = {};
            cons.dataType = $scope.dataType ;
            cons.siteId = $scope.siteId;
            cons.date = $scope.date;
            cons.pageCount = 20;
            cons.topicId = topicId;
            $scope.monitorData.forEach(function(d) {
                console.log(d);
                if(d.topicId == topicId) {
                    cons.oldTime = d.oldTime;
                }
            });
            angular.element("#topic_" + topicId).find(".loadsMore").slideDown("slow");
            MonitorFacService.getLoadData(cons).then(function(res) {
                angular.element("#topic_" + topicId).find(".loadsMore").slideUp("slow");
                console.log(res);
                $scope.monitorData.forEach(function(d) {
                    if(res[0].topicId == d.topicId){
                        d.oldTime = res[0].oldTime;
                        res[0].postData.forEach(function (mm) {
                            d.postData.push(mm);
                        });
                    }
                });
            }, function (error) {
                console.log(error);
            });
        };

        $scope.panelCollapse = function(topic_id) {
            var doms = "#topic_" + topic_id;
            angular.element(doms).find(".panel-body").slideToggle();
        };
        $scope.pauseTop = function(topic_id) {
            $scope.topic_id = "topic_" + topic_id;
            $scope.monitortopic_id = "monitortopic_" + topic_id;
             ngDialog.open(
            {
                template: '/static/modules/monitor/pages/pauseTopic.html',
                controller: 'pauseTopic',
                width:"10%",
                scope:$scope
            }
            );
        };
        $scope.startTop = function(topic_id) {
            $scope.topic_id = "topic_" + topic_id;
            $scope.monitortopic_id = "monitortopic_" + topic_id;
            ngDialog.open(
            {
                template: '/static/modules/monitor/pages/startTopic.html',
                controller: 'startTopic',
                width: "10%",
                scope: $scope
            }
            );
        };
        $scope.AddSenmessage = function(post_id) {
            console.log(post_id);
            $scope.post_id = post_id;
            ngDialog.open(
            {
                template: '/static/modules/monitor/pages/addsenmessage.html',
                controller: 'addSenmessage',
                appendClassName: "ngdialog-theme-enginesetting",
                width: "100%",
                scope: $scope
            }
            );
        };
        $scope.MarkRead  = function(post_id) {
            // console.log($(this).find(".save").find("img").remove());
            // $("#"+post_id+"").find(".save").find("img").remove()
            // $("#"+post_id+"").find(".save").prepend("<img src = '/static/assets/img/saved.svg'>");
        };
        $scope.OpenAnaly = function(analy_topic, topic_id) {
            var anaDom = "#" + analy_topic;
            var topicDom = "#topic_" + topic_id;
            angular.element(topicDom).after(angular.element(anaDom));
            angular.element(anaDom).removeClass("hidden").show("normal");
            var width = angular.element(topicDom).width();
            // time 
            var timeAna = c3.generate({
                bindto:"#timeAna",
                size:{
                    width: width * 0.8
                },
                padding: {
                    top:20,
                    left:40,
                    right:30,
                    bottom: 20
                },
                data: {
                    x: 'x',
                    columns: [
                        ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
                        ['时间', 30, 200, 100, 400, 150]
                    ]
                },
                axis: {
                    x: {
                        type: 'timeseries',
                        tick: {
                            format: '%Y-%m-%d'
                        }
                    }
                }
            });
        };
        $scope.stopAnaly = function(analy_topic) {
            var anaDom = "#" + analy_topic;
            angular.element(anaDom).hide("slow");
        };

        $scope.addBg = function($event) {
            //console.log($event.target);
            var tt = $event.target;
            if(angular.element(tt.closest("li")).hasClass("monitor-bg-color") == false) {
                angular.element(tt.closest("li")).addClass("monitor-bg-color");
                angular.element(tt.closest("li")).find(".iconslists").removeClass("ng-hide");
            }
        };
        $scope.removeBg = function($event) {
            var tt = $event.target;
            if(angular.element(tt.closest("li")).hasClass("monitor-bg-color")) {
                angular.element(tt.closest("li")).removeClass("monitor-bg-color");
                angular.element(tt.closest("li")).find(".iconslists").addClass("ng-hide");
            }
        };

   }])
   .controller("openTopic", ["$rootScope","$scope","ngDialog", function($rootScope, $scope, ngDialog) {
        console.log("openTopic","start!!!");
   }])
   .controller("pauseTopic", ["$rootScope","$scope","ngDialog", function($rootScope, $scope, ngDialog) {
        console.log("pauseTopic","start!!!");
        console.log($scope.topic_id);
        $scope.stopTopic = function() {
            if($scope.topic_id) {
                $("#"+$scope.topic_id+"").hide("slow");
                $("#"+$scope.monitortopic_id+" a:first-child").addClass("disabled");
                $("#"+$scope.monitortopic_id+" .start").removeClass("hidden");
                $("#"+$scope.monitortopic_id+" .stop").addClass("hidden");
            }
            ngDialog.closeAll();
        };
       
        
   }])
    .controller("startTopic", ["$rootScope","$scope","ngDialog", function($rootScope, $scope, ngDialog) {
        console.log("startTopic","start!!!");
        console.log($scope.topic_id);
        $scope.starTopic = function() {
            if($scope.topic_id) {
                var ht = $("#"+$scope.topic_id+"");
                $("#topicLists").prepend(ht);
                $("#"+$scope.topic_id+"").fadeIn("slow");
                $("#"+$scope.monitortopic_id+" a:first-child").removeClass("disabled");
                $("#"+$scope.monitortopic_id+" .start").addClass("hidden");
                $("#"+$scope.monitortopic_id+" .stop").removeClass("hidden");
            }
            ngDialog.closeAll();
        };
       
        
   }])
    .controller("addSenmessage", ["$rootScope","$scope","ngDialog", "MonitorFacService", "PostDataService", "notice",
     function($rootScope, $scope, ngDialog, MonitorFacService, PostDataService, notice) {
        console.log("addSenmessage","start!!!");
        //console.log($scope.post_id);
        $scope.detailData = null;
        $scope.addsenword = function()
        {
            var range = window.getSelection() || document.getSelection() || document.selection.createRange();
            var word = range.toString().trim();
            if(word != '')
            {
                if($scope.detailData.senwords==''||$scope.detailData.senwords==null)
                {
                    $scope.detailData.senwords = word;
                }
                else
                {
                    $scope.detailData.senwords += ',' + word;
                }
            }
        }
        $scope.DoaddSen = function() {
            if($scope.detailData.senwords instanceof String)
            {
                $scope.detailData.senwords = $scope.detailData.senwords.split(',');
            }
            else
            {
                $scope.detailData.senwords = [];
            }
            console.log("$scope.detailData");
            console.log($scope.detailData);
            var cons = {};
            cons.userId = 1;
            var postData = [];
            postData.push($scope.detailData);
            cons.postData = postData;
            PostDataService.addSenmessage(cons).then(function(res) {
                console.log(res);
                ngDialog.closeAll();
                notice.notify_info("您好","添加成功！","",false,"","");
            },function(err) {
                console.log(err);
                notice.notify_info("您好","添加失败！请重试","",false,"","");
            });
            
        };
        MonitorFacService.getPostDetail({id: $scope.post_id, userId: 1}).then(function(res) {
            console.log(res);
            $scope.detailData = res[0];
            $scope.detailData.content = $scope.detailData.content.trim();
            $scope.detailData.title = $scope.detailData.title.trim();
        }, function(err) {
            notice.notify_info("您好","添加失败！请重试","",false,"","");
            //ngDialog.closeAll();
            console.log(err);
        });
   }]);