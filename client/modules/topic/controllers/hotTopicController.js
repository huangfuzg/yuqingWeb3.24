"use strict";
CQ.mainApp.topicController
    .controller("hotTopicController", ["$rootScope", "$scope", "TopicFacService", "$http", "ngDialog", "$state", "$timeout", 
    function($rootScope, $scope, 
    TopicFacService, $http, ngDialog, $state ,$timeout) {
        console.log("hotTopicController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("hot topic app start!!!");
                App.runui();
                getTopicData();
                $timeout(function(){
                    console.log($(".lead").length);
                    $(".lead").mouseover(function(event) {
                        /* Act on the event */
                        $(".title").css({left:event.clientX,top:event.clientY});
                        $(".title").text($(this).data("mytitle"));
                        $(".title").fadeIn("fast");
                    });
                    $(".lead").mouseout(function(event) {
                        /* Act on the event */
                        $(".title").fadeOut("fast");
                    });
                },1000);
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
                var imgsqiche = ["/static/assets/img/hot_topic/qihce/qiche1.jpg","/static/assets/img/hot_topic/qiche/qiche2.jpg","/static/assets/img/hot_topic/qiche/qiche3.jpg"];
                var imgsyinlibo = ["/static/assets/img/hot_topic/yinlibo/yinlibo1.jpg","/static/assets/img/hot_topic/yinlibo/yinlibo2.jpg","/static/assets/img/hot_topic/yinlibo/yinlibo3.jpg"];
                res.forEach(function(d) {
                    var limitLen = 50;
                    try{
                        // if(d.summary.length > limitLen)
                        // {
                        //     d.summary = d.summary.substring(0,limitLen) + "...";
                        // }
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
                    }else if(d.topicId == 140) {
                        d.imgs = imgs13;
                    }else if(d.topicId == 141) {
                        d.imgs = imgs14;
                    }else if(d.topicId == 142) {
                        d.imgs = imgs11;
                    }else if(d.topicId == 143) {
                        d.imgs = imgs12;
                    }else if(d.topicId == 132) {
                        d.imgs = imgsqiche;
                    }else if(d.topicId == 133) {
                        d.imgs = imgsyinlibo;
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
                var color = d3.scale.category10();
                var i = 0;
                var options = {
                    series: [{
                        type: 'wordCloud',
                        gridSize: 1,
                        sizeRange: [5, 35],
                        rotationRange: [0, 45],
                        shape: 'circle',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return color(i++);
                                }
                            },
                            // emphasis: {
                            //     shadowBlur: 10,
                            //     shadowColor: '#333'
                            // }
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
                    if(!$scope.senpostData)
                    {
                        $("#load").show();
                    }
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
                $scope.senTopicEvolu = res.topic_info;
                $scope.topicName = res.topicName;
                $scope.postData = res.postData;
                $scope.allTopics = res.all_topic;
                $scope.topicIndex = res.topic_index;
                $scope.topicRelation = res.topic_relation;
                posts = res.postData;
                pages=~~(posts.length/page_num)+1;
                $scope.posts=posts.slice(0,page_num);
                $timeout(function(){
                    $(".loading").hide();
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
                drawEchart();
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
        function drawEchart() {
                var times = []
                var keys = [];
                var dat=[]
                for(var i=0;i<10;i++){
                    dat[i]=[0,0,0,0,0,0,0]
                }
                $scope.senTopicEvolu.forEach(function (d) {
                    var sentime = d.time.slice(0,10);
                    if(times.indexOf(sentime)<0)
                        times.push(sentime);
                    if(keys.indexOf(d.word)<0){
                        keys.push(d.word);
                    }
                    if(d.number>0){
                        dat[keys.indexOf(d.word)][times.indexOf(sentime)]=Math.log(d.number);
                    }
                    else{
                        dat[keys.indexOf(d.word)][times.indexOf(sentime)]=d.number;
                    }

                })
                times = times.reverse();
                for(var i=0;i<dat.length;i++){
                    dat[i]=dat[i].reverse();
                }
                console.log('times',times);
                console.log('keys:',keys);
                // $scope.senTopicEvolu.forEach(function (v,d) {
                //     // console.log('v:',v,'d:',d);
                //     for(var i=0;i<keys.length;i++){
                //         var tmp = keys[i];
                //         if(v.topic.hasOwnProperty(tmp)) {
                //             // console.log(v.topic,tmp)
                //             dat[i][d] = +v.topic[tmp];
                //         }
                //     }
                // })
                console.log(dat);
                var sencolor = ['#a6cee3','#fdbf6f','#b2df8a','#1f78b4','#33a02c','#6a3d9a','#e31a1c','#ff7f00','#cab2d6','#fb9a99']
                var myChart = echarts.init(document.getElementById('hotTopicEvolu'));
                var option = {
                    legend: {
                        data:keys
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            boundaryGap : false,
                            data : times.reverse()
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    series : [

                    ]
                }
                for(var i=0;i<keys.length;i++){
                    var tmp={name:keys[i],type:'line',stack:'总量',itemStyle:{normal:{color:sencolor[i]}},areaStyle: {normal: {}},data:dat[i]}
                    option.series.push(tmp)
                }
                myChart.setOption(option);
            };
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
                var min_time = new Date($scope.postData[$scope.postData.length - 1].postTime),
                    max_time = new Date($scope.postData[0].postTime),
                    months = max_time.getMonth()-min_time.getMonth()<0?max_time.getMonth()-min_time.getMonth()+12:max_time.getMonth()-min_time.getMonth(),
                    days=Math.abs(max_time.getDate()-min_time.getDate());
                var postTime = new Date(d.postTime),
                    year = postTime.getFullYear(),
                    month = postTime.getMonth()<10?'0'+postTime.getMonth():postTime.getMonth(),
                    day = postTime.getDate()<10?'0'+postTime.getDate():postTime.getDate(),
                    hour = postTime.getHours()<10?'0'+postTime.getHours():postTime.getHours(),
                    minute = postTime.getMinutes()<10?'0'+postTime.getMinutes():postTime.getMinutes(),
                    second = postTime.getSeconds()<10?'0'+postTime.getSeconds():postTime.getSeconds();
                var ret = postTime;
                if(months>0)
                {
                    ret = year+'-'+month+'-'+day;
                }
                else if(days>7)
                {
                    ret = year+'-'+month+'-'+day+' '+hour+':00:00';
                }
                else if(days>1)
                {
                    ret = year+'-'+month+'-'+day+' '+hour+':'+minute+':00';
                }
                else
                {
                    ret = d.postTime;
                }
                d.postTime = new Date(ret);
                return d.postTime;
                // return d.postTime;
            });
            var dayGroup1 = dayDim1.group();
            drawdatatypeDist(datatypeDist, datatypeDim, datatypeGroup);
            drawsiteDist(siteDist, siteDim, siteGroup);
            // draw sitedist
            drawdayDist1(dayDist1, dayDim1, dayGroup1);
            drawTopicRealDist("#topicRealsDist",$scope.allTopics,$scope.topicRelation);
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

        function mylayout()
        {
            var _nodes = [],
            _size = [0,0],
            _midnodeIndex = 0,
            _edges = [],
            _min_r = 0;
            console.log(this);
            this.nodes = function(nodes)
            {
                _nodes = nodes;
                return this;
            }
            this.edges = function(edges)
            {
                _edges = edges;
                return this;
            }
            this.size = function(size)
            {
                _size = size;
                return this;
            }
            this.midnodeIndex = function(index)
            {
                _midnodeIndex = index;
                return this;
            }
            this.minR = function(r)
            {
                _min_r = r;
                return this;
            }
            this.run = function()
            {
                var max_r = Math.min(_size[0],_size[1])*0.9/2,
                min_r = _min_r,
                start_arc = 2*Math.random()*Math.PI,//起始角度
                tick_arc = 2*Math.PI/(_nodes.length-1),
                max_weight = _edges.reduce((acc,d)=>d.weight>acc?d.weight:acc,0),
                min_weight = _edges.reduce((acc,d)=>d.weight<acc?d.weight:acc,Infinity),
                rScale = d3.scale.linear().domain([min_weight,max_weight]).range([max_r,min_r]);
                _nodes[_midnodeIndex].x = _size[0]/2;
                _nodes[_midnodeIndex].y = _size[1]/2;
                _edges.forEach((d,i)=>{
                    if(d.source==_nodes[_midnodeIndex])
                    {
                        let r = rScale(d.weight),
                        arc = start_arc+tick_arc*i;
                        // console.log(r);
                        d.target.x = _nodes[_midnodeIndex].x + r*Math.cos(arc);
                        d.target.y = _nodes[_midnodeIndex].y + r*Math.sin(arc);
                        // console.log(d.target);
                    }
                    else if(d.target==_nodes[_midnodeIndex])
                    {
                        let r = rScale(d.weight),
                        arc = start_arc+tick_arc*i;
                        // console.log(r);
                        d.source.x = _nodes[_midnodeIndex].x + r*Math.cos(arc);
                        d.source.y = _nodes[_midnodeIndex].y + r*Math.sin(arc);
                    }
                });
            }
        }

        function getPosts(data)
        {
            page=1;
            posts=data.reverse();
            pages=~~(posts.length/page_num)+1;
            $("#posts").slimScroll({scrollTo:0});
            $scope.posts=posts.slice(0,page_num);
        }

        function drawTopicRealDist(dom,topics,topic_reals)
        {
            topic_reals.forEach(real=>{
                real.source = topics[real.source]||real.source;
                real.target = topics[real.target]||real.target;
            });
            drawForceGraph(dom,topics,topic_reals);
        }

        function drawForceGraph(dom,nodes,edges)
        {
            var width = $(dom).width(),
            height = $(dom).height(),
            img_w=20,
            img_h=20,
            color = d3.scale.category20(),
            // force = d3.layout.force()  
            //     .nodes(d3.values(nodes))  
            //     .links(edges)  
            //     .size([width, height])
            //     .gravity(0.5) 
            //     .linkDistance(100)  
            //     .charge(-2000)  
            //     .on("tick", tick)
            //     // .on("end",zoomed)  
            //     .start();
            layout = (new mylayout()).nodes(nodes)
                        .edges(edges)
                        .size([width, height])
                        .midnodeIndex($scope.topicIndex)
                        .minR(60)
                        .run();
            // var zoom = d3.behavior.zoom()
            //     .scaleExtent([1, 10])
            //     .on("zoom", zoomed);
            var svg = d3.select(dom).append("svg")  
                .attr("width", width)  
                .attr("height", height);
            // svg.call(zoom);
            // svg=svg.append("g");

            var link = svg.selectAll(".link")  
                .data(edges.filter(d=>d.weight>0.05))  
                .enter().append("line")  
                .attr("class", "link");  
            link.style("stroke",function(d){//  设置线的颜色 
                d.target.weight = d.weight;   
                return color(d.source.color+1);    
            })    
            .style("stroke-width",function(d,i){//设置线的宽度    
                return d.weight*20;    
            });
            var node = svg.selectAll(".node")  
                .data(nodes)  
                .enter().append("g")  
                .attr("class", "node")  
                .on("mouseenter", mouseover)  
                .on("mouseleave", mouseout);
                // .call(force.drag);  
            tick();
                // .call(force.drag);
            // console.log(nodes.filter(d=>d.detail!=undefined));
            // var node_img=svg.selectAll(".node-img")  
            //     .data(nodes.filter(d=>d.detail!=undefined))  
            //     .enter().append("g")  
            //     .attr("class", "node")  
            //     .on("mouseenter", mouseover)  
            //     .on("mouseleave", mouseout)  
            //     .call(force.drag);
            function radius (d){   
                // if(!d.weight){//节点weight属性没有值初始化为1（一般就是叶子了）  
                //     d.weight=1;  
                // }                                                
                // return Math.log(d.weight)*2;
                return 20;                                     
            }
            
            function hideEdge()
            {
                link.style("stroke-width",function(d,i){//设置线的宽度    
                return 0;});
            }
            function showEdge(group)
            {
                link.style("stroke-width",function(d,i){//设置线的宽度    
                return d.source.group==group&&d.target.group==group?"1px":0;});
            }
            // node_img.append("image")  
            // .attr("xlink:href",function(d){  //设置圆点半径                        
            //     return d.detail?d.detail.user_img:"";                            
            //  })
            // .attr("width",img_w)
            // .attr("height",img_h)
            // .attr("transform","translate("+-img_w/2+","+-img_h/2+")");
            node.append("circle")  
                .attr("r",function(d,i){  //设置圆点半径                        
                return radius (d);                            
             })                                             
            .style("fill",function(d,i){ //设置圆点的颜色  
                d.color = color(i);          
                return d.color;  
            });

            var legend = svg.append('g').attr('class','.legend').selectAll('.lenged').data(nodes)
            .enter().append('g').attr("transform",function(d,i){
                return "translate("+10+","+(10+i*20)+")";
            });
            legend.append("rect").attr("x",0).attr("y",0)
                    .attr("width",10).attr("height",10)
                    .attr("fill",function(d){return d.color;});
            legend.append("text").attr("x",15).attr("y",10)
                    .text(function(d){return d.topic_name})
                    .attr("fill",function(d){return "#000";});

            // var text = node.append("text")  
            //     .attr("x", 12)  
            //     .attr("dy", ".35em")
            //     .attr("class","title")  
            //     .text(function(d) { return ""; });
            // var imgText=node_img.append("text")  
            //     .attr("x", 12)  
            //     .attr("dy", ".35em") 
            //     .attr("class","title")  
            //     .text(function(d) { return ""; });  
            function tick() {//打点更新坐标  
              link  
                  .attr("x1", function(d) { return d.source.x; })  
                  .attr("y1", function(d) { return d.source.y; })  
                  .attr("x2", function(d) { return d.target.x; })  
                  .attr("y2", function(d) { return d.target.y; });  
              
              node  
                  .attr("transform", function(d) {   
                        return "translate(" + d.x + "," + d.y + ")";   
                  });
              // node_img  
              //     .attr("transform", function(d) {   
              //           return "translate(" + d.x + "," + d.y + ")";   
              //     });  
            }  
              
            function mouseover(d) { 
                // console.log(d3.event);
    
                    $("#title").html("话题id: "+d.id+"<br/>话题名称: "+d.topic_name+"<br/>话题描述："+d.summary.slice(0,50)+"<br/>话题相关性："+d.weight+"...<br/>话题关键词："+d.topic_kws.slice(0,3)+"...");
                    $("#title").css({"left":d3.event.clientX+2,"top":d3.event.clientY}).fadeIn('fast');
              d3.select(this).select("circle").transition()  
                  .duration(250)  
                  .attr("r", function(d){  //设置圆点半径                        
                return radius (d)+10;                            
             });  
            }  
              
            function mouseout() {
              $("#title").fadeOut("fast");  
              d3.select(this).select("circle").transition()  
                  .duration(250)  
                  .attr("r", function(d){  //恢复圆点半径                        
                return radius (d);                            
             });         
            }
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
             var width = $("#dayDist1").width();
             var height = $("#dayDist1").height();
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
                .width($("#dayDist2").width())
                .height(100)
                .margins({top: 30, right: 50, bottom: 25, left: 40})
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