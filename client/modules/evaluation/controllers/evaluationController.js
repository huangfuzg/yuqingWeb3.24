"use strict";
CQ.mainApp.dkController
    .controller("dkController", ["$rootScope", "$scope","$stateParams","$http","ngDialog", "notice","DKFacService",function($rootScope, $scope, $stateParams,
        $http,ngDialog, notice,DKFacService) {
        console.log("dkController started");
        $scope.allcontents=[
            {
            id:0,
            name:"中印对峙",
            state:"无需引导",
            img:"/static/assets/img/zhishiku/zydz.jpg",
            description:"2017年6月18日至2017年8月28日，印度边防部队非法越过边界线进入了中方境内，阻挠中国边防部队在洞朗地区的正常活动，双方在该地区紧张对峙两个多月。"
            },
            {
            id:4,
            name:"中美贸易战",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/zmmy.jpg",
            description:"2018年中美贸易争端是中华人民共和国与美利坚合众国之间的一场贸易争端。2018年7月6日，特朗普政府正式对来自中国内地价值340亿美元的商品加征25%关税，标志着特朗对华关税政策正式实施。中国商务部其后在声明中指出，“美国违反世贸规则，发动了迄今为止经济史上规模最大的贸易战”。"
            },
            {
            id:5,
            name:"长春长生假疫苗",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/yimiao.jpg",
            description:"2018年7月15日，国家药品监督管理局发布通告指出，长春长生生物科技有限公司冻干人用狂犬病疫苗生产存在记录造假等行为。 这是长生生物自2017年11月份被发现百白破疫苗效价指标不符合规定后不到一年，再曝疫苗质量问题。"
        }];
        $http({
                method:"get",
                url:"/static/assets/data/zhishiku/evaluation.json",
            }).then(function (res) {
                $scope.today = res.data[res.data.length-1];
                console.log($scope.today);
        })

    }])
    .controller("evaluationController", ["$rootScope", "$scope","$stateParams","$http", "ngDialog", "notice",function($rootScope, $scope, $stateParams,
        $http, ngDialog, notice) {
        console.log("evaluationController started");
        //sessionStorage.clear();
        $scope.allcontents=[
            {
            id:0,
            name:"中印对峙",
            state:"无需引导",
            img:"/static/assets/img/zhishiku/zydz.jpg",
            description:"2017年6月18日至2017年8月28日，印度边防部队非法越过边界线进入了中方境内，阻挠中国边防部队在洞朗地区的正常活动，双方在该地区紧张对峙两个多月。"
            },
            {
            id:4,
            name:"中美贸易战",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/zmmy.jpg",
            description:"2018年中美贸易争端是中华人民共和国与美利坚合众国之间的一场贸易争端。2018年7月6日，特朗普政府正式对来自中国内地价值340亿美元的商品加征25%关税，标志着特朗对华关税政策正式实施。中国商务部其后在声明中指出，“美国违反世贸规则，发动了迄今为止经济史上规模最大的贸易战”。"
            },
            {
            id:5,
            name:"长春长生假疫苗",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/yimiao.jpg",
            description:"2018年7月15日，国家药品监督管理局发布通告指出，长春长生生物科技有限公司冻干人用狂犬病疫苗生产存在记录造假等行为。 这是长生生物自2017年11月份被发现百白破疫苗效价指标不符合规定后不到一年，再曝疫苗质量问题。"
        }];
        $scope.contents = $scope.allcontents;
        $scope.search = function(){
            $scope.contents = []
            console.log("search")
            console.log($scope.search_word)
            if($scope.search_word==undefined||$scope.search_word==""){
                $scope.contents = $scope.allcontents;
            }
            else{
                 angular.forEach($scope.allcontents, function(value, key){
                    var theme = value.name
                    if(theme.indexOf($scope.search_word)>=0)
                    {
                        $scope.contents.push(value)
                    }
                });
            } 
        }
    }])

    .controller("petcController", ["$rootScope", "$scope","$sce","$stateParams","$http", "ngDialog", "notice","DKFacService",function($rootScope, $scope, $sce,$stateParams,
        $http, ngDialog, notice,DKFacService) {
        console.log("petcController started");
        $rootScope.modelName = "PETC分析"
        $rootScope.need = true;
        $scope.id = $stateParams.id;
        if($stateParams.content==null){
            $rootScope.event = $scope.allcontents[+$scope.id];
        }
        else{
            $rootScope.event = $stateParams.content;
        }
        DKFacService.getDK_community().then(function(res){
            console.log(res)
            $scope.community = res;
            $scope.community1 = "敏感社团1:";
            $scope.community2 = "敏感社团2:";
            $scope.community3 = "敏感社团3:";
            $scope.showCommunity = [];
            angular.forEach($scope.community.data1.slice(50,53),function(value,index){
                let str = value.user_name + " ";
                $scope.community1  += str;
            })
            $scope.showCommunity.push($scope.community1);
            angular.forEach($scope.community.data2.slice(50,53),function(value,index){
                let str = value.user_name + " ";
                $scope.community2  += str;
            })
            $scope.showCommunity.push($scope.community2);
            angular.forEach($scope.community.data3.slice(50,53),function(value,index){
                let str = value.user_name + " ";
                $scope.community3  += str;
            })
            $scope.showCommunity.push($scope.community3);
            $scope.p = $sce.trustAsHtml($scope.showCommunity.join("\r\n").replace(/(\r\n)|(\n)/g,'<br>')); 
            console.log($scope.p)
        })

        DKFacService.getDK_opinion().then(function(res){
            console.log(res);
        })
    }])
    .controller("zhibiaoController", ["$rootScope", "$scope","$stateParams","$http", "ngDialog", "notice",function($rootScope, $scope, $stateParams,
        $http, ngDialog, notice) {
        console.log("zhibiaoController started");
        $rootScope.modelName = "指标体系构建"
        $rootScope.need = true;
        $scope.id = $stateParams.id;
        if($stateParams.content==null){
            $rootScope.event = $scope.allcontents[+$scope.id];
        }
        else{
            $rootScope.event = $stateParams.content;
        }
        function drawDetail(index){
            $scope.indexdata = index;
            // $scope.$apply()
            console.log(index)
            $scope.indexName = [];
            $scope.time = [];
            $scope.indexData = [];
            $scope.cname = index.name;
            $scope.indexName.push(index.name);
            angular.forEach(index.index,function(v,i){
                $scope.time.push(i)
                $scope.indexData.push(v)
            })
            // console.log($scope.time);
            // console.log($scope.indexData);
            let myChart1 = echarts.init(document.getElementById('detail'));
            var option1 = {
                title: {
                    text: '指标详情'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:$scope.indexName
                },
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
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data :  $scope.time
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : [
                    {
                        name:$scope.cname,
                        type:'line',
                        stack: '总量',
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                        areaStyle: {normal: {}},
                        data: $scope.indexData
                    }
                ]
            };
            myChart1.setOption(option1);
        }
        function drawTree(){
            let myChart = echarts.init(document.getElementById('zb'));
            myChart.clear();
            myChart.showLoading();
            $.get('/static/assets/data/zhibiao1.json', function (data) {
                myChart.hideLoading();
                myChart.setOption(option = {
                    tooltip: {
                        trigger: 'item',
                        triggerOn: 'click|mousemove',
                        // formatter:function(params){
                        //     console.log(params)
                        // }
                    },
                    series: [
                        {
                            type: 'tree',
                            data: [data],
                            top: '1%',
                            left: '20%',
                            bottom: '1%',
                            right: '10%',
                            //symbol:"arrow",
                            // "symbolSize": 60,
                            symbol:"image:///static/assets/img/click.svg",
                            symbolSize: 20,
                            label: {
                                normal: {
                                    position: 'left',
                                    verticalAlign: 'middle',
                                    align: 'right',
                                    fontSize: 14
                                }
                            },
                            leaves: {
                                label: {
                                    normal: {
                                        position: 'right',
                                        verticalAlign: 'middle',
                                        align: 'left'
                                    }
                                }
                            },
                            expandAndCollapse: true,
                            animationDuration: 550,
                            animationDurationUpdate: 750
                        }
                    ]
                });
            });
            
            $.get('/static/assets/data/ZhongMei_index.json', function (data) {
                //console.log(data);
                $scope.allindexs = data;
                drawDetail($scope.allindexs[0])
            })
            myChart.on('click',function(para){
                //console.log(para.data.name)
                $scope.indexName = [];
                $scope.time = [];
                $scope.indexData = [];
                angular.forEach($scope.allindexs, function(value, key){
                    //console.log(value)
                    if(para.data.name==value.name){
                        $scope.cindex = value;
                        
                    }
                });
                drawDetail($scope.cindex)
            })
        }  
        drawTree()
    }])
    .controller("rongheController", ["$rootScope", "$scope","$stateParams","$http", "ngDialog", "notice",function($rootScope, $scope, $stateParams,
        $http, ngDialog, notice) {
        console.log("rongheController started");
        $rootScope.modelName = "多元指标融合";
        $rootScope.need = false;
        $scope.id = $stateParams.id;
        if($stateParams.content==null){
            $rootScope.event = $scope.allcontents[+$scope.id];
        }
        else{
            $rootScope.event = $stateParams.content;
        }
        $scope.evaluation = {};
        $scope.scenedata = [];
        var evaluation = {};
        $scope.yd_data = {};
        var mychart1 = echarts.init(document.getElementById('scene'));
        var mychart = echarts.init(document.getElementById('yqts'));
        $http({
                method:"get",
                url:"/static/assets/data/zhishiku/evaluation.json",
            }).then(function (res) {
                evaluation = res.data;
                $scope.evaluations = res.data
                console.log(evaluation);
                drawLine()
                drawRadar()
        })

        $scope.getData = function(){
            console.log($scope.yd_data);
            angular.forEach(evaluation,function(index,item){
                        if($scope.yd_data.name!=undefined){
                            if($scope.yd_data.name===index.time){
                                 $scope.evaluation = evaluation[item];
                            }
                        }
                    })
                    angular.forEach($scope.evaluation.scene,function(index,item){
                        $scope.scenedata.push(+index)
                    })
                    $scope.scenedata = $scope.scenedata.slice(19);  
                    $scope.time = $scope.evaluation.time;       
                    mychart1.setOption({
                        legend: {
                            data: [`舆情场景 ${$scope.time}`],
                        },
                        series: [{
                            data : [
                                {
                                    value : $scope.scenedata,
                                    name : `舆情场景 ${$scope.time}`
                                },
                            ]
                        }]
                    });

        }
        function drawLine(){
            //var mychart = echarts.init(document.getElementById('yqts'));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    triggerOn:'mousemove|click',
                    axisPointer : { // 坐标轴指示器，坐标轴触发有效
                                type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                            },
                    formatter:function(params){
                        //console.log(params[0])
                        $scope.yd_data = params[0];
                        angular.forEach(evaluation,function(index,item){
                            if($scope.yd_data.name!=undefined){
                                if($scope.yd_data.name===index.time){
                                     $scope.evaluation = evaluation[item];
                                }
                            }
                        })
                        var str = '\
                                <table class="table table-bordered">\
                                    <tbody>\
                                        <tr>\
                                            <th>时间</th>\
                                            <td>'+$scope.evaluation.time+'</td>\
                                        </tr>\
                                        <tr>\
                                            <th>舆情态势值</th>\
                                            <td>'+$scope.evaluation.value+'</td>\
                                        </tr>\
                                        <tr>\
                                            <th>事件发展状态</th>\
                                            <td>'+$scope.evaluation.state+'</td>\
                                        </tr>\
                                        <tr>\
                                            <th>对应引导策略</th>\
                                            <td>'+$scope.evaluation.method+'</td>\
                                        </tr>\
                                    </tbody>\
                                </table>'
                        return str
                    }
                },
                title: {
                    left: '',
                },
                toolbox: {
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                legend: {
                    data:['当前舆情态势值','安全态势','爆发']
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: ["2017/8/15","2017/8/16","2017/8/17","2017/8/18","2017/8/19","2017/8/20","2017/8/21","2017/8/22","2017/8/23","2017/8/24","2017/8/25"]
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: [0, '100%']
                },
                dataZoom: [{
                    type: 'inside',
                    start: 20,
                    end: 100
                }, {
                    start: 0,
                    end: 10,
                    handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                series: [
                {
                    name: '当前舆情态势值',
                    type: 'line',
                    smooth: true,
                    symbol: 'circle',
                    symbolSize: 8,
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: 'rgb(255, 70, 131)'
                        }
                    },
                    data: [66,37,53,64,58,41,43,46,54,55,58]
                },
                {
                    name:'安全态势',
                    type:'line',
                    smooth:true,
                    stack: 'a',
                    symbol: 'none',
                    symbolSize: 5,
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#8ec6ad'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#8ec6ad'
                            }, {
                                offset: 1,
                                color: '#ffe'
                            }])
                        }
                    },
                    data: [60,60,60,60,60,60,60,60,60,60,60]
                },
                {
                    name:'爆发',
                    type:'line',
                    smooth:true,
                    stack: 'b',
                    symbol: 'none',
                    symbolSize: 5,
                    sampling: 'average',
                    itemStyle: {
                        normal: {
                            color: '#d68262'
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                offset: 0,
                                color: '#d68262'
                            }, {
                                offset: 1,
                                color: '#ffe'
                            }])
                        }
                    },
                    data: [50,50,50,50,50,50,50,50,50,50,50]
                }]
            };
            mychart.setOption(option);
        }
        function drawRadar(){
            mychart1.showLoading();
            $scope.evaluation = evaluation[evaluation.length-1];
            console.log($scope.evaluation)
            $scope.time = $scope.evaluation.time;
            console.log($scope.time)
            angular.forEach($scope.evaluation.scene,function(index,item){
                    $scope.scenedata.push(+index)
            })
            //$scope.scenedata = $scope.scenedata.slice(19); 
            //console.log($scope.scenedata)
            mychart1.hideLoading();
            var option1 = {
                            title: {
                            },
                            tooltip: {},
                            legend: {
                                data: [`舆情场景 ${$scope.time}`],
                                x:'left',
                                y:'top'
                            },
                            radar: {
                                name: {
                                    textStyle: {
                                        color: '#fff',
                                        backgroundColor: '#999',
                                        borderRadius: 3,
                                        padding: [3, 5]
                                   }
                                },
                                indicator: [
                                   { name: '话题集中度', max: 5},
                                   { name: '年龄分布', max: 5},
                                   { name: '地域分布 ', max: 5},
                                   { name: '平台分布 ', max: 5},
                                   { name: '参与人敏感度', max: 5},
                                   { name: '粉丝数量', max: 5},
                                   { name: '已产生时间', max: 5},
                                   { name: '识别准确率', max: 5},
                                   { name: '平台数', max: 5},
                                   { name: '主题集中度', max: 5},
                                   { name: '数据类型分布', max: 5},
                                   { name: '事件敏感度', max: 5},
                                   { name: '传播速度', max: 5},
                                   { name: '人群活跃度', max: 5},
                                   { name: '传播飙升度', max: 5},
                                   { name: '人群飙升度', max: 5},
                                   { name: '话题倾向性', max: 5},
                                   { name: '平台活跃度', max: 5},
                                   { name: '话题敏感度', max: 5}
                                ]
                            },
                            series: [{
                                type: 'radar',
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                data : [
                                    {
                                        value : $scope.scenedata,
                                        name : `舆情场景 ${$scope.time}`
                                    },
                                ]
                            }]
                        };
            mychart1.setOption(option1);
        }
       
    }])
    .controller("methodController", ["$rootScope", "$scope","$stateParams","$http", "ngDialog", "notice",function($rootScope, $scope, $stateParams,
        $http, ngDialog, notice) {
        console.log("methodController started");
        $rootScope.need = true;
        $rootScope.modelName = "导控策略选择";
        $scope.id = $stateParams.id;
        $rootScope.method1 = "";
        $rootScope.method2 = "";
        if($stateParams.content==null){
            $rootScope.event = $scope.allcontents[+$scope.id];
        }
        else{
            $rootScope.event = $stateParams.content;
        }
        function getResult(){
              $http({
                method:"get",
                url:"/static/assets/data/zhishiku/eval_result.json",
                }).then(function (res) {
                $scope.eval_results = res.data;
            })
        }
        getResult()
        $http({
                method:"get",
                url:"/static/assets/data/zhishiku/methodprovide.json",
                }).then(function (res) {
                $scope.alldata1 = res.data;
                $scope.alldata2 = res.data;
            })
        $scope.op1 = [];
        $scope.op2 = [];
        $rootScope.del = {"op":"1","selected":false};
        $rootScope.send = {"op":"2","selected":false};
        $rootScope.positive = {"op":"3","selected":false};
        $scope.addMethod = function() {
            ngDialog.open({
                template: '/static/modules/evaluation/pages/addMethod.html',
                controller: 'methodController',
                appendClassName: "ngdialog-theme-details",
                width: "100%",
                scope: $scope
            });
        };
        $scope.onAllSelected = function(d,type)
        {
            d.viewpoint.forEach(function(d1){
                d1.selected = d.selected;
                $scope.checkBoxChange(d1,d,type);
            });
        }
        $scope.checkBoxChange = function(d,v,type)
        {
            if(d.selected)
            {
                if(type.op=="1"){
                    for(var index = 0; index < $scope.op1.length; index++)
                    {
                        if($scope.op1[index].opinion == d.Content&&$scope.op1[index].c_id == v.id)
                            return;
                    }
                    $scope.op1.push({"opinion":d.Content,"c_id":v.id,"op":type.op});
                }
                if(type.op=="2"){
                    for(var index = 0; index < $scope.op2.length; index++)
                    {
                        if($scope.op2[index].opinion == d.Content&&$scope.op2[index].c_id == v.id)
                            return;
                    }
                    $scope.op2.push({"opinion":d.Content,"c_id":v.id,"op":type.op});
                }
            }
            else
            {
                if(type.op=="1"){
                    for(var index = 0; index < $scope.op1.length; index++)
                    {
                        if($scope.op1[index].opinion == d.Content&&$scope.op1[index].c_id == v.id)
                            $scope.op1.splice(index, 1);
                    }
                }
                if(type.op=="2"){
                    for(var index = 0; index < $scope.op2.length; index++)
                    {
                        if($scope.op2[index].opinion == d.Content&&$scope.op2[index].c_id == v.id)
                            $scope.op2.splice(index, 1);
                    }
                }
            }
            console.log("op1:",$scope.op1);
            console.log("op2:",$scope.op2);
        }
        $scope.showHistory = function(){
            $scope.history = true;
        }
        $scope.save = function(){
            $scope.method1 = "";
            angular.forEach($scope.op1, function(value, key){
                console.log(value,key)
                var del = "(社团id:"+ value.c_id + "——观点:" + value.opinion +")  ";
                $scope.method1 += del;
            });
            $scope.method2 = "";
            angular.forEach($scope.op2, function(value, key){
                console.log(value,key)
                var push = "(社团id:"+ value.c_id + "——观点:" + value.opinion +")  ";
                $scope.method2 += push;
            });
            $rootScope.method1 = $scope.method1
            $rootScope.method2 = $scope.method2
            $rootScope.del.selected = $scope.del.selected
            $rootScope.send.selected = $scope.send.selected
            $rootScope.positive.selected = $scope.positive.selected
            console.log($scope.method1);
            console.log($scope.method2);
            ngDialog.closeAll()
            console.log($scope.del.selected)
            console.log($scope.send.selected)
            console.log($scope.positive.selected)
        }

    }])
    // .controller("stepController", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$stateParams", "$timeout", 
    // function($rootScope, $scope, $http, ngDialog, $state, $stateParams, $timeout) {
    //     console.log("进入导控分析");
    //     $(function(){
    //         $('a[data-toggle="tab"]').on('show.bs.tab', function (e) {
    //             // 获取已激活的标签页的名称
    //             var activeTab = $(e.target).text(); 
    //             // 获取前一个激活的标签页的名称
    //             var previousTab = $(e.relatedTarget).text(); 
    //             $scope.stepNum = activeTab.split('')[6];
    //             console.log("当前页:",$scope.stepNum)
    //             $scope.$apply();
    //         });
    //     });
        
    //     if(sessionStorage.getItem("step1")!=null){
    //         $scope.step1 = sessionStorage.getItem("step1");
    //     }
    //     if(sessionStorage.getItem("next1")!=null){
    //         $scope.next1 = sessionStorage.getItem("next1");
    //     }
    //     if(sessionStorage.getItem("next2")!=null){
    //         $scope.next2 = sessionStorage.getItem("next2");
    //     }
    //     if(sessionStorage.getItem("steps")!=null){
    //         $scope.steps = sessionStorage.getItem("steps").split(',');
    //         //$scope.$apply();
    //     }
    //     console.log($scope.steps);
        
    //     $scope.steps = [true,false,false,false]
    //     $scope.id = $stateParams.id;
    //     if($stateParams.content==null){
    //         $scope.event = $scope.contents[+$scope.id];
    //     }
    //     else{
    //         $scope.event = $stateParams.content;
    //     }
    //     console.log($scope.event);
    //     $scope.stepNum = "1";
    //     $scope.showPETC = ()=>{
    //         $scope.step1 = true;
    //         sessionStorage.setItem("step1",$scope.step1)
    //     }
    //     $scope.drawZB = ()=>{
    //         $scope.next1 = true;
    //         sessionStorage.setItem("next1",$scope.next1)
    //         drawTree()
    //     }
    //     function drawTree(){
    //         let myChart = echarts.init(document.getElementById('zb'));
    //         myChart.clear();
    //         myChart.showLoading();
    //         $.get('/static/assets/data/zhibiao1.json', function (data) {
    //             myChart.hideLoading();
    //             // echarts.util.each(data.children, function (datum, index) {
    //             //     index % 2 === 0 && (datum.collapsed = true);
    //             // });
    //             myChart.setOption(option = {
    //                 tooltip: {
    //                     trigger: 'item',
    //                     triggerOn: 'mousemove'
    //                 },
    //                 series: [
    //                     {
    //                         type: 'tree',

    //                         data: [data],

    //                         top: '1%',
    //                         left: '7%',
    //                         bottom: '1%',
    //                         right: '10%',
    //                         symbolSize: 12,
    //                         label: {
    //                             normal: {
    //                                 position: 'left',
    //                                 verticalAlign: 'middle',
    //                                 align: 'right',
    //                                 fontSize: 12
    //                             }
    //                         },

    //                         leaves: {
    //                             label: {
    //                                 normal: {
    //                                     position: 'right',
    //                                     verticalAlign: 'middle',
    //                                     align: 'left'
    //                                 }
    //                             }
    //                         },
    //                         expandAndCollapse: true,
    //                         animationDuration: 550,
    //                         animationDurationUpdate: 750
    //                     }
    //                 ]
    //             });
    //         });
    //     }
    //     $scope.gostep = (i)=>{
    //         $scope.steps[i] = true;
    //         sessionStorage.setItem("steps",$scope.steps)
    //         $scope.stepNum = i+1+"";
    //         console.log("跳转到第"+(i+1)+"页");
    //         console.log($scope.stepNum);
            
    //     }
    //     $scope.evaluation = {};
    //     //$scope.time = "2017/8/25";
    //     $scope.scenedata = [4, 2, 4, 5, 3, 4, 5, 5, 5, 4, 5, 4, 5, 5, 5, 5, 4, 5, 4];
    //     var evaluation = {};
    //     $scope.yd_data = {};
    //     var mychart1 = echarts.init(document.getElementById('scene'));
    //     var mychart = echarts.init(document.getElementById('yqts'));
    //     $scope.getData = function(){
    //         console.log($scope.yd_data);
    //         //console.log(evaluation);
    //         angular.forEach(evaluation,function(index,item){
    //                     if($scope.yd_data.name!=undefined){
    //                         if($scope.yd_data.name===index.time){
    //                              $scope.evaluation = evaluation[item];
    //                         }
    //                     }
    //                 })
    //                 angular.forEach($scope.evaluation.scene,function(index,item){
    //                     $scope.scenedata.push(+index)
    //                 })
    //                 $scope.scenedata = $scope.scenedata.slice(19);  
   
    //                 $scope.time = $scope.evaluation.time;       
    //                 mychart1.setOption({
    //                     legend: {
    //                         data: [`舆情场景 ${$scope.time}`],
    //                     },
    //                     series: [{
    //                         data : [
    //                             {
    //                                 value : $scope.scenedata,
    //                                 name : `舆情场景 ${$scope.time}`
    //                             },
    //                         ]
    //                     }]
    //                 });
    //     }
       
    //     $scope.drawRH = ()=>{
    //         $scope.next2 = true;
    //         sessionStorage.setItem("next2",$scope.next2)
    //         mychart.clear();
    //         //mychart1.clear();
    //         mychart.showLoading();
    //         drawRadar()
    //         drawLine()
    //         setTimeout(()=>{
    //             mychart.hideLoading()
    //         },500)
    //     }
        
    //     $http({
    //             method:"get",
    //             url:"/static/assets/data/zhishiku/evaluation.json",
    //         }).then(function (res) {
    //             evaluation = res.data;
    //             $scope.evaluations = res.data
    //         })
    //     function drawRadar(){
    //         mychart1.showLoading();
    //         $scope.evaluation = evaluation[evaluation.length-1];
    //         $scope.time = $scope.evaluation.time;
    //         console.log($scope.time)
    //         angular.forEach($scope.evaluation.scene,function(index,item){
    //                 $scope.scenedata.push(+index)
    //         })
    //         $scope.scenedata = $scope.scenedata.slice(19); 
    //         console.log($scope.scenedata)
    //         mychart1.hideLoading();
    //         var option1 = {
    //                         title: {
    //                         },
    //                         tooltip: {},
    //                         legend: {
    //                             data: [`舆情场景 ${$scope.time}`],
    //                             x:'left',
    //                             y:'top'
    //                         },
    //                         radar: {
    //                             name: {
    //                                 textStyle: {
    //                                     color: '#fff',
    //                                     backgroundColor: '#999',
    //                                     borderRadius: 3,
    //                                     padding: [3, 5]
    //                                }
    //                             },
    //                             indicator: [
    //                                { name: '话题集中度', max: 5},
    //                                { name: '年龄分布', max: 5},
    //                                { name: '地域分布 ', max: 5},
    //                                { name: '平台分布 ', max: 5},
    //                                { name: '参与人敏感度', max: 5},
    //                                { name: '粉丝数量', max: 5},
    //                                { name: '已产生时间', max: 5},
    //                                { name: '识别准确率', max: 5},
    //                                { name: '平台数', max: 5},
    //                                { name: '主题集中度', max: 5},
    //                                { name: '数据类型分布', max: 5},
    //                                { name: '事件敏感度', max: 5},
    //                                { name: '传播速度', max: 5},
    //                                { name: '人群活跃度', max: 5},
    //                                { name: '传播飙升度', max: 5},
    //                                { name: '人群飙升度', max: 5},
    //                                { name: '话题倾向性', max: 5},
    //                                { name: '平台活跃度', max: 5},
    //                                { name: '话题敏感度', max: 5}
    //                             ]
    //                         },
    //                         series: [{
    //                             type: 'radar',
    //                             itemStyle: {normal: {areaStyle: {type: 'default'}}},
    //                             data : [
    //                                 {
    //                                     value : $scope.scenedata,
    //                                     name : `舆情场景 ${$scope.time}`
    //                                 },
    //                             ]
    //                         }]
    //                     };
    //             mychart1.setOption(option1);
    //     }
    //     function drawLine(){
    //         //var mychart = echarts.init(document.getElementById('yqts'));
    //         var option = {
    //             tooltip: {
    //                 trigger: 'axis',
    //                 triggerOn:'mousemove|click',
    //                 axisPointer : { // 坐标轴指示器，坐标轴触发有效
    //                             type : 'shadow' // 默认为直线，可选为：'line' | 'shadow'
    //                         },
    //                 formatter:function(params){
    //                     //console.log(params[0])
    //                     $scope.yd_data = params[0];
    //                     angular.forEach(evaluation,function(index,item){
    //                         if($scope.yd_data.name!=undefined){
    //                             if($scope.yd_data.name===index.time){
    //                                  $scope.evaluation = evaluation[item];
    //                             }
    //                         }
    //                     })
    //                     var str = '\
    //                             <table class="table table-bordered">\
    //                                 <tbody>\
    //                                     <tr>\
    //                                         <th>当前时间</th>\
    //                                         <td>'+$scope.evaluation.time+'</td>\
    //                                     </tr>\
    //                                     <tr>\
    //                                         <th>当前舆情态势值</th>\
    //                                         <td>'+$scope.evaluation.value+'</td>\
    //                                     </tr>\
    //                                     <tr>\
    //                                         <th>事件发展状态</th>\
    //                                         <td>'+$scope.evaluation.state+'</td>\
    //                                     </tr>\
    //                                     <tr>\
    //                                         <th>对应引导策略</th>\
    //                                         <td>'+$scope.evaluation.method+'</td>\
    //                                     </tr>\
    //                                 </tbody>\
    //                             </table>'
    //                     return str
    //                 }
    //             },
    //             title: {
    //                 left: '',
    //             },
    //             toolbox: {
    //                 feature: {
    //                     dataZoom: {
    //                         yAxisIndex: 'none'
    //                     },
    //                     restore: {},
    //                     saveAsImage: {}
    //                 }
    //             },
    //             legend: {
    //                 data:['当前舆情态势值','安全态势','爆发']
    //             },
    //             xAxis: {
    //                 type: 'category',
    //                 boundaryGap: false,
    //                 data: ["2017/8/15","2017/8/16","2017/8/17","2017/8/18","2017/8/19","2017/8/20","2017/8/21","2017/8/22","2017/8/23","2017/8/24","2017/8/25"]
    //             },
    //             yAxis: {
    //                 type: 'value',
    //                 boundaryGap: [0, '100%']
    //             },
    //             dataZoom: [{
    //                 type: 'inside',
    //                 start: 20,
    //                 end: 100
    //             }, {
    //                 start: 0,
    //                 end: 10,
    //                 handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
    //                 handleSize: '80%',
    //                 handleStyle: {
    //                     color: '#fff',
    //                     shadowBlur: 3,
    //                     shadowColor: 'rgba(0, 0, 0, 0.6)',
    //                     shadowOffsetX: 2,
    //                     shadowOffsetY: 2
    //                 }
    //             }],
    //             series: [
    //             {
    //                 name: '当前舆情态势值',
    //                 type: 'line',
    //                 smooth: true,
    //                 symbol: 'circle',
    //                 symbolSize: 8,
    //                 sampling: 'average',
    //                 itemStyle: {
    //                     normal: {
    //                         color: 'rgb(255, 70, 131)'
    //                     }
    //                 },
    //                 data: [66,37,53,64,58,41,43,46,54,55,58]
    //             },
    //             {
    //                 name:'安全态势',
    //                 type:'line',
    //                 smooth:true,
    //                 stack: 'a',
    //                 symbol: 'none',
    //                 symbolSize: 5,
    //                 sampling: 'average',
    //                 itemStyle: {
    //                     normal: {
    //                         color: '#8ec6ad'
    //                     }
    //                 },
    //                 areaStyle: {
    //                     normal: {
    //                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                             offset: 0,
    //                             color: '#8ec6ad'
    //                         }, {
    //                             offset: 1,
    //                             color: '#ffe'
    //                         }])
    //                     }
    //                 },
    //                 data: [60,60,60,60,60,60,60,60,60,60,60]
    //             },
    //             {
    //                 name:'爆发',
    //                 type:'line',
    //                 smooth:true,
    //                 stack: 'b',
    //                 symbol: 'none',
    //                 symbolSize: 5,
    //                 sampling: 'average',
    //                 itemStyle: {
    //                     normal: {
    //                         color: '#d68262'
    //                     }
    //                 },
    //                 areaStyle: {
    //                     normal: {
    //                         color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
    //                             offset: 0,
    //                             color: '#d68262'
    //                         }, {
    //                             offset: 1,
    //                             color: '#ffe'
    //                         }])
    //                     }
    //                 },
    //                 data: [50,50,50,50,50,50,50,50,50,50,50]
    //             }]
    //         };
    //         mychart.setOption(option);
    //         mychart.dispatchAction({type:'highlight',seriesIndex: 5,dataIndex: 2});

    //     }
    //     function drawTree2(){
    //         let myChart2 = echarts.init(document.getElementById('zb2'));
    //         myChart2.clear();
    //         myChart2.showLoading();
    //         $.get('/static/assets/data/zhibiao.json', function (data) {
    //             myChart2.hideLoading();
    //             // echarts.util.each(data.children, function (datum, index) {
    //             //     index % 2 === 0 && (datum.collapsed = true);
    //             // });
    //             myChart2.setOption(option = {
    //                 tooltip: {
    //                     trigger: 'item',
    //                     triggerOn: 'mousemove'
    //                 },
    //                 series: [
    //                     {
    //                         type: 'tree',

    //                         data: [data],

    //                         top: '1%',
    //                         left: '10%',
    //                         bottom: '1%',
    //                         right: '10%',
    //                         symbolSize: 12,
    //                         label: {
    //                             normal: {
    //                                 position: 'left',
    //                                 verticalAlign: 'middle',
    //                                 align: 'right',
    //                                 fontSize: 12
    //                             }
    //                         },
    //                         leaves: {
    //                             label: {
    //                                 normal: {
    //                                     position: 'right',
    //                                     verticalAlign: 'middle',
    //                                     align: 'left'
    //                                 }
    //                             }
    //                         },
    //                         expandAndCollapse: true,
    //                         animationDuration: 550,
    //                         animationDurationUpdate: 750
    //                     }
    //                 ]
    //             });
    //         });
    //     }
        
    // }])
    .controller("pgController", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$stateParams", "$timeout","notice", 
    function($rootScope, $scope, $http, ngDialog, $state, $stateParams, $timeout,notice) {
        console.log("进入成效评估");
        $scope.id = $stateParams.id;
        console.log($scope.id)
        $scope.contents=[{
            id:0,
            name:"中印对峙",
            state:"无需引导",
            img:"/static/assets/img/zhishiku/zydz.jpg",
            description:"2017年6月18日至2017年8月28日，印度边防部队非法越过边界线进入了中方境内，阻挠中国边防部队在洞朗地区的正常活动，双方在该地区紧张对峙两个多月。"
        },{
            id:1,
            name:"中美贸易战",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/sadebushu.jpg",
            description:"2016年7月以来，韩国和美国决定在驻韩美军基地部署“萨德”末段高空区域防御系统，遭到周边国家的强烈反对，中国民间和舆论爆发了对韩国的大规模抵制行动。"
            },{
            id:2,
            name:"长春长生假疫苗",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/nanhai.png",
            description:"2015年9月11日，印度军队和印藏边防警察部队派人越界拆毁了中国在建的哨所，双方军队遂在这一地区发生对峙。"
        },{
            id:3,
            name:"香港占中",
            state:"急需引导",
            img:"/static/assets/img/zhishiku/hkzz.jpg",
            description:"2014年9月28日至2014年12月15日，部分香港学生和市民在“港独”分子的挑唆下，非法占领香港中环地区，冲击政府，严重阻塞交通，扰乱社会秩序。"
        }];
        $scope.id = $stateParams.id;
        $scope.experts = [];
        if($stateParams.content==null){
            $scope.event = $scope.contents[+$scope.id];
        }
        else{
            $scope.event = $stateParams.content;
        }
        function getResult(){
              $http({
                method:"get",
                url:"/static/assets/data/zhishiku/eval_result.json",
                }).then(function (res) {
                $scope.eval_results = res.data;
            })
        }
        getResult();
        function draw(v){
                var ti=[],dat=[[],[],[]];
                var mychart3 = echarts.init(document.getElementById('compare'));
                $scope.eval_results.forEach(function (d) {
                ti.push(d.time);
                dat[0].push(+(d.result));
                dat[1].push(+(d.expert));
                dat[2].push(d.consistent*100);
                })
                var obj1 = {value:+v.result,
                    itemStyle:{
                            normal:{
                                color:'#CC3399',
                            }
                        },
                    label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            }
                }
                var obj2 = {
                    value:+v.expert,
                    itemStyle:{
                            normal:{
                                color:'steelblue',
                                }
                    },
                    label: {
                                normal: {
                                    show: true,
                                    position: 'top'
                                }
                            } 
                }
                var index = $scope.eval_results.findIndex((d)=>{
                    return d.time == v.time
                })
                dat[0].splice(index,1,obj1)
                dat[1].splice(index,1,obj2)
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
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
                        data:['引导成效','专家评价','一致率']
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ti,
                            axisPointer: {
                                type: 'shadow'
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '百分',
                            min: 0,
                            max: 100,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value} '
                            }
                        },
                        {
                            type: 'value',
                            name: '一致率',
                            min: 0,
                            max: 100,
                            interval: 20,
                            axisLabel: {
                                formatter: '{value} %'
                            }
                        }
                    ],
                    series: [
                        {
                            name:'引导成效',
                            type:'bar',
                            barWidth:'25',
                            barGap:'10%',
                            // markPoint : {
                            //     data : [
                            //         {name : '当前时间', value : +v.result}
                            //     ]
                            // },
                            // markPoint : {
                            //     data : [
                            //         {name : '年最高', value : 80},
                            //         {name : '年最低', value : 2.3}
                            //     ]
                            // },
                            // markPoint : {
                            //     symbol:'pin',
                            //     data:[{name:'当前选中'，value:100}]
                            // },
                            data:dat[0]
                        },
                        {
                            name:'专家评价',
                            type:'bar',
                            barWidth:'25',
                            barGap:'10%',
                            // markPoint : {
                            //     symbol:'pin',
                            //     data:[{name:'当前选中'，value:100}]
                            // },
                            // label: {
                            //     normal: {
                            //         show: true,
                            //         position: 'top'
                            //     }
                            // },
                            data:dat[1]
                        },
                        {
                            name:'一致率',
                            type:'line',
                            label:{
                            normal:{
                                show:true,
                                position:'top',
                                textStyle:{color:'#000000'}
                                },
                            },
                            yAxisIndex: 1,
                            data:dat[2]
                        }
                    ]
                };
                mychart3.setOption(option);      
        }      
        $scope.analyse = function(d){
            $scope.show_consistent = true;
            setTimeout(function(){
                var mychart3 = echarts.init(document.getElementById('compare'));
                draw(d)
            },0)
            console.log(d)
        }
        $scope.score = function(d){
            $scope.thing = d;
            console.log(d)
            ngDialog.open({
                    template: '/static/modules/evaluation/pages/score.html',
                    controller: 'pgController',
                    appendClassName: "ngdialog-theme-details",
                    width: "100%",
                    scope: $scope
                });
            $scope.pgdata = [];
            angular.forEach($scope.thing.dk,function(index,item){
                    $scope.pgdata.push(+index)
            })
            setTimeout(function(){
                var myChart4 = echarts.init(document.getElementById('pg'));
                var option4 = {
                            title: {
                                // text:"成效评估元素"
                            },
                            tooltip: {},
                            legend: {
                                data: [`舆情场景 ${$scope.thing.time}`],
                                x:'left',
                                y:'top'
                            },
                            radar: {
                                name: {
                                    textStyle: {
                                        color: '#fff',
                                        backgroundColor: '#999',
                                        borderRadius: 3,
                                        padding: [3, 5]
                                   }
                                },
                                indicator: [
                                   { name: '信息收集全面性', max: 5},
                                   { name: '引导策略适用度', max: 5},
                                   { name: '引导及时性 ', max: 5},
                                   { name: '信息收集及时性 ', max: 5},
                                   { name: '舆情研判准确程度', max: 5}
                    
                                ]
                            },
                            series: [{
                                type: 'radar',
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
                                data : [
                                    {
                                        value : $scope.pgdata,
                                        name : `舆情场景 ${$scope.thing.time}`
                                    },
                                ]
                            }]
                        };
                myChart4.setOption(option4);
            },400)
        }
    
        $scope.Doscore = function(){
            console.log($scope.expertScore)
            if($scope.expertScore==""||$scope.expertScore==undefined){
                notice.notify_info("required字段不能为空！");
            }
            else{
                 ngDialog.closeAll();
                 notice.notify_info("您好", "添加成功！", "", false, "", "");
                 $scope.thing.expert = $scope.expertScore;
                 $scope.thing.fin = true;
                 $scope.thing.consistent = +$scope.thing.expert>+$scope.thing.result?+$scope.thing.result/+$scope.thing.expert:+$scope.thing.expert/+$scope.thing.result;
                 console.log($scope.thing)
                 angular.forEach($scope.eval_results, function(value, key){
                     if(value.time == $scope.thing.time){
                        value.expert = $scope.expertScore;
                        value.fin = true;
                     }
                 });
                 //$scope.$apply()
            }
            console.log($scope.eval_results)
        }
    }])
  