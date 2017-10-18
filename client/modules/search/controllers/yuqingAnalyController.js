"use strict";
CQ.mainApp.searchController
    .controller("yuqingAnalyController", ["$rootScope", "$scope", "$stateParams", function ($rootScope, $scope, $stateParams) {
        console.log("yuqingAnalyController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                App.runui();
                $scope.charts = $stateParams.charts;
                $scope.postLists = $stateParams.post;
                var postsData = $scope.postLists;
                var ndx = crossfilter(postsData),
                sum = 1,
                all = ndx.groupAll();
                setTimeout(draw,500);
                function draw()
                {
                  for(var i = 0; i < $scope.charts.length; i++)
                  {
                    drawChart($scope.charts[i],i);
                  }
                }
                function drawChart(layout,i)
                {
                  console.log(postsData);
                  if(layout.getNewData)
                  {
                    postsData = layout.getNewData(postsData);
                  } 
                  if(layout.layout.type == "barchart")
                  {
                    for(var index=0; index<postsData.length;index++)
                    {
                      if(postsData[index].value||layout.value)
                      {
                        postsData[index]["value_"+i] = postsData[index].value || layout.value;
                      }
                      if(postsData[index].key||layout.key!="")
                      {
                        postsData[index]["key_"+i] = postsData[index].key || postsData[index][layout.key];
                      }
                    }
                    var keyDist = dc.barChart("#chart_"+i),
                        width = $("#chart_"+i).width(),
                        height = $("#chart_"+i).height(),
                        keyDim = ndx.dimension(function(d) {
                            return d["key_"+i];
                        }),
                        keyGroup = keyDim.group().reduceSum(function (d) {
                            return +d["value_"+i];
                        });
                        drawBarkeyDist(keyDist, keyDim, keyGroup, width, height);
                  }
                  else if(layout.layout.type == "piechart")
                  {
                    for(var index=0; index<postsData.length;index++)
                    {
                      if(postsData[index].value||layout.value)
                      {
                        postsData[index]["value_"+i] = postsData[index].value || layout.value;
                      }
                      if(postsData[index].key||layout.key!="")
                      {
                        postsData[index]["key_"+i] = postsData[index].key || postsData[index][layout.key];
                      }
                    }
                    sum = all.reduceSum(function(d){return +d["value_"+i];}).value();
                    var keyDist = dc.pieChart("#chart_"+i),
                        width = $("#chart_"+i).width(),
                        height = $("#chart_"+i).height(),
                        keyDim = ndx.dimension(function(d) {
                            return d["key_"+i];
                        }),
                        keyGroup = keyDim.group().reduceSum(function (d) {
                            return +d["value_"+i];
                        });
                        drawPieDatatypeDist(keyDist, keyDim, keyGroup, width, height);
                  }
                  else if(layout.layout.type == "linechart")
                  {
                    for(var index=0; index<postsData.length;index++)
                    {
                      if(postsData[index].value||layout.value)
                      {
                        postsData[index]["value_"+i] = postsData[index].value || layout.value;
                      }
                      if(postsData[index].key||layout.key!="")
                      {
                        postsData[index]["key_"+i] = postsData[index].key || postsData[index][layout.key];
                      }
                    }
                    var keyDist = dc.lineChart("#chart_"+i),
                        width = $("#chart_"+i).width(),
                        height = $("#chart_"+i).height(),
                        keyDim = ndx.dimension(function(d) {
                            return d["key_"+i];
                        }),
                        keyGroup = keyDim.group().reduceSum(function (d) {
                            return +d["value_"+i];
                        });
                    var minx = keyDim.bottom(1)[0]["key_"+i],
                        maxx = keyDim.top(1)[0]["key_"+i];
                        drawLinekeyDist(keyDist, keyDim, keyGroup, width, height, minx, maxx);
                  }
                  else if(layout.layout.type == "forcechart")
                  {
                    // postsData = forceTest(postsData);
                    console.log(postsData);
                    postsData.nodes = [];
                    var findNodeByLabel = function(label)
                    {
                      for(var j=0;j<postsData.nodes.length;j++)
                      {
                        if(postsData.nodes[j].name == label)
                        {
                          return j;
                        }
                      }
                      return postsData.nodes.length;
                    }
                    for(var index=0; index<postsData.length;index++)
                    {
                      if(postsData[index].label)
                      {
                        var nodeindex = findNodeByLabel(postsData[index].label);
                        if(nodeindex==postsData.nodes.length)
                        {
                          var newNode = {};
                          newNode.name = postsData[index].label;
                          newNode.data = [];
                          newNode.data.push(postsData[index]);
                          postsData.nodes.push(newNode);
                        }
                        else
                        {
                          postsData.nodes[nodeindex].data.push(postsData[index]);
                        }
                      }
                    }
                    for(var index=0; index<postsData.edges.length;index++)
                    {
                      var sourceNodeIndex = findNodeByLabel(postsData.edges[index].source);
                      var targetNodeIndex = findNodeByLabel(postsData.edges[index].target);
                      if(sourceNodeIndex>=0&&sourceNodeIndex<postsData.nodes.length)
                      {
                        postsData.edges[index].source = postsData.nodes[sourceNodeIndex];
                      }
                      if(targetNodeIndex>=0&&targetNodeIndex<postsData.nodes.length)
                      {
                        postsData.edges[index].target = postsData.nodes[targetNodeIndex];
                      }
                    }
                    postsData["nodes_"+i] = postsData.nodes;
                    postsData["edges_"+i] = postsData.edges;
                    var svg = d3.select("#chart_"+i).append("svg"),
                        width = $("#chart_"+i).width(),
                        height = $("#chart_"+i).height();
                        svg.attr("width",width)
                            .attr("height",height);
                    drawForceDist(svg, width, height, postsData["nodes_"+i], postsData["edges_"+i]);
                  }
                  else if(layout.layout.type == "treechart")
                  {
                    var width = $("#chart_"+i).width()*0.9;//直径
                    var height = $("#chart_"+i).height()*0.9;
                    var svg = d3.select("#chart_"+i).append("svg")
                      .attr("width", width)
                      .attr("height", height)
                      .append("g")
                      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
                      drawTreeDist(svg);
                  }
                }
                function drawBarkeyDist(dayDist, dayDim, dayGroup, width, height){
                var chart = dayDist.width(width)
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
                        .renderHorizontalGridLines(true);
                chart.elasticX(true)
                    .xAxis()
                    .ticks(5);
                chart.yAxis()
                      .ticks(5)
                      .tickFormat(function(d){
                        return +d;
                      });
                dayDist.render();
            }
            function drawPieDatatypeDist(datatypeDist, datatypeDim, datatypeGroup, width, height) {  
                var r = width > height ? height * 0.4 : width * 0.4;
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
                datatypeDist.render();
            }
            function drawLinekeyDist(dayDist, dayDim, dayGroup, width, height, minx, maxx){
              console.log(minx);
              console.log(maxx);
                var chart = dayDist.width(width)
                        .height(height)
                        .margins({top: 20, right: 10, bottom: 28, left: 40})
                        .dimension(dayDim)
                        .group(dayGroup)
                        .elasticY(true)
                        .interpolate('step-before')
                        .renderArea(true)
                        .brushOn(true)
                        .renderDataPoints(true)
                        .yAxisPadding('10%') //设置y轴距离顶部的距离(为了renderLabel才设置)
                        .renderLabel(true)
                        .controlsUseVisibility(true)
                        .x(d3.scale.ordinal())
                        .xUnits(dc.units.ordinal)
                        // .x(d3.scale.linear().domain([minx,maxx]))
                        .renderHorizontalGridLines(true);
                    chart.elasticX(true)
                    .xAxis()
                    .ticks(5);
                chart.yAxis()
                      .ticks(5)
                      .tickFormat(function(d){
                        return +d;
                      });
                dayDist.render();
            }
            function drawForceDist(svg,width,height,nodes,edges)
            {
              var force = d3.layout.force()
                    .nodes(nodes) //指定节点数组
                    .links(edges) //指定连线数组
                    .size([width,height]) //指定作用域范围
                    .linkDistance(30) //指定连线长度
                    .charge([-100]);
              force.start();
              var svg_edges = svg.selectAll("line")
                               .data(edges)
                               .enter()
                               .append("line")
                               .style("stroke","#ccc")
                               .style("stroke-width",1);
                           
             var color = d3.scale.category20();
             
             //添加节点 
             var svg_nodes = svg.selectAll("circle")
                 .data(nodes)
                 .enter()
                 .append("circle")
                 .attr("r",function(d){return d.data.length*10;})
                 .style("fill",function(d,i){
                     return color(i);
                 })
                 .call(force.drag);  //使得节点能够拖动
             
             //添加描述节点的文字
             var svg_texts = svg.selectAll("text")
                 .data(nodes)
                 .enter()
                 .append("text")
                 .style("fill", "black")
                 .attr("dx", 20)
                 .attr("dy", 8)
                 .text(function(d){
                    return d.name;
                 });
                force.on("tick", function(){ //对于每一个时间间隔
                    //更新连线坐标
                    svg_edges.attr("x1",function(d){ return d.source.x; })
                        .attr("y1",function(d){ return d.source.y; })
                        .attr("x2",function(d){ return d.target.x; })
                        .attr("y2",function(d){ return d.target.y; });
                 
                    //更新节点坐标
                    svg_nodes.attr("cx",function(d){ return d.x; })
                        .attr("cy",function(d){ return d.y; });
                 
                    //更新文字坐标
                    svg_texts.attr("x", function(d){ return d.x; })
                       .attr("y", function(d){ return d.y; });
                 });
            }
            function drawTreeDist(svg)
            {
              //(1)树指定径向布局大小和节点邻距
              var tree = d3.layout.tree()
                  .size([360,  360])// 角度360度，半径360px
                  .separation(function(a, b) { 
                    return (a.parent == b.parent ? 1 : 2) / a.depth;// 父节点相同的节点邻距相等，不同的稍宽一点用来区分开
                  });

              var diagonal = d3.svg.diagonal.radial()//(2)指定为径向布局
                  .projection(function(d) { 
                    return [d.y, d.x / 180 * Math.PI];// 半径d.y和角度d.x / 180 * Math.PI（转换成弧度制） 
                  });

              
              //(3)加载json
                var root1 = {
                     "name": "AAA",
                     "children": 
                     [
                          { "name": "BBB", 
                            "children": 
                            [
                                {"name": "CCC", 
                                "children": 
                                [
                                      {"name": "DDD", 
                                       "children":
                                         [
                                                {"name": "EEE", "size": 73},
                                                {"name": "EEE", "size": 39},
                                                {"name": "EEE", "size": 67},
                                                {"name": "EEE", "size": 73},
                                                {"name": "EEE", "size": 39},
                                                {"name": "EEE", "size": 67},
                                                {"name": "EEE", "size": 73},
                                                {"name": "EEE", "size": 39},
                                                {"name": "EEE", "size": 67},
                                                {"name": "EEE", "size": 73},
                                                {"name": "EEE", "size": 39},
                                                {"name": "EEE", "size": 67},
                                                {"name": "EEE", "size": 73},
                                                {"name": "EEE", "size": 39},
                                                {"name": "EEE", "size": 67},
                                                {"name": "EEE", "size": 73}
                                         ]},
                                        {"name": "DDD", "size": 73},
                                        {"name": "DDD", "size": 39},
                                        {"name": "DDD", "size": 67},
                                        {"name": "DDD", "size": 73},
                                        {"name": "DDD", "size": 39},
                                        {"name": "DDD", "size": 67},
                                        {"name": "DDD", "size": 73},
                                        {"name": "DDD", "size": 39},
                                        {"name": "DDD", "size": 67},
                                        {"name": "DDD", "size": 73},
                                        {"name": "DDD", "size": 39},
                                        {"name": "DDD", "size": 67},
                                        {"name": "DDD", "size": 73},
                                        {"name": "DDD", "size": 39},
                                        {"name": "DDD", "size": 67},
                                        {"name": "DDD", "size": 73}
                                ]},
                                {"name": "CCC", "size": 67},
                                {"name": "CCC", "size": 73},
                                {"name": "CCC", "size": 39},
                                {"name": "CCC", "size": 67},
                                {"name": "CCC", "size": 73},
                                {"name": "CCC", "size": 39},
                                {"name": "CCC", "size": 67},
                                {"name": "CCC", "size": 73},
                                {"name": "CCC", "size": 39},
                                {"name": "CCC", "size": 67},
                                {"name": "CCC", "size": 73},
                                {"name": "CCC", "size": 39},
                                {"name": "CCC", "size": 67},
                                {"name": "CCC", "size": 73},
                                {"name": "CCC", "size": 39},
                                {"name": "CCC", "size": 67},
                                {"name": "CCC", "size": 73}
                          ]
                          },
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73},
                          {"name": "BBB", "size": 39},
                          {"name": "BBB", "size": 67},
                          {"name": "BBB", "size": 73}
                     ]
                    };
                var nodes = tree.nodes(root1),//返回值是一个数组，每个节点上填充一些计算后的属性，例如深度，坐标等。
                    links = tree.links(nodes);//返回节点数组的连接数组
                //(4)为链接添加路径
                var link = svg.selectAll(".link")
                    .data(links)
                  .enter().append("path")
                    .attr("class", "link")
                    .attr("d", diagonal);
                //(5)节点转换位置
                var node = svg.selectAll(".node")
                    .data(nodes)
                    .enter().append("g")
                    .attr("class", "node")
                    .attr("transform", function(d) { return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")"; })
                //(6)节点添加圆圈
                node.append("circle")
                    .attr("r", 4.5);

                //(7)节点添加文字
                node.append("text")
                    .attr("dy", ".31em")
                    .attr("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })//小于180度的文字放在前面，否则放在后面
                    .attr("transform", function(d) { return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)"; })
                    .text(function(d) { return d.name; });
            }
            function forceTest(postsData)
            {
              for(var i = 0; i < 3; i++)
              {
                var newpost = JSON.parse(JSON.stringify(postsData));
                postsData.concat(newpost);
              }
              var labels = ["news","tieba","luntan","search","weixin","qq","other"];
              for(var i=0; i<postsData.length; i++)
              {
                var labeli = ~~(Math.random()*labels.length);
                postsData[i].label = labels[labeli];
              }
              var ecount = 5;
              var edges = [];
              for(var i=0; i<ecount; i++)
              {
                var edge = {};
                var labeli = ~~(Math.random()*labels.length);
                edge.source = labels[labeli];
                labeli = ~~(Math.random()*labels.length);
                edge.target = labels[labeli];
                edges.push(edge);
              }
              postsData.edges = edges;
              return postsData;
            }
            }
        });
        
   }]);