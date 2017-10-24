"use strict";
CQ.mainApp.topicController
    .controller("hotTopicController", ["$rootScope", "$scope", "TopicFacService", "$http", "ngDialog", "$state",
    function($rootScope, $scope, 
    TopicFacService, $http, ngDialog, $state) {
        console.log("hotTopicController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("hot topic app start!!!");
                App.runui();
                getTopicData();
            }
        });
        
        function getTopicData() {
            var cons = {};
            cons.userId = 1;
            TopicFacService.getHotTopicData(cons).then(function(res){
                console.log(res);
                var imgs2 = ["/static/assets/img/hot_topic/111/1.jpg","/static/assets/img/hot_topic/111/2.png"];
                var imgs3 = ["/static/assets/img/hot_topic/112/1.jpg","/static/assets/img/hot_topic/112/2.jpg","/static/assets/img/hot_topic/112/3.png","/static/assets/img/hot_topic/112/4.jpg"];
                var imgs4 = ["/static/assets/img/hot_topic/113/1.jpg","/static/assets/img/hot_topic/113/2.jpg"];
                var imgs9 = ["/static/assets/img/hot_topic/114/1.jpg","/static/assets/img/hot_topic/114/2.jpg","/static/assets/img/hot_topic/114/3.png"];
                var imgs5 = ["/static/assets/img/hot_topic/115/1.jpg","/static/assets/img/hot_topic/115/2.jpg"];
                var imgs6 = ["/static/assets/img/hot_topic/116/1.jpg","/static/assets/img/hot_topic/116/2.jpg"];
                var imgs7 = ["/static/assets/img/hot_topic/117/1.jpg","/static/assets/img/hot_topic/117/2.jpg"];
                var imgs11 = ["/static/assets/img/hot_topic/11/11-1.jpg","/static/assets/img/hot_topic/11/11-2.jpg","/static/assets/img/hot_topic/11/11-3.jpg"];
                var imgs12 = ["/static/assets/img/hot_topic/12/12-1.jpg","/static/assets/img/hot_topic/12/12-2.jpg","/static/assets/img/hot_topic/12/12-3.jpg"];
                var imgs13 = ["/static/assets/img/hot_topic/13/13-1.jpg","/static/assets/img/hot_topic/13/13-2.jpg","/static/assets/img/hot_topic/13/13-3.jpg"];
                var imgs14 = ["/static/assets/img/hot_topic/14/14-1.jpg","/static/assets/img/hot_topic/14/14-2.jpg","/static/assets/img/hot_topic/14/14-3.jpg"];
                res.forEach(function(d) {
                    var limitLen = 40;
                    try{
                        if(d.summary.length > limitLen)
                        {
                            d.summary = d.summary.substring(0,limitLen) + "...";
                        }
                    }
                    catch(err)
                    {
                        console.log(err);
                    }
                    if(d.topicId == 111) {
                        d.imgs = imgs2;
                    }else if(d.topicId == 112) {
                        d.imgs = imgs3;
                    }else if(d.topicId == 113) {
                        d.imgs = imgs4;
                    }else if(d.topicId == 114) {
                        d.imgs = imgs9;
                    }else if(d.topicId == 120) {
                        d.imgs = imgs13;
                    }else if(d.topicId == 121) {
                        d.imgs = imgs14;
                    }else if(d.topicId == 122) {
                        d.imgs = imgs7;
                    }else if(d.topicId == 123) {
                        d.imgs = imgs11;
                    }else if(d.topicId == 124) {
                        d.imgs = imgs12;
                    }
                    //d.imgs = imgs;
                });
                $scope.data = res;
                setTimeout(function(){
                    $scope.$apply(function(){
                            drawClouds();
                    　　　　});
                　}, 1000);

                
            },function(error) {
                console.log(error);
            });
        }

        function drawClouds() {
            $scope.data.forEach(function (d) {
                var doms = "wordsCloud_" + d.topicId;
                if(document.getElementById(doms) != undefined) {
                    //console.log("aaa");
                var chart = echarts.init(document.getElementById(doms));
                var options = {
                    series: [{
                        type: 'wordCloud',
                        gridSize: 20,
                        sizeRange: [12, 50],
                        rotationRange: [0, 0],
                        shape: 'circle',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return 'rgb(' + [
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160),
                                        Math.round(Math.random() * 160)
                                    ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        data: []
                    }]
                };
                var keylists = [];
                d.topicKeywords.forEach(function (d) {
                    var tt = {};
                    tt.name = d;
                    tt.value = Math.random() * 50 + 50;
                    keylists.push(tt);
                });
                options.series[0].data = keylists;
                chart.setOption(options);
                var searchPost = function(param)
                {
                    $state.go("yuqingTrendsController",{"keywords":[keylists[param.dataIndex].name]});
                }
                chart.on("click",searchPost);
                }
            });
        }
        $scope.openModal = function(topicId){
            $state.go("topicAnalysController", {topicId: topicId});
        };

    }])
    .controller("topicAnalysController1", ["$rootScope", "$scope", "$http", "$stateParams", "TopicFacService","$state",
        function($rootScope, $scope, $http, $stateParams, TopicFacService, $state) {
        console.log("topicAnalys", "start!!!");
        $scope.postData = null;
        $scope.eventData = null;
        $scope.topicName = "";
        $scope.backTopic = false;
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                App.runui();
                getTopicAnalysData();
            }
        });
        $scope.openModal = function(){
            $state.go("topicController");
        };
        function getTopicAnalysData() {
            var cons = {};
            cons.userId = 1;
            cons.topicId = $stateParams.topicId;
             TopicFacService.getTopicAnalyData(cons).then(function(res){
                //console.log(res);
                // res.postData.forEach(function(d) {
                //     d.postTime = d.postTime.substring(0,10)
                // });
                $scope.topicName = res.topicName;
                $scope.postData = res.postData;
                $scope.backTopic = true;
                drawChart(true);
            },function(error) {
                console.log(error);
            });
        }
        $scope.redraw = function()
        {
            console.log("resize!!!!!!");
            try
            {
                drawChart(false);
            }
            catch(err)
            {
                console.log(err);
            }
        }
        function drawChart(first) {
            if(first)
            {
                var dateFormat =d3.time.format("%Y-%m-%d %H:%M:%S");
                $scope.postData.forEach(function (d) {
                    d.postTime = dateFormat.parse(d.postTime);
                });
            }
            var ndx = crossfilter($scope.postData);
            var datatypeDist = dc.pieChart("#datatypeDist");
            var datatypeDim = ndx.dimension(function(d) {
                return d.dataTypeName;
            });
            var datatypeGroup = datatypeDim.group();
            var siteDist = dc.rowChart("#siteDist");
            var siteDim = ndx.dimension(function(d) {
                return d.site_name;
            });
            var siteGroup = siteDim.group();
            // linechart1 and linechart2
            var dayDist1  = dc.lineChart('#dayDist1');
            var dayDim1  = ndx.dimension(function (d) {
                return d.postTime;
            });
            var dayGroup1 = dayDim1.group();
            drawdatatypeDist(datatypeDist, datatypeDim, datatypeGroup);
            drawsiteDist(siteDist, siteDim, siteGroup);
            // draw sitedist
            drawdayDist1(dayDist1, dayDim1, dayGroup1);
        }

        function drawdatatypeDist(datatypeDist, datatypeDim, datatypeGroup) {
             var width = $("#datatypeDist").width() * 0.9,
                height = $("#datatypeDist").height() * 0.9;
                datatypeDist
                    .width(width)
                    .height(height)
                    .innerRadius(20)
                    .dimension(datatypeDim)
                    .group(datatypeGroup)
                    .legend(dc.legend());
                datatypeDist.render();
        }
        function drawsiteDist(siteDist, siteDim, siteGroup) {
            var width = $("#siteDist").width() * 0.9,
                height = $("#siteDist").height() * 0.9;
                siteDist.data = function() {
                    var top10 = siteGroup.top(10);
                    return top10;
                };
                siteDist.width(width)
                    .height(height)
                    .dimension(siteDim)
                    .group(siteGroup)
                    .x(d3.scale.linear().domain([6,20]))
                    .margins({ top: 0, right: 30, bottom: 20, left: 10 })
                    .label(function(d) {
                        return d.key + ":" + d.value; })
                    .renderTitle(true)
                    .controlsUseVisibility(true)
                    .elasticX(true);
                siteDist.render();
        }
        function drawdayDist1(dayDist1, dayDim1, dayGroup1) {
             var dateFormat =d3.time.format("%Y-%m-%d %H:%M:%S");
             var dayDist2 = dc.barChart("#dayDist2");
             var dayDim2 = dayDim1;
             var dayGroup2 = dayDim2.group().reduceSum(function(d) {
                return 0.2;
             });
             dayDist1
                .renderArea(true)
                .width($("#dayDist1").width() * 0.9)
                .height($("#dayDist1").height() * 0.9)
                .transitionDuration(1000)
                .margins({top: 30, right: 50, bottom: 25, left: 40})
                .dimension(dayDim1)
                .group(dayGroup1)
                .mouseZoomable(true)
                .rangeChart(dayDist2)
                .title(function(p){
                    return [
                        "时间: "+dateFormat(p.key),
                        "数目: "+p.value
                    ].join("\n");
                })
                .x(d3.time.scale().domain([$scope.postData[$scope.postData.length - 1].postTime, 
                    $scope.postData[0].postTime]))
                .round(d3.time.minute.round)
                .xUnits(d3.time.minutes)
                .elasticY(true)
                .renderHorizontalGridLines(true)
                .brushOn(false);
            dayDist1.render();

            // line2  
            
            dayDist2
                .width($("#dayDist2").width() * 0.9)
                .height(50)
                .margins({top: 20, right: 10, bottom: 20, left: 30})
                .dimension(dayDim2)
                .group(dayGroup2)
                .elasticY(false)
                .yAxisPadding('10%') //设置y轴距离顶部的距离(为了renderLabel才设置)
                .centerBar(true)
                .gap(1)
                //.round(d3.time.round)
                .alwaysUseRounding(true)
                //.xUnits(d3.time.minutes);
                .renderLabel(false)
                .outerPadding(0.2)
                .controlsUseVisibility(true)
                .x(d3.time.scale().domain([$scope.postData[$scope.postData.length - 1].postTime, 
                    $scope.postData[0].postTime]))
                .renderHorizontalGridLines(false)
                .brushOn(true);
            dayDist2.render();
            $("#dayDist2 .y").html("");
            $("#dayDist2 .y").remove();
        }
    }]);