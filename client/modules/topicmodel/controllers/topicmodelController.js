"use strict";
CQ.mainApp.topicmodelController
.controller("modelController1", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$timeout", 
    function($rootScope, $scope, $http, ngDialog, $state, $timeout) {
        console.log("zhishikuController", "start!!!");
        //页面UI初始化；
        $scope.subjects=[
        {
            id:0,
            name:"高考",
            img:"/static/assets/img/zhishiku/zydz.jpg",
            description:"2017年6月18日至2017年8月28日，印度边防部队非法越过边界线进入了中方境内，阻挠中国边防部队在洞朗地区的正常活动，双方在该地区紧张对峙两个多月。"
        },
        // {
        //     id:1,
        //     name:"萨德部署",
        //     img:"/static/assets/img/zhishiku/sadebushu.jpg",
        //     description:"2016年7月以来，韩国和美国决定在驻韩美军基地部署“萨德”末段高空区域防御系统，遭到周边国家的强烈反对，中国民间和舆论爆发了对韩国的大规模抵制行动。"
        //     },{
        //     id:2,
        //     name:"南海争端",
        //     img:"/static/assets/img/zhishiku/nanhai.png",
        //     description:"2015年9月11日，印度军队和印藏边防警察部队派人越界拆毁了中国在建的哨所，双方军队遂在这一地区发生对峙。"
        // },
        // {
        //     id:3,
        //     name:"香港占中",
        //     img:"/static/assets/img/zhishiku/hkzz.jpg",
        //     description:"2014年9月28日至2014年12月15日，部分香港学生和市民在“港独”分子的挑唆下，非法占领香港中环地区，冲击政府，严重阻塞交通，扰乱社会秩序。"
        // },
        {
            id:4,
            name:"成考",
            img:"/static/assets/img/zhishiku/zmmy.jpg",
            description:"2018年中美贸易争端是中华人民共和国与美利坚合众国之间的一场贸易争端。2018年7月6日，特朗普政府正式对来自中国内地价值340亿美元的商品加征25%关税，标志着特朗对华关税政策正式实施。中国商务部其后在声明中指出，“美国违反世贸规则，发动了迄今为止经济史上规模最大的贸易战”。"
        },
        {
            id:5,
            name:"考研",
            img:"/static/assets/img/zhishiku/yimiao.jpg",
            description:"2018年7月15日，国家药品监督管理局发布通告指出，长春长生生物科技有限公司冻干人用狂犬病疫苗生产存在记录造假等行为。 这是长生生物自2017年11月份被发现百白破疫苗效价指标不符合规定后不到一年，再曝疫苗质量问题。"
        },];
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku subject app start!!!");
                App.runui();
                $timeout(function(){
                    // $("#subject > li :not(:first-child)").height($("#subject > li:nth-child(1)").height());
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
.controller("topictimeController", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$stateParams", "$timeout", 
    function($rootScope, $scope, $http, ngDialog, $state, $stateParams, $timeout) {
        console.log("eventsController", "start!!!");
        //页面UI初始化；
        $scope.subject = $stateParams.subject;
        $scope.events0=[{  //中印对峙
            id0:0,
            id:0,
            time:"2017年6月26日",
            img:"/static/assets/img/zhishiku/yuejie.jpg",
            name:"高考之前",
            summary:"2017年6月26日，中方在洞朗地区进行道路施工时，遭到印军越线阻拦。由历史条约来看，中方修建道路完全是在自己领土上的主权行为，印方无权干涉，中方就此向印方做出通报。",
            keywords:[ {word:"洞朗",weight:1},{word:"阻挠",weight:1},{word:"修路",weight:1},{word:"印度",weight:0.98},{word:"中方",weight:0.9},{word:"冲突",weight:0.88} ,{word:"巡逻",weight:0.82},{word:"受伤",weight:0.75},{word:"边境",weight:0.7},{word:"不满",weight:0.67} ,{word:"边防",weight:0.47} ,{word:"激烈",weight:0.43},{word:"接触",weight:0.3},{word:"交涉",weight:0.21}]        
        },{
            id0:0,
            id:1,
            time:"2017年8月15日",
            img:"/static/assets/img/zhishiku/bangonghu.jpg",
            name:"高考期间",
            summary:"2017年8月15日，中印军队在班公湖北岸中印实控一线发生冲突，双方互掷石块且发生了肢体冲突，有部分人员受伤，随后双方退回营地。可以说，中国边防部队在本次冲突中更胜一筹，致使印度部队溃退到实控线印度一侧，而印媒却戏剧性地报道自己成功防御了中国的“入侵”。",
            keywords:[{word:"中印",weight:1},{word:"士兵",weight:0.98},{word:"对峙",weight:0.88},{word:"石块",weight:0.85},{word:"印度",weight:0.78},{word:"视频",weight:0.76},{word:"投掷",weight:0.7},{word:"推搡",weight:0.62},{word:"班公湖",weight:0.95},{word:"拉达克",weight:0.55},{word:"疑似",weight:0.52},{word:"时报",weight:0.43},{word:"中方",weight:0.37},{word:"中国",weight:0.33},{word:"环球",weight:0.22}]
        },{
            id0:0,
            id:2,
            time:"2017年8月28日",
            img:"/static/assets/img/zhishiku/chebing.jpg",
            name:"高考之后",
            summary:"2017年8月28日，中印双方达成共识，印方将越界人员和设备全部撤回边界印方一侧，中方对此进行了确认，至此，为期两个多月的中印对峙状态告一段落。中方表明将继续按照历史界约规定行使主权权利，维护边境地区的和平与安宁。",
            keywords:[{word:"撤军",weight:1} ,{word:"印度",weight:0.98} ,{word:"越界",weight:0.83} ,{word:"现场",weight:0.7},{word:"洞朗",weight:0.68} ,{word:"人员",weight:0.63} ,{word:"设备",weight:0.63} ,{word:"修路",weight:0.54} ,{word:"权利",weight:0.41} ,{word:"维护",weight:0.3},{word:"外交部",weight:0.9},{word:"国防部",weight:0.7},{word:"主权",weight:0.6},{word:"结束",weight:0.5}]
        }
        ];

        $scope.events1 = [{ //假疫苗事件
            id0:1,
            id:0,
            'event':'国家药监局发通告',
            'time':'2018年7月15日',
            img:"/static/assets/img/zhishiku/ymev1.png",
            'name':'考研之前',
            'keywords':[{word:'药监局',weight:0.15},{word:'长春长生生物',weight:0.20},{word:'长生生物',weight:0.13},{word:'疫苗',weight:0.16},{word:'假疫苗',weight:0.21},{word:'狂犬疫苗',weight:0.32},{word:'疫苗造假',weight:0.11},{word:'造假',weight:0.58},{word:'举报',weight:0.61},{word:'高俊芳',weight:0.48},{word:'道德',weight:0.19},{word:'质量',weight:0.16}],
            'summary':'2018年7月15日，国家药品监督管理局发布通告称，长春长生生物科技有限责任公司在冻干人用狂犬病疫苗生产过程中存在记录造假等严重违反《药品生产质量管理规范》的行为，已责令长春长生停止生产狂犬疫苗。'
        },
        {
            id0:1,
            id:1,
            'event':'假疫苗事件处理结果',
            'time':'2018年8月16日',
            img:"/static/assets/img/zhishiku/ymev2.jpg",
            'name':'考研期间',
            'keywords':[{word:'长春长生生物',weight:0.23},{word:'长生生物',weight:0.46},{word:'疫苗',weight:0.10},{word:'假疫苗',weight:0.17},{word:'习近平',weight:0.28},{word:'药监局',weight:0.36},{word:'国务院',weight:0.08},{word:'中央政治局',weight:0.19},{word:'会议结果',weight:0.61},{word:'调查结果',weight:0.89},{word:'免职',weight:0.98},{word:'引咎辞职',word:0.90},{word:'责令辞职',weight:0.87}],
            'summary':'2018年8月16日，中共中央政治局常务委员会召开会议，听取关于吉林长春长生公司问题疫苗案件调查及有关问责情况的汇报。中共中央总书记习近平主持会议并发表重要讲话。会议同意，对金育辉（吉林省副省长，2017年4月起分管吉林省食品药品监管工作）予以免职，对李晋修（吉林省政协副主席，2015年12月-2017年4月任分管吉林省食品药品监管工作的副省长）责令辞职，要求刘长龙（长春市市长，2016年9月任长春市代市长，2016年10月至今任长春市市长）、毕井泉（市场监管总局党组书记、副局长，2015年2月-2018年3月任原食品药品监管总局局长）引咎辞职，要求姜治莹（吉林省委常委、延边朝鲜族自治州委书记，2012年3月-2016年5月任长春市委副书记、市长）、焦红（国家药监局局长）作出深刻检查；对35名非中管干部进行问责；决定中央纪委国家监委对吴浈（原食品药品监管总局副局长、原卫生计生委副主任，分管药化注册管理、药化监管和审核检验等工作）进行立案审查调查。会议责成吉林省委和省政府、国家药监局向中共中央、国务院作出深刻检查。'
        },
        {
            id0:1,
            id:2,
            'event':'假疫苗事件处理结果',
            'time':'2018年8月16日',
            img:"/static/assets/img/zhishiku/ymev2.jpg",
            'name':'考研之后',
            'keywords':[{word:'长春长生生物',weight:0.23},{word:'长生生物',weight:0.46},{word:'疫苗',weight:0.10},{word:'假疫苗',weight:0.17},{word:'习近平',weight:0.28},{word:'药监局',weight:0.36},{word:'国务院',weight:0.08},{word:'中央政治局',weight:0.19},{word:'会议结果',weight:0.61},{word:'调查结果',weight:0.89},{word:'免职',weight:0.98},{word:'引咎辞职',word:0.90},{word:'责令辞职',weight:0.87}],
            'summary':'2018年8月16日，中共中央政治局常务委员会召开会议，听取关于吉林长春长生公司问题疫苗案件调查及有关问责情况的汇报。中共中央总书记习近平主持会议并发表重要讲话。会议同意，对金育辉（吉林省副省长，2017年4月起分管吉林省食品药品监管工作）予以免职，对李晋修（吉林省政协副主席，2015年12月-2017年4月任分管吉林省食品药品监管工作的副省长）责令辞职，要求刘长龙（长春市市长，2016年9月任长春市代市长，2016年10月至今任长春市市长）、毕井泉（市场监管总局党组书记、副局长，2015年2月-2018年3月任原食品药品监管总局局长）引咎辞职，要求姜治莹（吉林省委常委、延边朝鲜族自治州委书记，2012年3月-2016年5月任长春市委副书记、市长）、焦红（国家药监局局长）作出深刻检查；对35名非中管干部进行问责；决定中央纪委国家监委对吴浈（原食品药品监管总局副局长、原卫生计生委副主任，分管药化注册管理、药化监管和审核检验等工作）进行立案审查调查。会议责成吉林省委和省政府、国家药监局向中共中央、国务院作出深刻检查。'
        }];

        $scope.events2 = [  //中美贸易战
        {
            id0:2,
            id:0,
            'event':'美方挑起贸易战',
            'time':'2018年3月1日',
            img:"/static/assets/img/zhishiku/zmev1.jpg",
            'name':'成考之前',
            'keywords':[{word:'关税',weight:0.15},{word:'中美',weight:0.20},{word:'贸易战',weight:0.13},{word:'特朗普',weight:0.16},{word:'进口',weight:0.21},{word:'出口',weight:0.32},{word:'钢铁',weight:0.11},{word:'铝',weight:0.58},{word:'中美经济',weight:0.61},{word:'征税',weight:0.48},{word:'措施',weight:0.19},{word:'反制裁',weight:0.16}],
            'summary':'2018年3月1日美方宣布，将在很长一段时期对钢铁和铝进口征收25%和10%的重税。但随后豁免盟友，最终被征收高关税的可能“只有中国”。'
        },
        {
            id0:2,
            id:1,
            'event':'美方制裁中兴',
            'time':'2018年4月16日',
            img:"/static/assets/img/zhishiku/zmev2.jpg",
            'name':'成考期间',
            'keywords':[{word:'中美',weight:0.28},{word:'贸易战',weight:0.34},{word:'中兴通讯',weight:0.85},{word:'制裁',weight:0.64},{word:'停牌',weight:0.55},{word:'芯片',weight:0.46},{word:'美国',weight:0.41},{word:'商务部',weight:0.61},{word:'股市',weight:0.77},{word:'股票',weight:0.12},{word:'出售',weight:0.13},{word:'自主',weight:0.15},{word:'伊朗',weight:0.26},{word:'禁令',weight:0.38}],
            'summary':'2018年4月16日美国商务部宣布，未来7年将禁止美国公司向中兴通讯销售零部件,商品,软件和技术。中兴通讯在A股和H股市场随后宣布停牌，其部分美国供货商的股票，在美国市场价格一度急跌。（事件缘由：2016年中兴违反美国禁令出口伊朗，于2017年3月8日和美国司法部,财政部,商务部达成和解。中兴2018年触发禁令原因，涉案35名员工奖金未扣。）'
        },
        {
            id0:2,
            id:2,
            'event':'美方变卦再次挑起贸易战',
            'time':'2018年7月6日',
            img:"/static/assets/img/zhishiku/zmev3.jpeg",
            'name':'成考之后',
            'keywords':[{word:'加征',weight:0.46},{word:'关税',weight:0.74},{word:'变卦',weight:0.47},{word:'中美',weight:0.16},{word:'贸易战',weight:0.28},{word:'特朗普',weight:0.36},{word:'海关',weight:0.24},{word:'进口',weight:0.78},{word:'出口',weight:0.14},{word:'反击',weight:0.41},{word:'斗争',weight:0.42},{word:'反制裁',weight:0.43}],
            'summary':'2018年7月6日，据美国海关和边境保护局消息，美国于当地时间7月6日00:01（北京时间6日12:01）起对第一批清单上818个类别,价值340亿美元的中国商品加征25%的进口关税。作为反击，中国也于同日对同等规模的美国产品加征25%的进口关税。'
        }]; 

        if($scope.subject.id == 0)
        {
            $scope.events = $scope.events0;

        }
        else if($scope.subject.id == 4)
        {
            $scope.events = $scope.events2;
        }
        else if($scope.subject.id == 5)
        {
            $scope.events = $scope.events1;
        }
        
        $scope.events.forEach(d=>d.from_subject = $scope.subject);
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
                var color = d3.scale.category10();
                var i = 0;
                var options = {
                    series: [{
                        type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [20, 38],
                        rotationRange: [0, 45],
                        rotationStep: 20,
                        shape: 'circle',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return color(i++);
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
    }])

.controller("deleteMyTopic", ["$rootScope", "$scope", "$http", "ngDialog", "notice",function($rootScope, $scope,
    $http, ngDialog, notice) {
    console.log("delete topic");
    $scope.deleteMyTopic = function() {
        $scope.removeUrl = $scope.baseUrl + "/template_delete";
        //$scope.removeUrl="http://118.190.133.203:8001/yqdata/template_delete";
        $http({
            params: {topicId : $scope.topic_id},
            //url:"http://118.190.133.203:8100/yqdata/deletetopic",
            url: $scope.removeUrl,
            method: 'get',
        })
        .success(function(data, status, headers, config){
            ngDialog.closeAll();
            notice.notify_info("您好！","话题删除成功！","",false,"","");
            $scope.reload_for_model($scope.topic_id,"delete");
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
}])
.controller("topicmodelController", ["$rootScope", "$scope","$stateParams","$http", "ngDialog", "notice",function ($rootScope,
    $scope, $stateParams,$http,ngDialog, notice)
    {
    console.log("topicmodelController", "start!!!");
    console.log($stateParams);
    $scope.exam_type=$stateParams.exam_type;
    $scope.exam_period=$stateParams.exam_period;
    //$scope.event = $stateParams.event;
    
    //console.log($scope.event.id);
    
    $scope.topic_id = null;
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                $scope.userId = 1;
                $scope.baseUrl = CQ.variable.RESTFUL_URL ;
                //htt:p//118.190.133.203:8100/yqdata/deletetopic
                var url = $scope.baseUrl+"/template_show";
                //var url="http://118.190.133.203:8001/yqdata/dataSourceTree";
                console.log($scope.exam_type)

                var sites = "";
                $scope.page = 0;
                $http({
                    params: {exam_type : $scope.exam_type,exam_period:$scope.exam_period},
                    //url:"http://118.190.133.203:8100/yqdata/deletetopic",
                    url: url,
                    method: 'get',
                })
                .success(function(data, status, headers, config){
                    // console.log("LZP");
                    // console.log(data);
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
                    console.log($scope.topicList);
                    $scope.moedelCount = $scope.topicList.length;
                    $scope.allsites = data.data.allSites;
                    $scope.modelCount=$scope.topicList.length;
                    $scope.getDataByPage($scope.page);
                    
                })
                .error(function(error){
                    notice.notify_info("您好！", "操作失败，请重试！" ,"",false,"","");
                });
                // $http.get(url).success(function(data){
                //     console.log("LZP");
                //     console.log(data);
                //     data.data.topicData.forEach(function(d){
                //         sites = "";
                //         d.siteLists.forEach(function(site){
                //             if(sites != "")
                //             {
                //                 sites += ",";
                //             }
                //             if(site.siteName)
                //             {
                //                 sites += site.siteName;
                //             }
                //         });
                //         d.sitesStr = sites;
                //     });
                //     $scope.topicList = data.data.topicData;
                //     $scope.topicCount = $scope.topicList.length;
                //     $scope.allsites = data.data.allSites;
                //     $scope.getDataByPage($scope.page);
                // });
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
                template: '/static/modules/topicmodel/pages/deleteMyTopic.html',
                controller: 'deleteMyTopic',
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
            console.log($scope.topic.topicId);
            $scope.jsonData = {};
            $scope.jsonData.userId = $scope.userId;
            $scope.jsonData.topicId = $scope.topic.topicId

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
            // console.log($scope.topic.topicKeywords);
            console.log($scope.topic.topicId);

            $scope.jsonData.sites = $scope.topic.siteLists;
            $scope.jsonData.exam_type=$scope.topic.exam_type;
            $scope.jsonData.exam_period=$scope.topic.exam_period;
            $scope.jsonData.topicId = $scope.topic.topicId
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
                        // console.log($scope.topic);
                    }
                    $scope.reload_for_model($scope.topic,"save");
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
        $scope.changetype1 = function()
        {
            document.getElementById("type2").style.display="inline-block";
            print("ZYZ1");
        }
        $scope.changetype2 = function()
        {
            document.getElementById("type3").style.display="inline-block";
            print($scope.topic);
        }
        $scope.changetype3 = function()
        {
            print($scope.topic);
        }
        //添加话题
        $scope.newTopic = function()
        {
            $scope.modelName = "添加话题模板";
            $scope.topic = {exam_type:$scope.exam_type,exam_period:$scope.exam_period,topicName:"",topicKeywords:[],siteLists:[]};
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
            $scope.submitUrl  = $scope.baseUrl + "/template_add";
             
            //$scope.submitUrl  ="http://118.190.133.203:8001/yqdata/template_add";
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
        $scope.reload_for_model = function(d,opretion)
        {
            // console.log(d);
            $("#myModal").modal('hide');
            if((opretion == "save" && $scope.modelName == "添加话题模板")&&
                ((d.exam_type==$scope.exam_type&&d.exam_period==$scope.exam_period)||
                    ($scope.exam_type==-1&&$scope.exam_period==-1)||
                    (d.exam_type==$scope.exam_type&&$scope.exam_period==-1)))
            {
                if(d.exam_type == 0) d.exam_type="高考";
                else if(d.exam_type == 1) d.exam_type="成考";
                else d.exam_type="研考";
                if(d.exam_period == 0) d.exam_period="之前";
                else if(d.exam_period == 1) d.exam_period="期间";
                else d.exam_period="之后";
                d.siteLists = d.siteLists || [];
                d.sitesStr = d.siteLists.map(d=>d.siteName).join(',');
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
                
                $scope.modelCount++;
                return true;
            }
            else if(opretion == "save" && $scope.modelName == "修改模板")
            {
                console.log("老子进来了1")
                if((d.exam_type==$scope.exam_type&&d.exam_period==$scope.exam_period)||
                    ($scope.exam_type==-1&&$scope.exam_period==-1)||
                    (d.exam_type==$scope.exam_type&&$scope.exam_period==-1))
                {
                                    console.log("老子进来了2")

                    if(d.exam_type == 0) d.exam_type="高考";
                    else if(d.exam_type == 1) d.exam_type="成考";
                    else d.exam_type="研考";
                    if(d.exam_period == 0) d.exam_period="之前";
                    else if(d.exam_period == 1) d.exam_period="期间";
                    else d.exam_period="之后";
                    d.siteLists = d.siteLists || [];
                    d.sitesStr = d.siteLists.map(d=>d.siteName).join(',');
                    for(var i = 0; i < $scope.topicList.length; i++)
                    {
                        console.log($scope.topicList[i].topicId,d.topicId)
                        if($scope.topicList[i].topicId == d.topicId)
                        {
                                                                console.log("老子进来了3")

                           $scope.topicList[i] = d;
                           $scope.pageData[i%$scope.pageSize] = d;
                           return true;
                       }
                   }
               }
               else{
                    for(var i = 1; i < $scope.topicList.length; i++)
                    {
                        if($scope.topicList[i].topicName == d.topicName)
                        {
                           $scope.topicList.splice(i,1);

                           $scope.getDataByPage($scope.page);
                           return true;
                       }
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
                        $scope.modelCount--;
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
        $scope.changeTopic = function(d)
        {
            console.log(d);
            var dd = JSON.parse(JSON.stringify(d));
            if(d.exam_type == "高考") dd.exam_type=0;
            else if(d.exam_type == "成考") dd.exam_type=1;
            else dd.exam_type=2;
            if(d.exam_period == "之前") dd.exam_period=0;
            else if(d.exam_period == "期间") dd.exam_period=1;
            else dd.exam_period=2;
            $scope.modelName = "修改模板";
            $scope.topicNameEnable = false;
            $scope.topic = JSON.parse(JSON.stringify(dd)) || {};
            console.log($scope.topic);
            for(var i = 0; i < $scope.topic.topicKeywords.length; i++)
            {
                $scope.topic.topicKeywords[i].str = $scope.topic.topicKeywords[i].toString();
            }
            console.log($scope.topic);
                    // console.log(new d.constructor());
                    $scope.submitUrl = $scope.baseUrl + "/template_modify";
                    // $scope.submitUrl = "http://118.190.133.203:8001/yqdata/template_modify";
                    // $scope.submitUrl = "http://118.190.30.115:8001/yqdata/template_modify";
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
    }]);

CQ.mainApp.systemsettingController.directive('nameexistCheck', nameexistCheck);
function nameexistCheck(){
    return {
        restrict: 'A',
        require: 'ngModel',
        link:function($scope,element,attrs,ctrl){
            // 同步验证
            ctrl.$validators.exist = function(modelValue, viewValue) {
                if($scope.modelName!='添加话题模板' || $scope.topicList == undefined)
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
