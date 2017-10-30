"use strict";
CQ.mainApp.topicController
    .controller("senTopicController", ["$rootScope", "$scope", "TopicFacService", "$http", "ngDialog", "$state",
    function($rootScope, $scope, 
    TopicFacService, $http, ngDialog, $state) {
        console.log("senTopicController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("topic app start!!!");
                App.runui();
                getTopicData();
            }
        });
        
        function getTopicData() {
            var cons = {};
            cons.userId = 1;
            TopicFacService.getTopicData(cons).then(function(res){
                console.log(res);
                var imgs2 = ["/static/assets/img/1.jpg","/static/assets/img/2.jpg","/static/assets/img/3.jpg"];
                var imgs3 = ["/static/assets/img/ky1.jpg","/static/assets/img/ky2.jpg","/static/assets/img/ky3.jpg"];
                var imgs4 = ["/static/assets/img/gk1.jpg","/static/assets/img/gk2.jpg","/static/assets/img/gk3.jpg"];
                var imgs9 = ["/static/assets/img/da1.jpg","/static/assets/img/da2.jpg","/static/assets/img/da3.jpg"];
                var imgs12 = ["/static/assets/img/zbqc1.jpg","/static/assets/img/zbqc2.jpg","/static/assets/img/zbqc3.jpg"];
                var imgs8 = ["/static/assets/img/8-1.jpg","/static/assets/img/8-2.jpg","/static/assets/img/8-3.jpg","/static/assets/img/8-4.jpg"];
                var imgs99 = ["/static/assets/img/9-1.jpg","/static/assets/img/9-2.jpg","/static/assets/img/9-3.jpg"];
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
                    if(d.topicId == 2) {
                        d.imgs = imgs9;
                    }else if(d.topicId == 1) {
                        d.imgs = imgs4;
                        // d.summary = "各大高校研究生复试工作正在进行，大多数高校已经录取结束";
                    }else if(d.topicId == 0) {
                        d.imgs = imgs2;
                    }else if(d.topicId == 3) {
                        d.imgs = imgs12;
                    }else if(d.topicId == 9) {
                        d.imgs = imgs99;
                    }else if(d.topicId == 8) {
                        d.imgs = imgs8;
                    }else if(d.topicId > 4) {
                        // d.summary = "各个地方成人高考报名工作开始";
                        d.imgs = imgs2;
                    }
                    //d.imgs = imgs;
                });
                var topicWeight={"十九大":100,"高考":90,"成考":80,"作弊":70};
                res.sort(function(a,b){
                    return topicWeight[b.topicName]-topicWeight[a.topicName]>0?1:-1;
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
                        gridSize: 12,
                        sizeRange: [12, 40],
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
                d.topicKeywords=new Set(d.topicKeywords);
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
                    $state.go("yuqingTrendsController",{"keywords":[keylists[param.dataIndex].name],"topicIds":[d.topicId]});
                }
                chart.on("click",searchPost);
                }
            });
        }
        $scope.searchPostByTopic = function(topicId)
        {
            $state.go("yuqingTrendsController",{"topicIds":[topicId]});
        }
        $scope.openModal = function(topicId){
            $state.go("topicAnalysController", {topicId: topicId});
        };

    }])
    .controller("senTopicAnalysController", ["$rootScope", "$scope", "$http", "$stateParams", "TopicFacService", "SearchFacService", "$state",
        function($rootScope, $scope, $http, $stateParams, TopicFacService, SearchFacService, $state) {
        console.log("topicAnalys", "start!!!");
        $scope.postData = null;
        $scope.eventData = null;
        $scope.topicName = "";
        $scope.backTopic = false;
        $scope.filters = {"start_time":"","site":[],"topicIds":[],"end_time":"", "filter":"", "filtertype":0};
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                App.runui();
                getTopicAnalysData();
                $scope.userId = 1;
                var params = {userId:$scope.userId};
                SearchFacService.getRuleData(params).then(function(data)
                {
                    $scope.allSites = data.allSites;
                });
            }
        });
        $scope.openModal = function(){
            $state.go("topicController");
        };
        function getTopicAnalysData() {
            var cons = {};
            cons.userId = 1;
            cons.topicId = $stateParams.topicId;
            $scope.filters.topicIds.push(+$stateParams.topicId);
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
                // var res1;
                // if($stateParams.topicId==8)
                // {
                //     $http({
                //         method:"get",
                //         url:"/static/assets/data/shijiuda.json"
                //     }).then(function(res){

                //         res1=res.data.data;
                //         console.log(res1);
                //         $scope.topicName = res1.topicName;
                //         $scope.postData = res1.postData;
                //         $scope.backTopic = true;
                //         drawChart(true);
                //     },function(res){
                //         console.log(res);
                //     });
                // }
                // if($stateParams.topicId==9)
                // {
                //     $http({
                //         method:"get",
                //         url:"/static/assets/data/chengkao.json"
                //     }).then(function(res){

                //         res1=res.data.data;
                //         console.log(res1);
                //         $scope.topicName = res1.topicName;
                //         $scope.postData = res1.postData;
                //         $scope.backTopic = true;
                //         drawChart(true);
                //     },function(res){
                //         console.log(res);
                //     });
                // }
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
            // drawClouds();
        }

        function drawdatatypeDist(datatypeDist, datatypeDim, datatypeGroup) {
             var width = $("#datatypeDist").width() * 0.9,
                height = $("#datatypeDist").height() * 0.9,
                sum = datatypeDim.groupAll().value();
                datatypeDist
                    .width(width)
                    .height(height)
                    .innerRadius(20)
                    .dimension(datatypeDim)
                    .group(datatypeGroup)
                    .legend(dc.legend().legendText(function(d){return d.name + ' ' + (d.data/sum*100).toFixed(2) + '%';}));
                // datatypeDist.addFilterHandler(function(filters, filter) {
                //     filters.push(filter);
                //     $scope.filters.site = filters;
                //     $scope.filters.filter = filter;
                //     $scope.filters.filtertype = 1;
                //     return filters;
                // });
                datatypeDist.addFilterHandler(function(filters, filter) {
                    filters.push(filter);
                    $scope.filters.filter = filter;
                    $scope.filters.filtertype = 1;
                    return filters;
                });
                datatypeDist.render();
                // console.log(d3.selectAll('text.pie-slice'));
                // d3.selectAll('text.pie-slice').text(function(d) {
                //             if(d.endAngle != d.startAngle)
                //                 return d.data.key + ' ' + dc.utils.printSingleValue((d.endAngle - d.startAngle) / (2*Math.PI) * 100) + '%';
                //         });
        }

        $scope.selectGraphPost = function()
        {
            var params = {};
            var format = function(date)
            {
                var datetime = new Date(date);
                // year = datetime.getFullYear(),
                // month = datetime.getMonth() + 1,
                // day = datetime.getdate();
                // if(month<=9){
                //     month="0"+month;
                // }
                // if(day<=9){
                //     day="0"+date;
                // }
                // return year+"-"+month+"-"+day;
            }
            // var start_time = format($scope.filters.start_time);
            var siteIds = [];
            if($scope.filters.filtertype == 1)//点击数据源分布图
            {
                for(var i = 0; i < $scope.allSites.length; i++)
                {
                    if($scope.filters.filter == $scope.allSites[i].dataTypeName)
                    {
                        if($scope.filters.site.length == 0)
                        {
                            siteIds.push($scope.allSites[i].dataTypeId);
                            break;
                        }
                        for(var j = 0; j < $scope.filters.site.length; j++)
                        {
                            for(var k = 0; k < $scope.allSites[i].detail_sites.length;k++)
                            {
                                if($scope.allSites[i].detail_sites[k].siteName == $scope.filters.site[j])
                                {
                                    siteIds.push($scope.allSites[i].detail_sites[k].siteId);
                                    break;
                                }
                            }
                        }
                        break;
                    }
                }
                console.log(siteIds);
            }
            else if($scope.filters.filtertype == 2)//点击具体站点分布图
            {
                for(var i = 0; i < $scope.allSites.length; i++)
                {
                    for(var j = 0; j < $scope.allSites[i].detail_sites.length; j++)
                    {
                        console.log($scope.filters.filter);
                        if($scope.allSites[i].detail_sites[j].siteName = $scope.filters.filter)
                        {
                            siteIds.push($scope.allSites[i].detail_sites[j].siteId+10);
                            break;
                        }
                    }
                    break;
                }
            }
            params.sites = siteIds;
            params.topicIds = $scope.filters.topicIds;
            params.start_time = $scope.filters.start_time;
            params.end_time = $scope.filters.end_time;
            console.log(params);
            $state.go("yuqingTrendsController",params);
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
                    // .on('pretransition', function(chart) {
                    //     chart.select("svg > g")
                    //     .attr("transform", "translate(" + 10 + "," + -20 + ")");
                    //     chart.select("svg").append("text")
                    //     .attr("transform", "translate(" + (width/2) + "," + (height - 20 - 20 + 28) + ")")
                    //     .style("text-anchor", "middle")
                    //     .text("帖子数量");
                    // })
                    .controlsUseVisibility(true)
                    .elasticX(true);
                    siteDist.addFilterHandler(function(filters, filter) {
                        filters.push(filter);
                        $scope.filters.site = filters;
                        $scope.filters.filter = filter;
                        $scope.filters.filtertype = 2;
                        return filters;
                    });
                siteDist.render();
                d3.select("#siteDist svg > g")
                    .attr("transform", "translate(" + 10 + "," + -20 + ")");
                d3.select("#siteDist svg").append("text")
                    .attr("transform", "translate(" + (width/2) + "," + (height - 20 - 20 + 28) + ")")
                    .style("text-anchor", "middle")
                    .text("帖子数量");
        }
        function drawdayDist1(dayDist1, dayDim1, dayGroup1) {
             var dateFormat =d3.time.format("%Y-%m-%d %H:%M:%S");
             var dayDist2 = dc.barChart("#dayDist2");
             var dayDim2 = dayDim1;
             var dayGroup2 = dayDim2.group().reduceSum(function(d) {
                return 0.2;
             });
             var width = $("#dayDist1").width() * 0.9;
             var height = $("#dayDist1").height() * 0.9;
             dayDist1
                .renderArea(true)
                .width(width)
                .height(height)
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
                .brushOn(false)
                .xAxisLabel("时间")
                .yAxisLabel("帖子数量");
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
            dayDist2.addFilterHandler(function(filters, filter) {
                filters.push(filter);
                $scope.filters.start_time = filter[0];
                $scope.filters.end_time = filter[1];
                console.log($scope.filters.start_time);
                console.log($scope.filters.end_time);
                // $scope.filters.filtertype = 3;
                return filters;
            });  
            dayDist2.render();
            $("#dayDist2 .y").html("");
            $("#dayDist2 .y").remove();
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
                                gridSize: 12,
                                sizeRange: [12, 40],
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
                        d.topicKeywords=new Set(d.topicKeywords);
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
                            $state.go("yuqingTrendsController",{"keywords":[keylists[param.dataIndex].name],"topicIds":[d.topicId]});
                        }
                        chart.on("click",searchPost);
                    }
                });
            }
    }]);