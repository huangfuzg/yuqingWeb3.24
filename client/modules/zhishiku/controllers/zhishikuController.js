"use strict";
CQ.mainApp.zhishikuController
    .controller("zhishikuController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
        function($rootScope, $scope, $http, ngDialog, $state) {
            console.log("zhishikuController", "start!!!");
            //页面UI初始化；
            $scope.$on('$viewContentLoaded', function() {
                if($rootScope.mainController) {
                    console.log("zhishiku app start!!!");
                    App.runui();
                    $(".description>div>p").hide();
                    $(".img-box").hover(function(){
                        $(this).find(".description>div").animate({"height":"100%","padding":"20px"},500,"linear");
                        $(this).find(".description>div>p").show();
                    },function(){
                        $(this).find(".description>div>p").hide();
                        $(this).find(".description>div").animate({"height":"80px","padding":"0 20px"},500,"linear");
                    });
                }
            });
        }])
    .controller("subjectController", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$timeout",
        function($rootScope, $scope, $http, ngDialog, $state, $timeout) {
            console.log("zhishikuController", "start!!!");
            //页面UI初始化；
            $scope.subjects=[{
                id:0,
                name:"中印对峙",
                img:"/static/assets/img/zhishiku/zydz.jpg",
                description:"2017年6月18日至2017年8月28日，印度边防部队非法越过边界线进入了中方境内，阻挠中国边防部队在洞朗地区的正常活动，双方在该地区紧张对峙两个多月。"
            },{
                id:1,
                name:"萨德部署",
                img:"/static/assets/img/zhishiku/sadebushu.jpg",
                description:"2016年7月以来，韩国和美国决定在驻韩美军基地部署“萨德”末段高空区域防御系统，遭到周边国家的强烈反对，中国民间和舆论爆发了对韩国的大规模抵制行动。"
            },{
                id:2,
                name:"南海争端",
                img:"/static/assets/img/zhishiku/nanhai.png",
                description:"2015年9月11日，印度军队和印藏边防警察部队派人越界拆毁了中国在建的哨所，双方军队遂在这一地区发生对峙。"
            },{
                id:3,
                name:"香港占中",
                img:"/static/assets/img/zhishiku/hkzz.jpg",
                description:"2014年9月28日至2014年12月15日，部分香港学生和市民在“港独”分子的挑唆下，非法占领香港中环地区，冲击政府，严重阻塞交通，扰乱社会秩序。"
            }];
            $scope.$on('$viewContentLoaded', function() {
                if($rootScope.mainController) {
                    console.log("zhishiku subject app start!!!");
                    App.runui();
                    $timeout(function(){
                        $(".description>div>p").hide();
                        $(".img-box").hover(function(){
                            $(this).find(".description>div").animate({"height":"100%","padding":"20px"},300,"linear");
                            $(this).find(".description>div>p").show();
                        },function(){
                            $(this).find(".description>div>p").hide();
                            $(this).find(".description>div").animate({"height":"80px","padding":"0 20px"},100,"linear");
                        });
                    },0);
                }
            });
        }])
    .controller("eventsController", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$stateParams", "$timeout",
        function($rootScope, $scope, $http, ngDialog, $state, $stateParams, $timeout) {
            console.log("eventsController", "start!!!");
            //页面UI初始化；
            $scope.subject = $stateParams.subject;
            $scope.events=[{
                id:0,
                time:"2017年6月26日",
                img:"/static/assets/img/zhishiku/yuejie.jpg",
                name:"印方阻挠中方施工",
                summary:"2017年6月26日，中方在洞朗地区进行道路施工时，遭到印军越线阻拦。由历史条约来看，中方修建道路完全是在自己领土上的主权行为，印方无权干涉，中方就此向印方做出通报。",
                keywords:[ {word:"洞朗",weight:1},{word:"阻挠",weight:1},{word:"修路",weight:1},{word:"印度",weight:0.98},{word:"中方",weight:0.9},{word:"冲突",weight:0.88} ,{word:"巡逻",weight:0.82},{word:"受伤",weight:0.75},{word:"边境",weight:0.7},{word:"不满",weight:0.67} ,{word:"边防",weight:0.47} ,{word:"激烈",weight:0.43},{word:"接触",weight:0.3},{word:"交涉",weight:0.21}]
            },{
                id:1,
                time:"2017年8月15日",
                img:"/static/assets/img/zhishiku/bangonghu.jpg",
                name:"中印士兵班公湖冲突",
                summary:"2017年8月15日，中印军队在班公湖北岸中印实控一线发生冲突，双方互掷石块且发生了肢体冲突，有部分人员受伤，随后双方退回营地。可以说，中国边防部队在本次冲突中更胜一筹，致使印度部队溃退到实控线印度一侧，而印媒却戏剧性地报道自己成功防御了中国的“入侵”。",
                keywords:[{word:"中印",weight:1},{word:"士兵",weight:0.98},{word:"对峙",weight:0.88},{word:"石块",weight:0.85},{word:"印度",weight:0.78},{word:"视频",weight:0.76},{word:"投掷",weight:0.7},{word:"推搡",weight:0.62},{word:"班公湖",weight:0.95},{word:"拉达克",weight:0.55},{word:"疑似",weight:0.52},{word:"时报",weight:0.43},{word:"中方",weight:0.37},{word:"中国",weight:0.33},{word:"环球",weight:0.22}]
            },{
                id:2,
                time:"2017年8月28日",
                img:"/static/assets/img/zhishiku/chebing.jpg",
                name:"中印双方撤军",
                summary:"2017年8月28日，中印双方达成共识，印方将越界人员和设备全部撤回边界印方一侧，中方对此进行了确认，至此，为期两个多月的中印对峙状态告一段落。中方表明将继续按照历史界约规定行使主权权利，维护边境地区的和平与安宁。",
                keywords:[{word:"撤军",weight:1} ,{word:"印度",weight:0.98} ,{word:"越界",weight:0.83} ,{word:"现场",weight:0.7},{word:"洞朗",weight:0.68} ,{word:"人员",weight:0.63} ,{word:"设备",weight:0.63} ,{word:"修路",weight:0.54} ,{word:"权利",weight:0.41} ,{word:"维护",weight:0.3},{word:"外交部",weight:0.9},{word:"国防部",weight:0.7},{word:"主权",weight:0.6},{word:"结束",weight:0.5}]
            }];
            $scope.$on('$viewContentLoaded', function() {
                if($rootScope.mainController) {
                    console.log("events app start!!!");
                    App.runui();
                    $timeout(drawClouds,0);
                }
            });
            function drawClouds() {
                $scope.events.forEach(function (d) {
                    var doms = "wordsCloud_" + d.id;
                    if(document.getElementById(doms) != undefined) {
                        //console.log("aaa");
                        var chart = echarts.init(document.getElementById(doms));
                        var options = {
                            series: [{
                                type: 'wordCloud',
                                gridSize: 1,
                                sizeRange: [3, 40],
                                rotationRange: [0, 180],
                                rotationStep: 20,
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
                        d.keywords.forEach(function (d) {
                            var tt = {};
                            tt.name = d.word;
                            tt.value = d.weight*100;
                            keylists.push(tt);
                        });
                        console.log(keylists);
                        options.series[0].data = keylists;
                        chart.setOption(options);
                    }
                });
            }
        }]).controller("communityController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("zhishikuController", "start!!!");
        //页面UI初始化；
        var data=null;
        $http({
            method:"get",
            url:"/static/assets/data/zhishiku/community.json"
        }).then(function(res){
            data=res.data;
            console.log(data);
            var nodes=[],edges=[],nodesl=0,edge_count=3;
            for (var key in data)
            {
                var color = "rgb("+[~~(Math.random()*200),~~(Math.random()*200),~~(Math.random()*200)].join(',')+")",
                    color_index=0;
                if(key=="user")
                    continue;
                data[key].forEach((d,index)=>{
                    for(var i=0; i<edge_count; i++)
                {
                    var edge={};
                    edge.source=nodes.length;
                    var i2 = 0;
                    // console.log(~~(Math.random()*data[key].length));
                    while((i2=~~(Math.random()*data[key].length))==index);
                    edge.target=nodesl+i2;
                    edges.push(edge);
                }
                d.group=key;
                d.color=color_index++;
                nodes.push(d);
            });
                nodesl+=data[key].length;
            }
            edges.forEach(edge=>{
                edge.source=(nodes[edge.source]||edge.source);
            edge.target=(nodes[edge.target]||edge.target);
        });
            drawForceGraph("#communityGraph",nodes,edges);
        },function(res){
            console.log(res);
        });
        function drawForceGraph(dom,nodes,edges)
        {
            var width = $(dom).width(),
                height = $(dom).height(),
                force = d3.layout.force()
                    .nodes(d3.values(nodes))
                    .links(edges)
                    .size([width, height])
                    .linkDistance(100)
                    .charge(-8)
                    .on("tick", tick)
                    .start();
            var svg = d3.select(dom).append("svg")
                .attr("width", width)
                .attr("height", height)
                .on("zoom",);
            var link = svg.selectAll(".link")
                .data(force.links())
                .enter().append("line")
                .attr("class", "link");
            link.style("stroke",function(d){//  设置线的颜色
                return d.source.color;
            })
                .style("stroke-width",function(d,i){//设置线的宽度
                    return 0;
                });
            var node = svg.selectAll(".node")
                .data(force.nodes())
                .enter().append("g")
                .attr("class", "node")
                .on("mouseover", mouseover)
                .on("mouseout", mouseout)
                .call(force.drag);
            function  radius (d){
                if(!d.weight){//节点weight属性没有值初始化为1（一般就是叶子了）
                    d.weight=1;
                }
                return Math.log(d.weight)*2;
            }
            node.append("circle")
                .attr("r",function(d){  //设置圆点半径
                    return radius (d);
                })
                .style("fill",function(d){ //设置圆点的颜色
                    return d.color;
                });

            node.append("text")
                .attr("x", 12)
                .attr("dy", ".35em")
                .text(function(d) { return ""; });
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
            }

            function mouseover() {
                d3.select(this).select("circle").transition()
                    .duration(750)
                    .attr("r", function(d){  //设置圆点半径
                        return radius (d)+10;
                    }) ;
            }

            function mouseout() {
                d3.select(this).select("circle").transition()
                    .duration(750)
                    .attr("r", function(d){  //恢复圆点半径
                        return radius (d);
                    }) ;
            }
        }
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
            }
        });
    }]).controller("eventdetailController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("eventdetailController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
                $(".description>div>p").hide();
                $(".img-box").hover(function(){
                    $(this).find(".description>div").animate({"height":"100%","padding":"20px"},500,"linear");
                    $(this).find(".description>div>p").show();
                },function(){
                    $(this).find(".description>div>p").hide();
                    $(this).find(".description>div").animate({"height":"80px","padding":"0 20px"},500,"linear");
                });
            }
        });
    }]).controller("behaviouralController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("behaviouralController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
                $(".description>div>p").hide();
                $(".img-box").hover(function(){
                    $(this).find(".description>div").animate({"height":"100%","padding":"20px"},500,"linear");
                    $(this).find(".description>div>p").show();
                },function(){
                    $(this).find(".description>div>p").hide();
                    $(this).find(".description>div").animate({"height":"80px","padding":"0 20px"},500,"linear");
                });
            }
        });
    }]).controller("sentimentController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("sentimentController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
            }
        });
    }]).controller("viewpointController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("viewpointController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
            }
        });
    }]).controller("evolutionaryController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("evolutionaryController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();

                $http({
                    method:"get",
                    url:"/static/assets/data/zhishiku/da_v.json"
                }).then(function(res){
                    var counts = (res.data);
                    var ti=[],dat=[[],[],[]];
                    var type=['大V数','帖子数/10','热度']
                    var mychart = echarts.init(document.getElementById('hot'));
                    counts.forEach(function (d) {
                        ti.push(d.time);
                        dat[0].push(+d.da_v);
                        dat[1].push(+(d.tiezi/10));
                        dat[2].push(+d.redu);
                    });
                    console.log(dat[1])
                    var option1 = {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'shadow',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        toolbox: {
                            feature: {
                                dataView: {show: true, readOnly: false},
                                magicType: {show: true, type: ['line', 'bar']},
                                restore: {show: true},
                                saveAsImage: {show: true}
                            }
                        },
                        legend: {
                            data:type
                        },
                        xAxis: [
                            {
                                type: 'category',
                                data: ti,

                            },
                            // {
                            //     splitLine:'5',
                            // }
                        ],
                        yAxis: [
                            {
                                type: 'value',


                            },

                        ],
                        series: [
                            {
                                name:'大V数',
                                type:'bar',
                                // color:'blue',
                                barWidth:'25',
                                barGap:'10%',
                                data:dat[0]
                            },
                            {
                                name:'帖子数/10',
                                type:'bar',
                                barWidth:'25',
                                barGap:'10%',
                                data:dat[1]
                            },
                            {
                                name:'热度',
                                type:'line',
                                // yAxisIndex: 1,
                                data:dat[2]
                            }
                        ]
                    };
                    mychart.setOption(option1);
                },function(res){
                    // console.log(res);
                });

                $http({
                    method:"get",
                    url:"/static/assets/data/zhishiku/evolu.json"
                }).then(function(res) {
                    var ex = res.data;
                    var leg = [],ti=[],dat=[];
                    var topics=[]
                    for(var i=0;i<6;i++){
                        dat[i]=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];}
                    ex.forEach(function (d) {
                        if(leg.indexOf(d.topic)==-1)
                            leg.push(d.topic);
                        if(ti.indexOf(d.time)==-1)
                            ti.push(d.time);
                        ti.sort();
                        var tmp = +d.time.charAt(d.time.length-2)+d.time.charAt(d.time.length-1);
                        // console.log(tmp)
                        dat[d.type-1][tmp-15]=d.num;
                        if(topics[topics.length-1]!=d.topic)
                            topics.push(d.topic);


                    });

                    var mychart = echarts.init(document.getElementById('test'));
                    var option= {
                        tooltip: {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'cross',
                                label: {
                                    backgroundColor: '#6a7985'
                                }
                            }
                        },
                        legend: {data: leg},
                        toolbox: {
                            feature: {
                                saveAsImage: {}
                            }
                        },
                        grid: {
                            left: '3%',
                            right: '4%',
                            bottom: '3%',
                            containLabel: true
                        },
                        xAxis: [
                            {
                                type: 'category',
                                boundaryGap: false,
                                data: ti
                            }
                        ],
                        yAxis: [
                            {
                                type: 'value'
                            }
                        ],
                        series: [
                            {
                                name: leg[0],
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: dat[0]
                            },
                            {
                                name: leg[1],
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: dat[1]
                            },
                            {
                                name: leg[2],
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: dat[2]
                            },
                            {
                                name: leg[3],
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: dat[3]
                            },
                            {
                                name: leg[4],
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: dat[4]
                            },
                            {
                                name: leg[5],
                                type: 'line',
                                // stack: '总量',
                                areaStyle: {normal: {}},
                                data: dat[5]
                            },
                        ]
                    };
                    // console.log(ti);
                    // option.xAxis[0].data=ti;
                    mychart.setOption(option);
                },function(res){
                    console.log(res);
                });
            }
        });
    }]).controller("guidanceController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("guidanceController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
                $http({
                    method:"get",
                    url:"/static/assets/data/zhishiku/yindao.json"
                }).then(function(res){
                    $scope.guideData = res.data;
                    console.log($scope.guideData);
                },function (res) {

                });


                $(".description>div>p").hide();
                $(".img-box").hover(function(){
                    $(this).find(".description>div").animate({"height":"100%","padding":"20px"},500,"linear");
                    $(this).find(".description>div>p").show();
                },function(){
                    $(this).find(".description>div>p").hide();
                    $(this).find(".description>div").animate({"height":"80px","padding":"0 20px"},500,"linear");
                });
            }
        });
    }]);