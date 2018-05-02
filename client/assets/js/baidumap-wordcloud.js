option = {  
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
                            return 'rgba(' + [255,255,255,0.8
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
                    // ,{
                //         name: 'Amy Schumer',
                //         value: 4386
                //     }, {
                //         name: 'Jurassic World',
                //         value: 4055
                //     }, {
                //         name: 'Charter Communications',
                //         value: 2467
                //     }, {
                //         name: 'Chick Fil A',
                //         value: 2244
                //     }, {
                //         name: 'Planet Fitness',
                //         value: 1898
                //     }, {
                //         name: 'Pitch Perfect',
                //         value: 1484
                //     }, {
                //         name: 'Express',
                //         value: 1112
                //     }, {
                //         name: 'Home',
                //         value: 965
                //     }, {
                //         name: 'Johnny Depp',
                //         value: 847
                //     }, {
                //         name: 'Lena Dunham',
                //         value: 582
                //     }, {
                //         name: 'Lewis Hamilton',
                //         value: 555
                //     }, {
                //         name: 'KXAN',
                //         value: 550
                //     }, {
                //         name: 'Mary Ellen Mark',
                //         value: 462
                //     }, {
                //         name: 'Farrah Abraham',
                //         value: 366
                //     }, {
                //         name: 'Rita Ora',
                //         value: 360
                //     }, {
                //         name: 'Serena Williams',
                //         value: 282
                //     }, {
                //         name: 'NCAA baseball tournament',
                //         value: 273
                //     }, {
                //         name: 'Point',
                //         value: 273
                //     }, {
                //         name: 'Point Break',
                //         value: 265
                //     }
                ]
        }]  
    };
//初始化整个地图
  var map = new BMap.Map("allmap");    // 创建Map实例
  map.setMinZoom(6);
  map.setMaxZoom(16);
  //台湾
  //map.centerAndZoom(new BMap.Point(120.977318,23.720389), 11);  // 初始化地图,设置中心点坐标和地图级别
  //上海
  //map.centerAndZoom(new BMap.Point(121.487899,39.929986), 11);
  //北京
  map.centerAndZoom(new BMap.Point(116.395645,39.929986), 11);
  //添加地图类型控件
  map.addControl(new BMap.MapTypeControl({
    mapTypes:[
            BMAP_NORMAL_MAP
        ]}));   

  map.enableScrollWheelZoom(true);   //开启鼠标滚轮缩放


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

// 添加带有定位的导航控件
    var navigationControl = new BMap.NavigationControl({
      // 靠左上角位置
      anchor: BMAP_ANCHOR_TOP_LEFT,
      // LARGE类型
      type: BMAP_NAVIGATION_CONTROL_LARGE,
      // 启用显示定位
      enableGeolocation: true
    });
    map.addControl(navigationControl);
  // 添加定位控件
  var geolocationControl = new BMap.GeolocationControl();
  geolocationControl.addEventListener("locationSuccess", function(e){
    // 定位成功事件
      var address = '';
      address += e.addressComponent.province;
      address += e.addressComponent.city;
      address += e.addressComponent.district;
      address += e.addressComponent.street;
      address += e.addressComponent.streetNumber;
      alert("当前定位地址为：" + address);
  });
  geolocationControl.addEventListener("locationError",function(e){
      // 定位失败事件
      alert(e.message);
  });
  map.addControl(geolocationControl); 
