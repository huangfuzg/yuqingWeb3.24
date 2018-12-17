"use strict";
CQ.mainApp.dashboardController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                templateUrl: "/static/modules/dashboard/pages/dashboard.html",
                controller: "dashboardController",
                permission:'1'
            });
    }])
    .controller('dashboardController', ['$scope', '$rootScope', '$http', '$timeout','$state','ChartService', 'notice', 'SearchFacService',
        function($scope, $rootScope, $http,$timeout, $state, ChartService, notice, SearchFacService) {
            $rootScope.dashboardController = true;
            console.log("dashboardController", "start!");
            var option = {  
                tooltip : {},  
                series: [
                {
                    type: 'wordCloud',
                        gridSize: 2,
                        sizeRange: [12, 50],
                        rotationRange: [0, 0],
                        shape: 'pentagon',
                        textStyle: {
                            normal: {
                                color: function () {
                                    return 'rgba(' + [51,255,255,0.8
                                            // Math.round(Math.random() * 255),
                                            // Math.round(Math.random() * 255),
                                            // Math.round(Math.random() * 255)
                                        ].join(',') + ')';
                                }
                            },
                            emphasis: {
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                          data: [
                           {
                                name: 'Sam S Club',
                                value: 10000,
                            }, {
                                name: 'Macys',
                                value: 6181
                            }
                          ]
                }]  
            };
        //初始化整个地图
          var map = new BMap.Map("allmap");    // 创建Map实例
          
          //台湾
          //map.centerAndZoom(new BMap.Point(120.977318,23.720389), 11);  // 初始化地图,设置中心点坐标和地图级别
          //上海
          //map.centerAndZoom(new BMap.Point(121.487899,39.929986), 11);
          //北京
          map.centerAndZoom(new BMap.Point(104.335373, 34.366872), 10);
          //添加地图类型控件
          map.addControl(new BMap.MapTypeControl({
            mapTypes:[
                    BMAP_NORMAL_MAP
                ]}));   

          //map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放

          // 定义一个下拉列表
          function ZoomControl(){
            // 默认停靠位置和偏移量
            this.defaultAnchor = BMAP_ANCHOR_TOP_LEFT;
            this.defaultOffset = new BMap.Size(10, 10);
          }

          // 通过JavaScript的prototype属性继承于BMap.Control
          ZoomControl.prototype = new BMap.Control();

          // 自定义控件必须实现自己的initialize方法,并且将控件的DOM元素返回
          // 在本方法中创建个div元素作为控件的容器,并将其添加到地图容器中
          ZoomControl.prototype.initialize = function(map){
            // 创建一个DOM元素
            var select = document.createElement("select");
            select.id="myselect";
            // 添加文字说明
            //div.appendChild(document.createTextNode("放大2级"));
            // 设置样式
            select.style.cursor = "pointer";
            select.style.border = "1px solid gray";
            select.style.backgroundColor = "white";
            select.change=function(){
              console.log("hhhhh");
            }
            var id=new Array(0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33);
            var value=new Array("北京市","上海市","天津市","重庆市","黑龙江省","吉林省","辽宁省","内蒙古自治区","河北省","新疆维吾尔自治区","甘肃省",
              "青海省","陕西省","宁夏回族自治区","河南省","山东省", "山西省","安徽省","湖南省","湖北省","江苏省","四川省","贵州省","云南省",
              "广西壮族自治区","西藏自治区","浙江省","江西省","广东省","福建省","台湾省","海南省","香港特别行政区","澳门特别行政区");
            //通过DOM树取得下拉列表框元素
            select.length=1;//设置每次只能选择一个
            var option=document.createElement("option");
            option.setAttribute("value","");//设置option的属性值
              //在option元素下增加文本节点
            option.appendChild(document.createTextNode("中国"));
            option.selected=true;
            select.appendChild(option);
            for(var x=0;x<id.length;x++){
              //设置option中的内容,建立option节点
              var option=document.createElement("option");
              option.setAttribute("value",value[x]);//设置option的属性值
              //在option元素下增加文本节点
              option.appendChild(document.createTextNode(value[x]));
              
              //在select中增加option节点
              select.appendChild(option);
            }
            
            // select.options[0].selected=true;//设置第一个为默认选中
              // 绑定事件,点击一次放大两级
              // div.onclick = function(e){
              //   map.setZoom(map.getZoom() + 2);
              // }
              // 添加DOM元素到地图中
              map.getContainer().appendChild(select);
              console.log(select);
              // 将DOM元素返回
              return select;
          }

          // 创建控件
          var myZoomCtrl = new ZoomControl();
          // 添加到地图当中
          map.addControl(myZoomCtrl);
          $("#myselect").change(function(){
             var pro=$("#myselect").find("option:selected").text();
             if(pro=="中国"){
                map.clearOverlays();
                heatmap();
             }
             else{
              word_cloud(pro); 
            }
          });



          map.setMapStyle({
              styleJson:[
                  {
                            "featureType": "road",
                            "elementType": "all",
                            "stylers": {
                                      "visibility": "off"
                            }
                  },
                  {
                            "featureType": "poilabel",
                            "elementType": "all",
                            "stylers": {
                                      "visibility": "off"
                            }
                  },
                  {
                            "featureType": "manmade",
                            "elementType": "all",
                            "stylers": {
                                      "visibility": "off"
                            }
                  },
                  {
                            "featureType": "building",
                            "elementType": "all",
                            "stylers": {
                                      "visibility": "off"
                            }
                  }
          ]
          });
        map.setMapStyle({style:'midnight'});
        heatmap();


        function word_cloud(pro){
          map.clearOverlays();
          var boundary = new BMap.Boundary();
          boundary.get(pro, function(rs){
            var pointArray = [];
            for (var j = 0; j < rs.boundaries.length; j++) {
                var ply = new BMap.Polygon(rs.boundaries[j]); //建立多边形覆盖物
                map.addOverlay(ply);  //添加覆盖物
                pointArray = pointArray.concat(ply.getPath());
                if(j==rs.boundaries.length-1) map.setViewport(pointArray);
            }
            
            var czoom=7;
            if(pro=="新疆维吾尔自治区"||pro=="西藏自治区"||pro=="黑龙江省"||pro=="青海省"||pro=="内蒙古自治区"||pro=="甘肃省"||pro=="西藏自治区"||pro=="海南省") czoom=7;
            else if(pro=="辽宁省"||pro=="吉林省"||pro=="河北省"||pro=="陕西省"||pro=="宁夏回族自治区"||pro=="河南省"||pro=="山东省"||pro=="山西省"||pro=="安徽省"||pro=="湖南省"
              ||pro=="湖北省"||pro=="江苏省"||pro=="四川省"||pro=="贵州省"||pro=="云南省"||pro=="广西壮族自治区"||pro=="浙江省"||pro=="江西省"||pro=="广东省") czoom=8;
            else if(pro=="重庆市"||pro=="福建省"||pro=="台湾省") czoom=9;
            else if(pro=="北京市"||pro=="上海市"||pro=="天津市") czoom=10;
              $.getJSON("/static/assets/data/map/city.json", function (data){
                $.each(data, function (infoIndex, info){
                  if(pro==info["province"]){
                    map.setZoom(czoom);
                    option.series[0].data=info["keywords"];
                    var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(info["lng"],info["lat"]),300,200);
                    map.addOverlay(myCompOverlay);
                  }
                }) 
              })    
          });
          
        }

    //热力图
    function heatmap(){
      map.centerAndZoom(new BMap.Point(104.335373, 34.366872), 6);
      $.getJSON("/static/assets/data/map/heat1.json", function (data){
        var data1=data;
        function compare(property){
            return function(a,b){
                var value1 = a[property];
                var value2 = b[property];
                return value1 - value2;
            }
        }
        data1.sort(compare('count'));
        var color = d3.scale.category10();
        for(var i=0;i<data1.length;i++){
          // if(i<7) data1[i].color="#FFB3FF";
          // else if(i<14) data1[i].color="#FF77FF";
          // else if(i<21) data1[i].color="#FF3EFF";
          // else if(i<28) data1[i].color="#CC00CC";
          // else data1[i].color="#770077";
          if(i<3) data1[i].color=color(0);
          else if(i<7) data1[i].color=color(1);
          else if(i<10) data1[i].color=color(2);
          else if(i<14) data1[i].color=color(3);
          else if(i<17) data1[i].color=color(4);
          else if(i<20) data1[i].color=color(5);
          else if(i<24) data1[i].color=color(6);
          else if(i<27) data1[i].color=color(7);
          else if(i<30) data1[i].color=color(8);
          else data1[i].color=color(9);
        }
         
        for(var i=0;i<data1.length;i++){
          getBoundary(data1[i]);
        }  
      })
      $.getJSON("/static/assets/data/map/province.json", function (data){
        for(var i=0;i<data.length;i++){
          var Cenpoint = new BMap.Point(data[i].center.split(",")[0],data[i].center.split(",")[1])
          var marker = new BMap.Marker(Cenpoint);
          // marker.enableMassClear();
          var label = new BMap.Label(data[i].name,{offset:new BMap.Size(-10,-20)});
          label.setStyle({padding:"0px",border:"0px",fontWeight:"bold",fontSize:"20px"});
          marker.setLabel(label);
          marker.setTop();
          // var label = new BMap.Label(data[i].name,{offset:new BMap.Size(0,-35),border:"0px solid #BC3B3A",
          //   backgroundColor:"#EE5D5B",color:"red",height:"18px",padding:"2px",lineHeight:"18px",whiteSpace:"nowrap",fontSize:"12px",top:"22px",left:"10px",position:"absolute"});
          // marker.setLabel(label);
          marker.addEventListener("mouseover",function (e){

            p=e.target;
            console.log(p);
            // $.getJSON("/static/assets/data/map/city.json", function (data){
            //     $.each(data, function (infoIndex, info){
            //       if(pro==info["province"]){
            //         map.setZoom(czoom);
            //         option.series[0].data=info["keywords"];
            //         var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(info["lng"],info["lat"]),300,200);
            //         map.addOverlay(myCompOverlay);
            //       }
            //     }) 
            // })
            var opts = {    
              width : 0,     // 信息窗口宽度    
              height: 0,     // 信息窗口高度    
              title : "省名"  // 信息窗口标题   
            }    
            var infoWindow = new BMap.InfoWindow(p.getLabel().content, opts);  // 创建信息窗口对象    
            map.openInfoWindow(infoWindow, p.getPosition());      // 打开信息窗口   
          });
          marker.addEventListener("mouseout",function (e){
            console.log("11");
            p=e.target;
            p.closeInfoWindow();    // 关闭信息窗口   
          });
          map.addOverlay(marker);
          // var opts = {
          //   position : Cenpoint,    // 指定文本标注所在的地理位置
          //   offset   : new BMap.Size(0, -40)    //设置文本偏移量
          // }
          // var label = new BMap.Label(data[i].name, opts);  // 创建文本标注对象
          // label.setStyle({
          //      color : "red",
          //      fontSize : "12px",
          //      //height : "20px",
          //      //lineHeight : "20px",
          //      fontFamily:"微软雅黑",
          //      border:"0px"
          //  });
          // map.addOverlay(label);  
        }
      })
    }
    function getBoundary(province) {
        var boundary = new BMap.Boundary();
        boundary.get(province["province"], function(rs){
          var pointArray = [];
          for (var j = 0; j < rs.boundaries.length; j++) {
              var ply = new BMap.Polygon(rs.boundaries[j]); //建立多边形覆盖物
              pointArray = pointArray.concat(ply.getPath());
              ply.setFillColor(province.color);
              ply.addEventListener("click", function (e) {

                var latlng = e.point;
                var info = new BMap.InfoWindow(province["province"],{width:0,height:0});
                // map.openInfoWindow(info, latlng);
                var value=province["province"];  
                console.log(value);
                //高亮闪烁显示鼠标点击的省
                var delay = 0;
                
                for (var flashTimes = 0; flashTimes < 3; flashTimes++) {
                    delay += 200;
                    setTimeout(function () {
                        ply.setFillColor("#FFFFFF");
                    }, delay);

                    delay += 200;
                    setTimeout(function () {
                        ply.setFillColor(province.color);
                    }, delay);
                                           
                    
                }
                //setTimeout(word_cloud(value), 1500);
                setTimeout(function(){
                  word_cloud(value);
                }, 1700);
                //$("#myselect option[text="+value+"]").attr("selected", true);
              });
              map.addOverlay(ply);  //添加覆盖物
            }
            // var Cenpoint = new BMap.Point();
            // Cenpoint=map.getViewport(pointArray)["center"];
            // var marker = new BMap.Marker(Cenpoint);
            //map.addOverlay(marker); 
          });
      }

   //详细的参数,可以查看heatmap.js的文档 https://github.com/pa7/heatmap.js/blob/master/README.md
    //参数说明如下:
    /* visible 热力图是否显示,默认为true
     * opacity 热力的透明度,1-100
     * radius 势力图的每个点的半径大小   
     * gradient  {JSON} 热力图的渐变区间 . gradient如下所示
     *  {
            .2:'rgb(0, 255, 255)',
            .5:'rgb(0, 110, 255)',
            .8:'rgb(100, 0, 255)'
        }
        其中 key 表示插值的位置, 0~1. 
            value 为颜色值. 
     */
  //   map.addEventListener("click",function(e){
  //   alert(e.point.lng + "," + e.point.lat);
  // });
        // // 添加带有定位的导航控件
        //     var navigationControl = new BMap.NavigationControl({
        //       // 靠左上角位置
        //       anchor: BMAP_ANCHOR_TOP_LEFT,
        //       // LARGE类型
        //       type: BMAP_NAVIGATION_CONTROL_LARGE,
        //       // 启用显示定位
        //       enableGeolocation: true
        //     });
        //     map.addControl(navigationControl);
        //   // 添加定位控件
        //   var geolocationControl = new BMap.GeolocationControl();
        //   geolocationControl.addEventListener("locationSuccess", function(e){
        //     // 定位成功事件
        //       var address = '';
        //       address += e.addressComponent.province;
        //       address += e.addressComponent.city;
        //       address += e.addressComponent.district;
        //       address += e.addressComponent.street;
        //       address += e.addressComponent.streetNumber;
        //       alert("当前定位地址为：" + address);
        //   });
        //   geolocationControl.addEventListener("locationError",function(e){
        //       // 定位失败事件
        //       alert(e.message);
        //   });
        //   map.addControl(geolocationControl); 
        // //地图右键菜单
        //   var menu = new BMap.ContextMenu();
        //   var txtMenuItem = [
        //     {
        //       text:'放大',
        //       callback:function(){map.zoomIn()}
        //     },
        //     {
        //       text:'缩小',
        //       callback:function(){map.zoomOut()}
        //     }
        //   ];
        //   for(var i=0; i < txtMenuItem.length; i++){
        //     menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
        //   }
        //   map.addContextMenu(menu);

          // 复杂的自定义覆盖物
            function ComplexCustomOverlay(point,width,height){
              
              this._point = point;
              this._width = width;
              this._height = height; 
            }
            ComplexCustomOverlay.prototype = new BMap.Overlay();
            ComplexCustomOverlay.prototype.initialize = function(map){
              this._map = map;
              var div = document.createElement("div");
              div.style.position = "absolute";
              // 可以根据参数设置元素外观
              div.style.width = this._width+"px"//this._length + "px";
              div.style.height = this._height+"px"//this._length + "px";
              div.style.background = "red";
              map.getPanes().labelPane.appendChild(div);
              var myChart = echarts.init(div);
              myChart.clear();
             
              myChart.setOption(option);
              this._div = div;
              return div;
            }
            ComplexCustomOverlay.prototype.draw = function(){
              // var map = this._map;
              // var pixel = map.pointToOverlayPixel(this._point);
              var position = this._map.pointToOverlayPixel(this._point);
              this._div.style.left = position.x - this._width / 2 + "px";    
              this._div.style.top = position.y - this._height / 2 + "px";
             
            }   
            // var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(116.407845,39.914101),800,600);

            // map.addOverlay(myCompOverlay);

           //var time=new Date();
           
          // map.addEventListener("tilesloaded",function(e){
          //   map.clearOverlays();
          //   time = new Date();
          //   var thistime=new Date();
          //   console.log(time,thistime);
          //   console.log(time.getTime() == thistime.getTime());
          //   var data=null;
          //   if(map.getZoom()<8){
          //     data="country";
          //   }
          //   else if(8<=map.getZoom()&&map.getZoom()<12){
          //     data="province";
          //   }
          //   else if(12<=map.getZoom()&&map.getZoom()<14){
          //     data="city";
          //   }
          //   else{
          //     data="district";
          //   }
          //   var counter=0;
          //   var bs = map.getBounds();   //获取可视区域
          //   var lng1=bs.getSouthWest().lng;
          //   var lat2=bs.getSouthWest().lat;
          //   var lng2=bs.getNorthEast().lng;
          //   var lat1=bs.getNorthEast().lat;
          //   var lat=lat1;
          //   console.log(lng1,lng2,lat1,lat2);
          //   var geoc = new BMap.Geocoder();
          //   var result={};
          //   for(var i=0;i<10;i++){
          //     var lng=lng1;
          //     for(var j=0;j<20;j++){
          //         var p=new BMap.Point(lng,lat);
          //         geoc.getLocation(p, function(rs){
          //           counter++;
          //           // console.log(counter);
          //           var addComp = rs.addressComponents;
          //           var address="";
          //           if(data=="country"){

          //           }
          //           else if(data=="province"){
          //             address=address+addComp.province;
          //           }
          //           else if(data=="city"){
          //             address=address+addComp.province+addComp.city;
          //           }
          //           else{
          //             address=address+addComp.province+addComp.city+addComp.district;
          //           }
          //           if(address!=""){
          //             if(!result[address]){
          //                       result[address]={
          //                         level:data,
          //                           number:1,
          //                           lng:1,
          //                           lat:1,
          //                           minwidth:rs.point.lng,
          //                           maxwidth:rs.point.lng,
          //                           minheight:rs.point.lat,
          //                           maxheight:rs.point.lat,
          //                           width:0,
          //                           height:0
          //                       };
          //                       if(data=="province"){
          //                           result[address].province=addComp.province;
          //                       }
          //                       if(data=="city"){
          //                           result[address].province=addComp.province;
          //                           result[address].city=addComp.city;
          //                       }
          //                       if(data=="district"){
          //                           result[address].province=addComp.province;
          //                           result[address].city=addComp.city;
          //                           result[address].district=addComp.district;
          //                       }
          //                       // var myGeo = new BMap.Geocoder();
          //                       // myGeo.getPoint(address, function(point){
          //                       //   result[address].lng=point.lng;
          //                       //   result[address].lat=point.lat;
          //                       // });
          //                   }
          //             else{
          //               if(Math.abs(rs.point.lng-lng1)<Math.abs(result[address].minwidth-lng1)){

          //                 result[address].minwidth=rs.point.lng;
          //               }
          //               if(Math.abs(rs.point.lng-lng1)>Math.abs(result[address].maxwidth-lng1)){

          //                 result[address].maxwidth=rs.point.lng;
          //               }
          //               if(Math.abs(rs.point.lat-lat1)<Math.abs(result[address].minheight-lat1)){

          //                 result[address].minheight=rs.point.lat;
          //               }
          //               if(Math.abs(rs.point.lat-lat1)>Math.abs(result[address].maxheight-lat1)){

          //                 result[address].maxheight=rs.point.lat;
          //               }
          //               result[address].number++;
          //               result[address].width=Math.abs((result[address].maxwidth-result[address].minwidth)/(lng2-lng1))*1920;
          //               result[address].height=Math.abs((result[address].maxheight-result[address].minheight)/(lat2-lat1))*949;

          //             }
          //           }
          //           if(counter==190){
                    

          //                 for(var key in result){
          //                   if(result[key].number<1){
          //                     delete result[key];
          //                   }
          //                 }
          //                 for(var key in result){
          //                   result[key].lng=(result[key].maxwidth+result[key].minwidth)/2;
          //                   result[key].lat=(result[key].maxheight+result[key].minheight)/2;
          //                 }
          //                 console.log(result);
          //                 $.getJSON("/static/assets/data/map/"+data+".json", function (data){
          //                   $.each(data, function (infoIndex, info){
          //                     console.log(info);
          //                     for(var key in result){
          //                       if(key==info["place"]){
                                  
          //                         option.series[0].data=info["keywords"];
                           
          //                         var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(result[key].lng,result[key].lat),result[key].width*0.4,result[key].height*0.4);
          //                         if(time.getTime() == thistime.getTime()){
          //                           map.addOverlay(myCompOverlay);
          //                         }
          //                       }
          //                     }
                             
          //                   }) 
          //                 }) 
          //               }    
          //         });
          //       lng=lng+(lng2-lng1)/20;
          //     }
          //     lat=lat+(lat2-lat1)/10;    
          //   }
            

            
            
          // });
            $scope.mapflag=false;
            var endTime = new Date()
            $scope.date = endTime.getFullYear()+'-'+(endTime.getMonth()+1)+'-'+endTime.getDate();
            $scope.enddate = $scope.date;
            var startTime = new Date(Date.parse($scope.date) - 604800000)
            $scope.startTime = startTime.getFullYear()+'-'+(startTime.getMonth()+1)+'-'+startTime.getDate();
            $("#datepicker-default")
                .datepicker({todayHighlight:true, autoclose:true, format: 'yyyy-mm-dd'})
                .datepicker('setEndDate', getFormatData())
                .on('changeDate', function(ev){
                    $timeout(function(){
                        console.log($scope.date);
                        getData($scope.date);
                        $scope.enddate = $scope.date;
                        var startTime = new Date(Date.parse($scope.date) - 604800000)
                        $scope.startTime = startTime.getFullYear()+'-'+(startTime.getMonth()+1)+'-'+startTime.getDate();
                    },1000);
                });
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
                $("#topicDist>p").css({"position":"absolute","width":"100%","text-align":"center","bottom":"28px","left":"-10px","font-size":"1.2em",color:"#000"})
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
                date = new Date(date);   
                var year = date.getFullYear();
                var month = (date.getMonth()+1)<10?'0'+(date.getMonth()+1):(date.getMonth()+1);
                var day = date.getDate()<10?'0'+date.getDate():date.getDate();
                // console.log(year + '-' + month + '-' + day);
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
                    notice.notify_info("欢迎回来！！",$rootScope.curentUser,false,"","");
                }
            });
            function getFormatData() {
                var datetime = new Date();
                var year=datetime.getFullYear();//获取完整的年份(4位,1970)
                var month=datetime.getMonth()+1;//获取月份(0-11,0代表1月,用的时候记得加上1)
                if(month<=9){
                    month="0"+month;
                }
                var date=datetime.getDate();//获取日(1-31)
                if(date<=9){
                    date="0"+date;
                }
                return year+"-"+month+"-"+date;
            };
            function getData(date) {
                $scope.dataTypeLists = [0,0,0,0,0,0];
                if(!date){
                    date=new Date();
                    date = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate();}
                ChartService.getDashboardData({date:date}).then(function(res){
                        //console.log(res);
                        
                        $scope.data = res.data;
                        $scope.HotPost = res.Hot.hotPost;
                        $scope.HotPoster = res.Hot.hotPoster;
                        $scope.WordCloud = res.word_cloud;
                        console.log($scope.HotPoster);
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
                        $scope.HotWeiboUser = res.Hot.hotWeiboUser;
                        console.log($scope.HotWeibo);
                        $scope.mapData = res.mapData;
                        $scope.sourceData = res.sourceData;
                        $scope.sourceData.forEach(function(d) {
                            $scope.dataTypeLists[parseInt(d.data_type)] =  $scope.dataTypeLists[parseInt(d.data_type)] + parseInt(d.post_num);
                        });
                        console.log($scope.dataTypeLists);
                        drawChart();
                        if(!$scope.mapflag){
                            drawMap();
                        }
                        drawClouds();
                },function(error){
                    console.log(error);
                    notice.notify_info("抱歉！","数据请求出错，请重试！","",false,"","");
                });
            }
            function updateSitePosts(posts)
            {
                var dataTypeLists = posts.reduce((acc,post)=>{acc[+post.data_type]+=+post.post_num;return acc;},[0,0,0,0,0,0]);
                $scope.dataTypeLists = dataTypeLists;
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
            function drawClouds() {
                var doms = "wordsCloud";
                if(document.getElementById(doms) != undefined) {
                var chart = echarts.init(document.getElementById(doms));
                var color = d3.scale.category10();
                var i = 0;
                var options = {
                    series: [{
                        type: 'wordCloud',
                        gridSize: 1,
                        sizeRange: [12, 45],
                        rotationRange: [0, 45],
                        shape: 'circle',
                        textStyle: {
                            normal: {
                                color: function() {
                                    return color(i++);
                                },
                            fontFamily:'italic',
                            },
                            // emphasis: {
                            //     shadowBlur: 15,
                            //     shadowColor: '#333'
                            // }
                        },
                        data: []
                    }]
                };
                var keylists = [];
                console.log($scope.WordCloud);
                $scope.WordCloud.forEach(function (d) {
                    var tt = {};
                    tt.name = d.word;
                    tt.value = d.weight;
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
                dayDist.on("filtered", function(){
                    // console.log(post_filters);
                    // console.log(getPosts());
                    $timeout(function(){updateSitePosts(dayDim.top(Infinity))},0);
                    console.log(dayDim.top(Infinity));
                });
                chart.yAxis()
                      .ticks(5)
                      .tickFormat(function(d){
                        console.log(d);
                        return +d;
                      });
                chart.xAxis()
                      .tickFormat(function(d){
                        d = d.toString();
                        // if(d.charAt(4) == '0')
                        // {
                        //   return d.slice(5,-2) + "-" + d.slice(-2);
                        // }
                        // return d.slice(4,-2) + "-" + d.slice(-2);
                          return d.slice(5);
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
                topicDist.on("filtered", function(){
                    // console.log(post_filters);
                    // console.log(getPosts());
                    $timeout(function(){updateSitePosts(topicDim.top(Infinity))},0);
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
                $scope.mapflag=true;
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