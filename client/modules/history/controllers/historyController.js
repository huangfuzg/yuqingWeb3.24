"use strict";
CQ.mainApp.historyController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("historyController", {
                url:"/yuqingHistory",
                templateUrl: "/static/modules/history/pages/history.html",
                controller: "historyController"
            })
            .state("displayDetailController", {
                url:"/historyDetail",
                templateUrl: "/static/modules/history/pages/detail.html",
                params:{case:null},
                controller: "displayDetailController"
            });
}]).controller('historyController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
    $rootScope.historyController = true;
    $http({
    	method:"get",
    	url:"/static/assets/data/history.json",
    	param:{}
    })
    .success(function(data)
    {
    	if(data.success)
    	{
    		$scope.cases = data.data;
    	}
    	else{
    		console.error("请求不到history.json");
    	}
    })
    .error(function(data)
    {
    	console.error("请求不到history.json");
    });
}]).controller('displayDetailController',['$scope', '$stateParams', '$http', function($scope,$stateParams,$http){
	$scope.case = $stateParams.case;
    $scope.showMoreBtn = true;
    var url = "/static/assets/data/hunanchangsha.json";
    if($scope.case.detailJsonName)
    {
        url = "/static/assets/data/" + $scope.case.detailJsonName;
    }
    $http({
        method:"get",
        url:url,
        param:{}
    })
    .success(function(data)
    {
        if(data.success)
        {
            $scope.posts = data.data;
            $scope.posts = $scope.posts.sort(function(a,b){
                return a.post_time > b.post_time ? 1 : a.post_time == b.post_time ? 0 : -1;
            });
            $scope.postslist = $scope.posts.slice(0,3);
            drawchart();
        }
        else{
            console.error("hunanchangsha.json");
        }
    })
    .error(function(data)
    {
        console.error("hunanchangsha.json");
    });
    $scope.showAllPosts = function()
    {
        $scope.postslist =  $scope.posts;
        $scope.showMoreBtn = false;
    }
    function drawchart()
    {
        var ndx = crossfilter($scope.posts),
            all = ndx.groupAll(),
            dayDist = dc.barChart("#dayDist"),
            dayDim = ndx.dimension(function(d) {
                var date = new Date(d.post_time);
                var formatDate = function(da)
                {
                    return da.toLocaleDateString();
                }
                var day = formatDate(date);
                d.nexttime = function(da){console.log(this);return (new Date(new Date(this.post_time).getTime()+da)).toLocaleString()};
                d.day = day;
                d.date = date.toLocaleString();
                return d.day;
            }),
            dayGroup = dayDim.group().reduceSum(function (d) {
                return 1;
            });
            drawBarDayDist(dayDist, dayDim, dayGroup);
            var siteDist = dc.pieChart("#siteDist"),
            siteDim = ndx.dimension(function(d) {

                return d.board;
            }),
            siteGroup = siteDim.group().reduceSum(function(d) {
                return 1;
            });
            drawPieDatatypeDist(siteDist, siteDim, siteGroup);
            // var datatypeDist = dc.pieChart("#datatypeDist"),
            // datatypeDim = ndx.dimension(function (d) {
            //     return d.dataTypeName;
            // }),
            // datatypeGroup = datatypeDim.group().reduceSum(function(d) {
            //     return d.post_num;
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
                .yAxisLabel("帖子数量")
                .xAxisLabel("时间")
                .xUnits(dc.units.ordinal)
                .renderHorizontalGridLines(true);
        chart.yAxis()
              .tickFormat(function(d){
                return +d;
              });
        dayDist.render();
    }
    function drawPieDatatypeDist(datatypeDist, datatypeDim, datatypeGroup) {
        var max_count = 6,data=datatypeGroup.top(max_count);
        var width = $("#siteDist").width(),
        height = $("#siteDist").height(),
        sum = datatypeDim.groupAll().reduceSum(function(d){return 1;}).value(),
        r = width > height ? height * 0.4 : width * 0.4;
        if(data.reduce((acc,d)=>acc+d.value,0)<sum)
            data.push({key:"其他站点",value:sum-data.reduce((acc,d)=>acc+d.value,0)});
        datatypeDist.data(data);
        datatypeDist
            .width(width)
            .height(height)
            .innerRadius(40)
            .radius(r)
            .cx(width*0.6)
            .cy(height*0.5)
            .dimension(datatypeDim)
            .group(datatypeGroup)
            .legend(dc.legend().horizontal(false).autoItemWidth(true).x(0).y(width*0.1).legendText(function(d){return d.name + ' ' + (d.data/sum*100).toFixed(2) + '%';}));
        datatypeDist.render();
    }
}]);