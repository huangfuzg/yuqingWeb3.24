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
    }]).controller("communityController", ["$rootScope", "$scope", "$http", "ngDialog", "$state", "$timeout", 
    function($rootScope, $scope, $http, ngDialog, $state, $timeout) {
        console.log("zhishikuController", "start!!!");
        //页面UI初始化；
        $timeout(function(){
            $("#title").hide();
        },0);
        $rootScope.modelName="社团发现";
        var data=null;
        $http({
            method:"get",
            url:"/static/assets/data/zhishiku/community.json"
        }).then(function(res){
            data=res.data;
            console.log(data);
            var nodes=[],edges=[],nodesl=0,edge_count=2,color_index=0;
            for (var key in data)
            {
                var color = "rgb("+[~~(Math.random()*200),~~(Math.random()*200),~~(Math.random()*200)].join(',')+")";
                if(key=="user")
                    continue;
                var usersNum={};
                data[key]=data[key].filter(d=>{
                    if(usersNum[d.user_id])
                        return false;
                    usersNum[d.user_id]=1;
                    return true;
                })
                nodesl=nodes.length;
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
                    d.color=color_index;
                    nodes.push(d);
                    data['user'].forEach(m=>{
                        if(m.user_id==d.user_id||m.user_name==d.user_id)
                        {
                            d.detail=m;
                        }
                    });
                });
                // nodesl+=data[key].length;
                color_index+=1;
            }
            edges.forEach(edge=>{
                edge.source=(nodes[edge.source]||edge.source);
                edge.target=(nodes[edge.target]||edge.target);
            });
            console.log(nodes);
            drawForceGraph("#communityGraph",nodes,edges);
        },function(res){
            console.log(res);
        });
        function drawForceGraph(dom,nodes,edges)
        {
            var width = $(dom).width(),
            height = $(dom).height(),
            img_w=20,
            img_h=20,
            color = d3.scale.category10(),
            force = d3.layout.force()  
                .nodes(d3.values(nodes))  
                .links(edges)  
                .size([width, height])
                .gravity(0.2) 
                .linkDistance(50)  
                .charge(-20)  
                .on("tick", tick)
                // .on("end",zoomed)  
                .start();
            var zoom = d3.behavior.zoom()
                .scaleExtent([1, 10])
                .on("zoom", zoomed);
            var svg = d3.select(dom).append("svg")  
                .attr("width", width)  
                .attr("height", height);
            svg.call(zoom);
            svg=svg.append("g");

            // svg.append("rect")
            //     .attr("class","title")
            //     .attr("width",100)
            //     .attr("height",100);
            // var title = svg.append("g");

            // title.append("rect").attr("width",100)
            //     .attr("height",100)
            //     .attr("class","title"); 
            // title.append("text")
            //     .attr("class","title")
            //     .text("test"); 
            var link = svg.selectAll(".link")  
                .data(force.links())  
                .enter().append("line")  
                .attr("class", "link");  
            link.style("stroke",function(d){//  设置线的颜色    
                return color(d.source.color+1);    
            })    
            .style("stroke-width",function(d,i){//设置线的宽度    
                return 0;    
            });
            console.log(nodes.filter(d=>d.detail!=undefined));
            var node = svg.selectAll(".node")  
                .data(nodes.filter(d=>d.detail==undefined))  
                .enter().append("g")  
                .attr("class", "node")  
                .on("mouseover", mouseover)  
                .on("mouseout", mouseout)  
                .call(force.drag);
            console.log(nodes.filter(d=>d.detail!=undefined));
            var node_img=svg.selectAll(".node-img")  
                .data(nodes.filter(d=>d.detail!=undefined))  
                .enter().append("g")  
                .attr("class", "node")  
                .on("mouseover", mouseover)  
                .on("mouseout", mouseout)  
                .call(force.drag);
            function  radius (d){   
                // if(!d.weight){//节点weight属性没有值初始化为1（一般就是叶子了）  
                //     d.weight=1;  
                // }                                                
                // return Math.log(d.weight)*2;
                return 4;                                     
            }
            var last_scale=1,
            cur_group="",
            transform={};
            function zoomed()
            {
                console.log(cur_group);
                var cluster={},
                group,k,tx,ty,
                closest=function(x,y)
                {
                    // console.log([x,y]);
                    var min_dis=Number.MAX_VALUE,
                    ret="";
                    // min_x_mid=min_dis,
                    // min_y_mid=min_dis;
                    for(var c in cluster)
                    {
                        var dis=(x-cluster[c].midX)*(x-cluster[c].midX)+(y-cluster[c].midY)*(y-cluster[c].midY);
                        if(c!='all'&&dis<min_dis)
                        {
                            min_dis=dis;
                            ret=c;
                            // min_x_mid=cluster[c].midX;
                            // min_y_mid=cluster[c].midY;
                        }
                    }
                    return ret;
                };
                nodes.forEach(d=>{
                    if(cluster[d.group])
                    {
                        if(cluster[d.group].x0>d.x)
                            cluster[d.group].x0=d.x;
                        else if(cluster[d.group].x1<d.x)
                            cluster[d.group].x1=d.x;
                        if(cluster[d.group].y0>d.y)
                            cluster[d.group].y0=d.y;
                        else if(cluster[d.group].y1<d.y)
                            cluster[d.group].y1=d.y;
                    }
                    else
                    {
                        cluster[d.group]={x0:d.x,x1:d.x,y0:d.y,y1:d.y};
                    }
                });
                cluster.all={x1:Number.NEGATIVE_INFINITY,x0:Number.MAX_VALUE,y1:Number.NEGATIVE_INFINITY,y0:Number.MAX_VALUE};
                for(var c in cluster)
                {
                    if(c!=="all")
                    {
                        cluster[c].midX=cluster[c].x0/2+cluster[c].x1/2;
                        cluster[c].midY=cluster[c].y0/2+cluster[c].y1/2;
                        cluster.all.x0=Math.min(cluster[c].x0,cluster.all.x0);
                        cluster.all.y0=Math.min(cluster[c].y0,cluster.all.y0);
                        cluster.all.y1=Math.max(cluster[c].y1,cluster.all.y1);
                        cluster.all.x1=Math.max(cluster[c].x1,cluster.all.x1);
                        cluster.all.midX=cluster.all.x0/2+cluster.all.x1/2;
                        cluster.all.midY=cluster.all.y0/2+cluster.all.y1/2;
                    }
                    // cluster[c].disMid=(x,y)=>(x-cluster[c].midX)*(x-cluster[c].midX)+(y-cluster[c].midY)*(y-cluster[c].midY);
                }
                console.log(cluster);
                // console.log(d3.event.translate);
                // console.log(d3.event.scale);
                // console.log(d3.event);
                if(cur_group=="")
                {
                    group='all',
                    // console.log(cluster[group]);
                    k = 0.9 / Math.max((cluster[group].x1 - cluster[group].x0) / width, (cluster[group].y1 - cluster[group].y0) / height),
                    tx = (width - k * (cluster[group].x0 + cluster[group].x1)) / 2,
                    ty = (height - k * (cluster[group].y0 + cluster[group].y1)) / 2;
                }
                else if(d3.event.scale>transform.lastScale&&cur_group=="all")
                {
                    group=closest(d3.event.sourceEvent.offsetX,d3.event.sourceEvent.offsetY),
                    k = 0.9 / Math.max((cluster[group].x1 - cluster[group].x0) / width, (cluster[group].y1 - cluster[group].y0) / height),
                    tx = (width - k * (cluster[group].x0 + cluster[group].x1)) / 2,
                    ty = (height - k * (cluster[group].y0 + cluster[group].y1)) / 2;
                    transform.min_scale=d3.event.scale;
                    transform.k=k;
                    transform.min_tx=tx-d3.event.translate[0];
                    transform.min_ty=ty-d3.event.translate[1];
                    showEdge(group);
                }
                else
                {
                    // console.log(transform);
                    // console.log(d3.event.scale);
                    if(d3.event.scale<transform.lastScale&&d3.event.scale<=transform.min_scale)
                    {
                        group='all',
                        k = 0.9 / Math.max((cluster[group].x1 - cluster[group].x0) / width, (cluster[group].y1 - cluster[group].y0) / height),
                        tx = (width - k * (cluster[group].x0 + cluster[group].x1)) / 2,
                        ty = (height - k * (cluster[group].y0 + cluster[group].y1)) / 2;
                        hideEdge();
                    }
                    else
                    {
                        k=d3.event.scale/transform.min_scale*transform.k;
                        tx=d3.event.translate[0]+transform.min_tx;
                        ty=d3.event.translate[1]+transform.min_ty;
                    }
                }
                svg.transition()
                    .attr("transform", 
                    "translate(" + tx + ',' + ty + ")scale(" + k + ")");
                transform.lastScale=d3.event.scale;
                cur_group=group||cur_group;
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
            node_img.append("image")  
            .attr("xlink:href",function(d){  //设置圆点半径                        
                return d.detail?d.detail.user_img:"";                            
             })
            .attr("width",img_w)
            .attr("height",img_h)
            .attr("transform","translate("+-img_w/2+","+-img_h/2+")");
            node.append("circle")  
                .attr("r",function(d){  //设置圆点半径                        
                return radius (d);                            
             })                                             
            .style("fill",function(d){ //设置圆点的颜色            
                return d.detail?"red":color(d.color);  
            });    
            var text = node.append("text")  
                .attr("x", 12)  
                .attr("dy", ".35em")
                .attr("class","title")  
                .text(function(d) { return ""; });
            var imgText=node_img.append("text")  
                .attr("x", 12)  
                .attr("dy", ".35em") 
                .attr("class","title")  
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
              node_img  
                  .attr("transform", function(d) {   
                        return "translate(" + d.x + "," + d.y + ")";   
                  });  
            }  
              
            function mouseover() { 
                // console.log(d3.event); 
                d3.select(this).select("text").text(function(d){
                    $("#title").html("userid: "+d.user_id+"<br/>group: "+d.group);
                    if(d.detail)
                    {
                        $("#title").append("<br/>username: "+d.detail.user_name+"<br/>"+"content: "+d.detail.content.slice(0,15)+"...");
                        if(d.detail.is_V==1)
                            $("#title").append("<br/>大V")
                    }
                    $("#title").css({"left":d3.event.clientX,"top":d3.event.clientY}).fadeIn('fast');
                    return "";
                });
              d3.select(this).select("circle").transition()  
                  .duration(250)  
                  .attr("r", function(d){  //设置圆点半径                        
                return radius (d)+10;                            
             }) ;
             d3.select(this).select("image").transition()  
                  .duration(250)  
                  .attr("width", img_w*2)
                  .attr("height", img_h*2)
                  .attr("transform","translate("+-img_w+","+-img_h+")") ;  
            }  
              
            function mouseout() {
              $("#title").fadeOut("fast");  
              d3.select(this).select("circle").transition()  
                  .duration(250)  
                  .attr("r", function(d){  //恢复圆点半径                        
                return radius (d);                            
             }) ;
             d3.select(this).select("image").transition()  
                  .duration(250)  
                  .attr("width", img_w)
                  .attr("height", img_h)
                  .attr("transform","translate("+-img_w/2+","+-img_h/2+")") ;         
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
        $rootScope.modelName="事件详情";
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
        $rootScope.modelName="行为分析";
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
        $rootScope.modelName="情感分析";
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
        $rootScope.modelName="观点挖掘";
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
        $rootScope.modelName="事件演化";
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
    }]).controller("guidanceController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("guidanceController", "start!!!");
        $rootScope.modelName="舆情引导";
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
    }]);