//地图右键菜单
  var menu = new BMap.ContextMenu();
  var txtMenuItem = [
    {
      text:'放大',
      callback:function(){map.zoomIn()}
    },
    {
      text:'缩小',
      callback:function(){map.zoomOut()}
    }
  ];
  for(var i=0; i < txtMenuItem.length; i++){
    menu.addItem(new BMap.MenuItem(txtMenuItem[i].text,txtMenuItem[i].callback,100));
  }
  map.addContextMenu(menu);

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

   
   
  map.addEventListener("tilesloaded",function(){
    map.clearOverlays();
    var data=null;
    if(map.getZoom()<8){
      data="country";
    }
    else if(8<=map.getZoom()&&map.getZoom()<12){
      data="province";
    }
    else if(12<=map.getZoom()&&map.getZoom()<14){
      data="city";
    }
    else{
      data="district";
    }
    var counter=0;
    var bs = map.getBounds();   //获取可视区域
    var lng1=bs.getSouthWest().lng;
    var lat2=bs.getSouthWest().lat;
    var lng2=bs.getNorthEast().lng;
    var lat1=bs.getNorthEast().lat;
    var lat=lat1;
    console.log(lng1,lng2,lat1,lat2);
    var geoc = new BMap.Geocoder();
    var result={};
    var d1 = new Date();
    for(var i=0;i<10;i++){
      var lng=lng1;
      for(var j=0;j<20;j++){
        var p=new BMap.Point(lng,lat);
        geoc.getLocation(p, function(rs){
          counter++;
          // console.log(counter);
          var addComp = rs.addressComponents;
          var address="";
          if(data=="country"){

          }
          else if(data=="province"){
            address=address+addComp.province;
          }
          else if(data=="city"){
            address=address+addComp.province+addComp.city;
          }
          else{
            address=address+addComp.province+addComp.city+addComp.district;
          }
          if(address!=""){
            if(!result[address]){
                      result[address]={
                        level:data,
                          number:1,
                          lng:1,
                          lat:1,
                          minwidth:rs.point.lng,
                          maxwidth:rs.point.lng,
                          minheight:rs.point.lat,
                          maxheight:rs.point.lat,
                          width:0,
                          height:0
                      };
                      if(data=="province"){
                          result[address].province=addComp.province;
                      }
                      if(data=="city"){
                          result[address].province=addComp.province;
                          result[address].city=addComp.city;
                      }
                      if(data=="district"){
                          result[address].province=addComp.province;
                          result[address].city=addComp.city;
                          result[address].district=addComp.district;
                      }
                      // var myGeo = new BMap.Geocoder();
                      // myGeo.getPoint(address, function(point){
                      //   result[address].lng=point.lng;
                      //   result[address].lat=point.lat;
                      // });
                  }
            else{
              if(Math.abs(rs.point.lng-lng1)<Math.abs(result[address].minwidth-lng1)){

                result[address].minwidth=rs.point.lng;
              }
              if(Math.abs(rs.point.lng-lng1)>Math.abs(result[address].maxwidth-lng1)){

                result[address].maxwidth=rs.point.lng;
              }
              if(Math.abs(rs.point.lat-lat1)<Math.abs(result[address].minheight-lat1)){

                result[address].minheight=rs.point.lat;
              }
              if(Math.abs(rs.point.lat-lat1)>Math.abs(result[address].maxheight-lat1)){

                result[address].maxheight=rs.point.lat;
              }
              result[address].number++;
              result[address].width=Math.abs((result[address].maxwidth-result[address].minwidth)/(lng2-lng1))*1920;
              result[address].height=Math.abs((result[address].maxheight-result[address].minheight)/(lat2-lat1))*949;

            }
          }
          if(counter==190){
                for(var key in result){
                  if(result[key].number<1){
                    delete result[key];
                  }
                }
                for(var key in result){
                  result[key].lng=(result[key].maxwidth+result[key].minwidth)/2;
                  result[key].lat=(result[key].maxheight+result[key].minheight)/2;
                }
                console.log(result);
                $.getJSON(data+".json", function (data){
                  $.each(data, function (infoIndex, info){
                    console.log(info);
                    for(var key in result){
                      if(key==info["place"]){
                        
                        option.series[0].data=info["keywords"];
                 
                        var myCompOverlay = new ComplexCustomOverlay(new BMap.Point(result[key].lng,result[key].lat),result[key].width*0.4,result[key].height*0.4);
                        map.addOverlay(myCompOverlay);
                      }
                    }
                   
                  }) 
                }) 
              }    
        }); 
        lng=lng+(lng2-lng1)/20;
      }
      lat=lat+(lat2-lat1)/10;    
    }
    

    
    
  });