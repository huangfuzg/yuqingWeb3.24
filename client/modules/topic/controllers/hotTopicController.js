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
                    var limitLen = 50;
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
                $scope.data.forEach(d=>{
                    var imgs = [];
                    console.log(d);
                    d.imgs.forEach(url=>{
                        var image = new Image();
                        image.src = url;
                        if(image.complete)
                        {
                            imgs.push(image.src);
                        }
                        image.onload = function()
                        {
                            imgs.push(image.src);
                        }
                        image.onerror = function()
                        {
                            
                        }
                    });
                    d.imgs = imgs;
                });
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
            $state.go("hotTopicAnalysController", {topicId: topicId});
        };

    }])
    .controller("hotTopicAnalysController", ["$rootScope", "$scope", "$http", "$stateParams", "TopicFacService", "SearchFacService", "$state", "$timeout",
        function($rootScope, $scope, $http, $stateParams, TopicFacService, SearchFacService, $state, $timeout) {
        console.log("topicAnalys", "start!!!");
        var page_num=10,pages,posts,page=1;
        $scope.postData = null;
        $scope.eventData = null;
        $scope.topicName = "";
        $scope.backTopic = false;
        $scope.filters = {"start_time":"","site":[],"topicIds":[],"end_time":"", "filter":"", "filtertype":0};
        $scope.siteDefaultImg=["/static/assets/img/news2.svg","/static/assets/img/luntan.svg","/static/assets/img/weibo.svg","/static/assets/img/baidu.svg","/static/assets/img/weixin1.svg","/static/assets/img/search.svg"];
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
                posts = res.postData;
                pages=~~(posts.length/page_num)+1;
                $scope.posts=posts.slice(0,page_num);
                $timeout(function(){
                    $("#loading").hide();
                    var beforeScolltop=$("#posts").scrollTop();
                    $("#posts").scroll(function(){
                        console.log($("#posts").scrollTop());
                        if($("#posts").scrollTop()>beforeScolltop)
                        {
                            if($("#posts").scrollTop()+$("#posts").height()+150>$("#posts>ul").height()&&page<=pages)
                            {
                                $("#loading").show();
                                $timeout(function(){
                                    $scope.posts=posts.slice(0,(++page)*page_num);
                                    $("#loading").hide();
                                },1000);
                            }
                            beforeScolltop=$("#posts").scrollTop();
                        }
                    });
                },0);
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

        function getPosts(data)
        {
            page=1;
            posts=data.reverse();
            pages=~~(posts.length/page_num)+1;
            $("#posts").slimScroll({scrollTo:0});
            $scope.posts=posts.slice(0,page_num);
        }

        function drawsiteDist(siteDist, siteDim, siteGroup) {
            var width = $("#siteDist").width() * 0.9,
                height = $("#siteDist").height() * 0.9;
                // siteDist.data = function() {
                //     var top10 = siteGroup.top(10);
                //     return top10;
                // };
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
                siteDist.on("filtered", function(){
                    // console.log(post_filters);
                    // console.log(getPosts());
                    $timeout(function(){getPosts(siteDim.top(Infinity))},0);
                    console.log(siteDim.top(Infinity));
                });
                siteDist.render();
                // d3.select("#siteDist svg > g")
                //     .attr("transform", "translate(" + 10 + "," + -20 + ")");
                // d3.select("#siteDist svg").append("text")
                //     .attr("transform", "translate(" + (width/2) + "," + (height - 20 - 20 + 28) + ")")
                //     .style("text-anchor", "middle")
                //     .text("帖子数量");
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
            dayDist1.on("filtered", function(){
                // console.log(post_filters);
                // console.log(getPosts());
                $timeout(function(){getPosts(dayDim1.top(Infinity))},0);
            });
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