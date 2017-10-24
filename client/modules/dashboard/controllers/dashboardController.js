"use strict";
CQ.mainApp.dashboardController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "/static/modules/dashboard/pages/dashboard.html",
                controller: "dashboardController"
            });
    }])
    .controller('dashboardController', ['$scope', '$rootScope', '$http', '$state','ChartService', 'notice', 'SearchFacService', 
        function($scope, $rootScope, $http, $state, ChartService, notice, SearchFacService) {
            $rootScope.dashboardController = true;
            console.log("dashboardController", "start!");
            $scope.HotPost = [];
            $scope.HotPoster = [];
            $scope.HotWeibo = [];
            $scope.mapData = [];
            $scope.sourceData = [];
            $scope.sites = [];
            $scope.topic = [];
            $scope.keyWords = [];
            $scope.userId = 1;
            $scope.dataTypeLists = [0,0,0,0,0,0];
            $scope.dataTypes = [];
            var params = {userId:$scope.userId};
            var p = d3.select("#topicDist").append("p");
                $("#topicDist>p").css({"position":"absolute","width":"100%","text-align":"center","bottom":"28px","left":"-10px"})
                .text("帖子数量");
            var mapData=[]; 
            $http({
                method:"get",
                url:"/static/assets/data/map.json"
            }).then(function(res){
                mapData=res.data;
            },function(res){
                console.log(res.data);
            });
            SearchFacService.getRuleData(params).then(function(data)
            {
                data.allSites.forEach(function(d){
                    $scope.dataTypes.push({"dataTypeId":d.siteTypeId,"dataTypeName":d.siteTypeName})
                    var index = 0;
                    d.detail_sites.forEach(function(site){
                        $scope.sites.push(site);
                    })
                });
                data.topicData.forEach(function(topic){
                    $scope.topic.push(topic);
                    var index = 0;
                    topic.topicKeywords.forEach(function(keyword){
                        $scope.keyWords.push({"id": index++, "keyword": keyword});
                    });
                });
            });
            $scope.filters = {"pt_time":[],"site":[],"topic":[], "filter":"", "filtertype":0};
            $scope.reDraw = function()
            {
                console.log("resize!!!!!!");
                drawChart();
            }
            var format = function(date)
            {
                var year = date.substring(0,4);
                var month = date.substring(4,6);
                var day = date.substring(6);
                console.log(year + '-' + month + '-' + day);
                return year + '-' + month + '-' + day;
            }
            $scope.selectGraphPost = function()
            {
                var params = {};
                if($scope.filters.filtertype == 1)//site
                {
                    var sites = [];
                    var topicIds = [];
                    var start_time = [];
                    $scope.dataTypes.forEach(function(d)
                    {
                        if(d.dataTypeName == $scope.filters.filter)
                        {
                            sites.push(d.dataTypeId);
                        }
                    });
                    $scope.filters.topic.forEach(function(topicName){
                        $scope.topic.forEach(function(topic)
                        {
                            if(topic.topicName == topicName)
                            {
                                topicIds.push(topic.topicId);
                            }
                        });
                    });
                    $scope.filters.pt_time.forEach(function(pt_time){
                        start_time.push(format(pt_time));
                    });
                    if(sites.length > 0)
                    {
                        params.sites = sites;
                    }
                    if(topicIds.length > 0)
                    {
                        params.topicIds = topicIds;
                    }
                    if(start_time.length > 0)
                    {
                        params.start_time = start_time;
                    }
                }
                else if($scope.filters.filtertype == 2)//pt_time
                {
                    var sites = [];
                    var topicIds = [];
                    var start_time = [];
                    $scope.dataTypes.forEach(function(d)
                    {
                        $scope.filters.site.forEach(function(siteName){
                            if(d.dataTypeName == siteName)
                            {
                                sites.push(d.dataTypeId);
                            }
                        });
                    });
                    $scope.filters.topic.forEach(function(topicName){
                        $scope.topic.forEach(function(topic)
                        {
                            if(topic.topicName == topicName)
                            {
                                topicIds.push(topic.topicId);
                            }
                        });
                    });
                    start_time.push(format($scope.filters.filter));
                    if(sites.length > 0)
                    {
                        params.sites = sites;
                    }
                    if(topicIds.length > 0)
                    {
                        params.topicIds = topicIds;
                    }
                    if(start_time.length > 0)
                    {
                        params.start_time = start_time;
                    }
                }
                else if($scope.filters.filtertype == 3)//topic
                {
                    var sites = [];
                    var topicIds = [];
                    var start_time = [];
                    $scope.dataTypes.forEach(function(d)
                    {
                        $scope.filters.site.forEach(function(siteName){
                            if(d.dataTypeName == siteName)
                            {
                                sites.push(d.dataTypeId);
                            }
                        });
                    });
                    $scope.topic.forEach(function(topic)
                    {
                        if(topic.topicName == $scope.filters.filter)
                        {
                            topicIds.push(topic.topicId);
                        }
                    });
                    $scope.filters.pt_time.forEach(function(pt_time){
                        start_time.push(format(pt_time));
                    });
                    if(sites.length > 0)
                    {
                        params.sites = sites;
                    }
                    if(topicIds.length > 0)
                    {
                        params.topicIds = topicIds;
                    }
                    if(start_time.length > 0)
                    {
                        params.start_time = start_time;
                    }
                }
                console.log(params);
                $state.go("yuqingTrendsController",params);
            }
            $scope.findPost = function(siteType)
            {
                var params = {},
                date = new Date( new Date().getTime()-7*24*60*60*1000);
                // var year = date.getFullYear(),
                // month = date.getMonth() + 1,
                // day = date.getDate();
                // if(month < 10)
                // {
                //     month = "0" + month;
                // }
                // if(day < 10)
                // {
                //     day = "0" + day;
                // }
                // date = year + "-" + month + "-" + day;
                params.sites = [siteType];
                params.start_time = date;
                console.log(date);
                $state.go("yuqingTrendsController",params);
            }
            getData();
            //页面UI初始化；
            $scope.$on('$viewContentLoaded', function() {
                if($rootScope.mainController) {
                    App.runui();
                    notice.notify_info("欢迎回来！！","admin!!","",false,"","");
                }
            });
            function getData() {
                ChartService.getDashboardData({}).then(function(res){
                        console.log(res);
                        $scope.HotPost = res.Hot.hotPost;
                        $scope.HotPoster = res.Hot.hotPoster;
                        if($scope.HotPoster instanceof Array)
                        {
                            $scope.HotPoster.forEach(function(d){
                                if(d.home_url.indexOf("tieba.baidu.com") != -1)
                                {
                                    d.board = "百度贴吧";
                                }
                                else if(d.home_url.indexOf("weibo.com") != -1)
                                {
                                    d.board = "新浪微博";
                                }
                                else
                                {
                                    d.board = "其他";
                                }
                            })
                        }
                        $scope.HotWeibo = res.Hot.hotWeibo;
                        $scope.mapData = res.mapData;
                        $scope.sourceData = res.sourceData;
                        $scope.sourceData.forEach(function(d) {
                            $scope.dataTypeLists[parseInt(d.data_type)] =  $scope.dataTypeLists[parseInt(d.data_type)] + parseInt(d.post_num);
                        });
                        console.log($scope.dataTypeLists);
                        drawChart();
                        drawMap();
                },function(error){
                    console.log(error);
                    notice.notify_info("抱歉！","数据请求出错，请重试！","",false,"","");
                });
            }
           
            function drawChart() {
                $scope.sourceData=$scope.sourceData.filter(d=>d.topic_name!="");
                var ndx = crossfilter($scope.sourceData),
                all = ndx.groupAll(),
                dayDist = dc.barChart("#dayDist"),
                dayDim = ndx.dimension(function(d) {
                    return d.time;
                }),
                dayGroup = dayDim.group().reduceSum(function (d) {
                    return d.post_num;
                });
                drawBarDayDist(dayDist, dayDim, dayGroup);
                var topicDist = dc.rowChart("#topicDist"),
                topicDim = ndx.dimension(function(d) {
                    return d.topic_name;
                }),
                topicGroup = topicDim.group().reduceSum(function(d) {
                    return d.post_num;
                });
                drawRowTopicDist(topicDist, topicDim, topicGroup);
                var datatypeDist = dc.pieChart("#datatypeDist"),
                datatypeDim = ndx.dimension(function (d) {
                    return d.dataTypeName;
                }),
                datatypeGroup = datatypeDim.group().reduceSum(function(d) {
                    return d.post_num;
                });
                drawPieDatatypeDist(datatypeDist, datatypeDim, datatypeGroup);
            }
            function drawPieDatatypeDist(datatypeDist, datatypeDim, datatypeGroup) {
                var width = $("#datatypeDist").width(),
                height = $("#datatypeDist").height(),
                sum = datatypeDim.groupAll().reduceSum(function(d){return d.post_num;}).value(),
                r = width > height ? height * 0.4 : width * 0.4;
                datatypeDist
                    .width(width)
                    .height(height)
                    .innerRadius(40)
                    .radius(r)
                    .cx(width*0.6)
                    .cy(height*0.5)
                    .dimension(datatypeDim)
                    .group(datatypeGroup)
                    .legend(dc.legend().horizontal(false).x(0).y(width*0.1).legendText(function(d){return d.name + ' ' + (d.data/sum*100).toFixed(2) + '%';}));
                datatypeDist.addFilterHandler(function(filters, filter) {
                        filters.push(filter);
                        $scope.filters.site = filters;
                        $scope.filters.filter = filter;
                        $scope.filters.filtertype = 1;
                        return filters;
                });
                datatypeDist.render();
            }
            function drawBarDayDist(dayDist, dayDim, dayGroup){
                var width = $("#dayDist").width(),
                height = $("#dayDist").height(),
                chart = dayDist.width(width)
                        .height(height)
                        .margins({top: 20, right: 10, bottom: 28, left: 40})
                        .dimension(dayDim)
                        .group(dayGroup)
                        .elasticY(true)
                        .yAxisPadding('10%') //设置y轴距离顶部的距离(为了renderLabel才设置)
                        .centerBar(false)
                        .round(dc.round.floor)
                        .alwaysUseRounding(true)
                        .renderLabel(true)
                        .outerPadding(0.2)
                        .controlsUseVisibility(true)
                        .x(d3.scale.ordinal())
                        .xUnits(dc.units.ordinal)
                        .yAxisLabel("帖子数量")
                        .xAxisLabel("时间")
                        .renderHorizontalGridLines(true);
                chart.yAxis()
                      .ticks(5)
                      .tickFormat(function(d){
                        console.log(d);
                        return +d;
                      });
                chart.xAxis()
                      .tickFormat(function(d){
                        d = d.toString();
                        if(d.charAt(4) == '0')
                        {
                          return d.slice(5,-2) + "-" + d.slice(-2);
                        }
                        return d.slice(4,-2) + "-" + d.slice(-2);
                      });
                chart.addFilterHandler(function(filters, filter) {
                        filters.push(filter);
                        $scope.filters.pt_time = filters;
                        $scope.filters.filter = filter;
                        $scope.filters.filtertype = 2;
                        return filters;
                });
                dayDist.render();
                $("#dayDist").click(function(ev){
                    console.log($scope.filters);
                });
            }
            function drawRowTopicDist(topicDist, topicDim, topicGroup) {
                var width = $("#topicDist").width(),
                height = $("#topicDist").height(),
                tickdis = 40,//刻度的长度
                ticks = Math.floor(width/tickdis);
                topicDist.data = function() {
                    var top10 = topicGroup.top(10);
                    return top10;
                }; 
                // var topSvg = new SVGElement();
                // topSvg.setAttribute("width",width);
                // topSvg.setAttribute("height",height);
                //topSvg.style.padding = "20px";
                // d3.select("#topicDist").append("svg");
                // var topSvg = d3.select("#topicDist>svg");
                // topSvg.attr("width",width);
                // topSvg.attr("height",height);
                topicDist.width(width)
                    // .svg(topSvg)
                    .height(height-20)
                    .dimension(topicDim)
                    .group(topicGroup)
                    .x(d3.scale.linear().domain([6,20]))
                    .margins({ top: 0, right: 30, bottom: 20, left: 10 })
                    .label(function(d) {
                        return d.key + ":" + d.value; })
                    .renderLabel(true)
                    .renderTitle(true)
                    .controlsUseVisibility(true)
                    .elasticX(true)
                    .xAxis()
                    .ticks(ticks)
                    .tickFormat(function(d){
                        return +d;
                    });
                topicDist.addFilterHandler(function(filters, filter) {
                        filters.push(filter);
                        $scope.filters.topic = filters;
                        $scope.filters.filter = filter;
                        $scope.filters.filtertype = 3;
                        return filters;
                });
                // topicDist.oldRender = topicDist.render;
                // topicDist.render=function()
                // {
                //     topicDist.oldRender();
                //     // console.log(topicDist.oldRender === topicDist.render);
                //     // d3.select("#topicDist svg > g")
                //     //     .attr("transform", "translate(" + 10 + "," + -20 + ")");
                //     // d3.select("#topicDist svg").append("text")
                //     //     .attr("transform", "translate(" + (width/2) + "," + (height - 20 - 40 + 28) + ")")
                //     //     .style("text-anchor", "middle")
                //     //     .text("帖子数量");
                // }
                topicDist.render();
                // d3.select("#topicDist").append("svg")
                //         .attr("width",width)
                //         .attr("height",40)
                //         .append("text")
                //         .style("text-anchor", "middle")
                //         .text("帖子数量");
            }
            function drawMap() {
                $scope.mapData=mapData;
                var width = $("#maps").width(),
                height = $("#maps").height(),
                maxvalue=0,
                minvalue=0,
                svg = d3.select("#maps")
                    .append("svg")
                    .attr("width", width)
                    .attr("height", height)
                    .append("g")
                    .attr("transform", "translate(0,0)"),
                projection = d3.geo.mercator()
                    .center([107, 31])
                    .scale(360)
                    .translate([width * 4 / 8, height * 3 / 4]),
                path = d3.geo.path()
                    .projection(projection),
                color = d3.scale.category20(),
                color1 = d3.scale.category20();
                d3.json("/static/assets/data/china.geojson", function(error, root) {
                    if (error)
                        return console.error(error);
                    var provinces=svg.selectAll("path")
                        .data( root.features )
                        .enter()   
                        .append("path")
                        .attr("stroke","#000")
                        .attr("stroke-width",1)
                        .attr("fill", "rgba(0,0,255,0.2)")
                        .attr("d", path );
                        //求最大值和最小
                        maxvalue = d3.max($scope.mapData,function(d){return d.nums;});
                        minvalue = 30;
                        //定义一个线性比例尺，将最小值和最大值之间的值映射到[0, 1]
                        var linear = d3.scale.linear()
                            .domain([minvalue,maxvalue]).range([0,1]);
                        //定义最小值和最大值对应的颜色
                        var a = "rgb(0,0,180)";
                        var b = "rgb(255,0,0)";
                        //颜色插值函数
                        var computeColor = d3.interpolate(a,b);
                        //将读取到的数据存到数组values，令其索引号为各省的名称
                        var values = [];
                        for(var i = 0;i < $scope.mapData.length;i++){
                            var name = $scope.mapData[i].pro;
                            var value =$scope.mapData[i].nums;
                            values[name] = value;
                        }
                        //设定各省份的填充色
                        provinces.style("fill", function(d,i){
                            var t = linear( values[d.properties.name] );
                            var color = computeColor(t);
                            return color.toString();
                        })
                        .append("title")
                        .text(function(d){
                            if(values[d.properties.name] == undefined)
                                values[d.properties.name] = 0;
                            return d.properties.name+" : "+ values[d.properties.name];
                        });
                    
                    });
            var slideHeight=~~(height/3),
            slideWidth=5,
            slideLiner=d3.scale.linear().domain([1,~~(2*slideHeight/slideWidth)+1]).range([0,1]),
            a = "rgb(0,0,180)",
            b = "rgb(255,0,0)",
                        //颜色插值函数
            computeColor = d3.interpolate(a,b),
            slideData=[];
            for(var i=1; i<~~(2*slideHeight/slideWidth)+1; i++)
                slideData.push(i);
            d3.select("#maps svg").append("g").attr("class","slidebar").selectAll('.slidecircle').data(slideData).enter().append("circle")
                .attr("cx",function(d){
                    return width - 20;
                })
                .attr("cy",function(d){
                    return height-10-d*slideWidth/2;
                })
                .attr("r",function(d){
                    return slideWidth;
                })
                .style("fill",function(d){
                    return computeColor(slideLiner(d)).toString();
                });
                maxvalue = d3.max($scope.mapData,function(d){return d.nums;});
                        minvalue = 30;
                d3.select("#maps svg .slidebar").append("text").attr("x",width-50)
                    .attr("y",height-10-1*slideWidth/2)
                    .text(minvalue);
                d3.select("#maps svg .slidebar").append("text").attr("x",width-60)
                    .attr("y",height-10-slideData.length*slideWidth/2)
                    .text(maxvalue); 
            } 
    }]);

CQ.mainApp.dashboardController.directive('ngResize', resize);
function resize($parse){
    return {
        restrict: 'A',
        link: function($scope,$element,$attr,$ctrl){
            var fn = $parse($attr['ngResize']);
            $element.resize(function(){
                fn($scope);
            })
        }
    }
}