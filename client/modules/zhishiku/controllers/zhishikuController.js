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
            keywords:[{word:"中印",weight:1},{word:"士兵",weight:0.98},{word:"对峙",weight:0.88},{word:"石块",weight:0.85},{word:"印度",weight:0.78},{word:"视频",weight:0.76},{word:"投掷",weight:0.7},{word:"推搡",weight:0.62},{word:"班公湖",weight:0.6},{word:"拉达克",weight:0.55},{word:"疑似",weight:0.52},{word:"时报",weight:0.43},{word:"中方",weight:0.37},{word:"中国",weight:0.33},{word:"环球",weight:0.22}]
        },{
            id:1,
            time:"2017年8月15日",
            img:"/static/assets/img/zhishiku/timg.jpg",
            name:"中印士兵班公湖冲突",
            summary:"2017年8月15日，中印军队在班公湖北岸中印实控一线发生冲突，双方互掷石块且发生了肢体冲突，有部分人员受伤，随后双方退回营地。可以说，中国边防部队在本次冲突中更胜一筹，致使印度部队溃退到实控线印度一侧，而印媒却戏剧性地报道自己成功防御了中国的“入侵”。",
            keywords:[{word:"中印",weight:1},{word:"士兵",weight:0.98},{word:"对峙",weight:0.88},{word:"石块",weight:0.85},{word:"印度",weight:0.78},{word:"视频",weight:0.76},{word:"投掷",weight:0.7},{word:"推搡",weight:0.62},{word:"班公湖",weight:0.6},{word:"拉达克",weight:0.55},{word:"疑似",weight:0.52},{word:"时报",weight:0.43},{word:"中方",weight:0.37},{word:"中国",weight:0.33},{word:"环球",weight:0.22}]
        },{
            id:2,
            time:"2017年8月28日",
            img:"/static/assets/img/zhishiku/chebing.jpg",
            name:"中印双方撤军",
            summary:"2017年8月28日，中印双方达成共识，印方将越界人员和设备全部撤回边界印方一侧，中方对此进行了确认，至此，为期两个多月的中印对峙状态告一段落。中方表明将继续按照历史界约规定行使主权权利，维护边境地区的和平与安宁。",
            keywords:[{word:"中印",weight:1},{word:"士兵",weight:0.98},{word:"对峙",weight:0.88},{word:"石块",weight:0.85},{word:"印度",weight:0.78},{word:"视频",weight:0.76},{word:"投掷",weight:0.7},{word:"推搡",weight:0.62},{word:"班公湖",weight:0.6},{word:"拉达克",weight:0.55},{word:"疑似",weight:0.52},{word:"时报",weight:0.43},{word:"中方",weight:0.37},{word:"中国",weight:0.33},{word:"环球",weight:0.22}]
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
                d.keywords.forEach(function (d) {
                    var tt = {};
                    tt.name = d.word;
                    tt.value = d.weight;
                    keylists.push(tt);
                });
                options.series[0].data = keylists;
                chart.setOption(options);
                }
            });
        }
    }]);