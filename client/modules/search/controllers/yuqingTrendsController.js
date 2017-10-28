"use strict";
CQ.mainApp.searchController
    .controller("yuqingTrendsController", ["$rootScope", "$scope", "$http", "$state", "$stateParams", "SearchFacService", "ngDialog", "exportSevice",function ($rootScope, $scope, $http, $state, $stateParams, SearchFacService, ngDialog, exportSevice) {
        console.log("yuqingTrendsController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("app start!!!");
                App.runui();
                $scope.show_search = true; //是否显示搜索框
                $scope.setIsExtend = true;
                $scope.searchStr = "";//搜索字符串
                $scope.searchState  = 0;//0:未搜索 1：一般检索 2：高级检索 
                $scope.pics = ["/static/assets/img/news2.svg","/static/assets/img/luntan.svg", "/static/assets/img/weibo.svg"
        ,"/static/assets/img/tieba.svg","/static/assets/img/weixin1.svg","/static/assets/img/baidu.svg"];
                $scope.userId = 1;
                $scope.sortlist = ["热度","时间","站点","话题"];
                $scope.sort = 0;//热度
                $scope.pagelists = [];
                $scope.page = 1;
                var pages = 1,//页面数目
                page_num = 10,
                max_size = 5;//最大显示页面
                $scope.charts = [];
                $scope.page_num = page_num;
                var topicKey = function(){this.id="topic_id",this.name="话题";},
                baseKey = function(id,name){this.id=id,this.name=name;},
                siteKey = function(){this.id="board",this.name="站点";},
                ptKey = function(){this.id="pt_time",this.name="发帖时间";},
                stKey = function(){this.id="st_time",this.name="抓取时间";},
                barlayout = function(keys){this.type="barchart",this.name="柱状图",this.keys=keys||[new topicKey(),new siteKey(),new ptKey(),new stKey()];},
                linelayout = function(keys){this.type="linechart",this.name="折线图",this.keys=keys||[new topicKey(),new siteKey(),new ptKey(),new stKey()];},
                pielayout = function(keys){this.type="piechart",this.name="饼图",this.keys=keys||[new topicKey(),new siteKey(),new ptKey(),new stKey()];},
                forcelayout = function(){this.type="forcechart",this.name="力图",this.keys=[];},
                treelayout = function() {this.type="treechart",this.name="树状图",this.keys=[];};
                var params = {userId:$scope.userId};
                $scope.layouts = [{type:"nochart",name:"--布局算法--",keys:[{id:-1,name:"--key--"}]},new barlayout(),new linelayout(),new pielayout(),new forcelayout(),new treelayout()];
                $scope.charts.push({layout:{type:"nochart",name:"--布局算法--",keys:[{id:-1,name:"--key--"}]},key:{id:-1,name:"--key--"}});
                // searchSet($scope.sites, $scope.topic, $scope.keyWords);
                function getKeys(post)
                {
                  var keyss = [];
                  var props = Object.keys(post);
                  console.log(props);
                  for(var i = 0; i < props.length; i++)
                  {
                    keyss.push(new baseKey(props[i],props[i]));
                  }
                  var bar = new barlayout();
                  var line = new linelayout();
                  var pie = new pielayout();
                  bar.keys = line.keys = pie.keys = keyss;
                  $scope.layouts[1] = bar;
                  $scope.layouts[2] = line;
                  $scope.layouts[3] = pie;
                  $scope.keyss = keyss;
                }
                $scope.selectLayout = function(chart)
                {
                  if(chart.layouttype == "barchart")
                  {
                    chart.layout = new barlayout($scope.keyss);
                  }
                  else if(chart.layouttype == "linechart")
                  {
                    chart.layout = new linelayout($scope.keyss);
                  }
                  else if(chart.layouttype == "piechart")
                  {
                    chart.layout = new pielayout($scope.keyss);
                  }
                  else if(chart.layouttype == "forcechart")
                  {
                    chart.layout = new forcelayout();
                  }
                  else if(chart.layouttype == "treechart")
                  {
                    chart.layout = new treelayout();
                  }
                }
                $scope.addchart=function()
                {
                  $scope.charts.push({layout:{type:"nochart",name:"--布局算法--",keys:[{id:-1,name:"--key--"}]},key:{id:-1,name:"--key--"}});
                }
                $scope.removechart=function(i)
                {
                  $scope.charts.splice(i,1);
                }
                $scope.parseFun = function(chart)
                {
                  var js = chart.code.toString();
                  if(js!="")
                  {
                    var execjs = "(function(){" + js +"})();"; 
                    var getNewData = eval(execjs);
                    // (eval(js))("hello world!!!");
                    chart.getNewData = getNewData;
                  }
                }
                $scope.analy = function()
                {
                  var params = {};
                  params.charts = $scope.charts;
                  params.post = $scope.postLists;
                  console.log(params);
                  $('#visuleSet').modal('hide');
                  setTimeout(function(){
                    $state.go("yuqingAnalyController",params);
                  },500);
                }
                $scope.updatePost = function()
                {
                  var files = $("#inputfile").prop('files');//获取到文件列表

                  if(files.length == 0){
                      alert('请选择文件');
                      return;
                  }else{
                      var reader = new FileReader();//新建一个FileReader
                      reader.readAsText(files[0], "UTF-8");//读取文件 
                      reader.onload = function(evt){ //读取完文件之后会回来这里
                          var fileString = evt.target.result;
                          // form.vm.value = fileString; //设置隐藏input的内容
                          var pattern1 = /tr>(.*?)<\/tr/g;
                          var results = [];
                          var result = null;
                          console.log(fileString);
                          while((result = pattern1.exec(fileString)) != null)
                          {
                            results.push(result[0]);
                          }
                          console.log(results);
                      }
                  }
                }
                $scope.export = function()
                {
                  var $cols = Object.keys($scope.postLists[0]);
                  // $thead = $cols;
                  exportSevice.saveExcel($scope.postLists,$cols,$cols);
                }
                SearchFacService.getRuleData(params).then(function(data)
                {
                    $scope.sites = [];
                    $scope.topic = [];
                    $scope.keyWords = [];
                    data.allSites.forEach(function(d){
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
                    searchSet($scope.sites, $scope.topic, $scope.keyWords);
                });
                //searchSet();
                if(!($stateParams.poster == null && $stateParams.topicIds == null && $stateParams.keywords == null && $stateParams.start_time == null && $stateParams.end_time == null && $stateParams.sites == null))
                {
                  console.log($stateParams);
                  $scope.page = 1;
                  $scope.show_search = false;
                  $scope.searchKeywords = $stateParams.keywords == null ? [] : $stateParams.keywords;
                  $scope.searchSites = $stateParams.sites == null ? [] : $stateParams.sites;
                  $scope.searchTopicids = $stateParams.topicIds == null ? [] : $stateParams.topicIds;
                  $scope.poster = $stateParams.poster == null ? [] : $stateParams.poster;
                  $scope.start_time = $stateParams.start_time == null ? "" : $stateParams.start_time;
                  $scope.end_time = $stateParams.end_time == null ? "" : $stateParams.end_time;
                  $scope.searchState = 1;
                  var bool = {};//es bool查询
                  var must = [];//and
                  var must_index = 0;
                  if($scope.searchSites.length > 0)
                  {
                    if(+$scope.searchSites[0]<10)
                    {
                      var terms = {};
                      terms.terms = {};
                      terms.terms.board_id = $scope.searchSites;
                      must[must_index++] = terms;
                    }
                    else
                    {
                      var terms = {};
                      terms.terms = {};
                      for(var i = 0; i < $scope.searchSites.length; i++)
                      {
                        $scope.searchSites[i] -= 10;
                      }
                      terms.terms.site_id = $scope.searchSites;
                      must[must_index++] = terms;
                    }
                  }
                  if($scope.searchKeywords.length > 0)
                  {
                    var should = [];
                    should[0] = {};
                    should[0].match = {};
                    should[0].match.title = {"operator":"and"};
                    should[0].match.title.query=$scope.searchKeywords.join("");
                    should[1] = {};
                    should[1].match = {};
                    should[1].match.content = {"operator":"and"};
                    should[1].match.content.query=$scope.searchKeywords.join("");
                    must[must_index] = {};
                    must[must_index].bool = {};
                    must[must_index++].bool.should = should;
                  }
                  if($scope.searchTopicids.length > 0)
                  {
                    var terms = {};
                    terms.terms = {};
                    terms.terms.topic_id = $scope.searchTopicids;
                    must[must_index++] = terms;
                  }
                  if($scope.poster.length > 0)
                  {
                    var terms = {};
                    terms.terms = {};
                    terms.terms.poster = $scope.poster;
                    must[must_index++] = terms;
                  }
                  if($scope.start_time != "" || $scope.end_time != "")
                  {
                    if($scope.start_time instanceof Array)
                    {
                      var should = [];
                      var should_index = 0;
                      $scope.start_time.forEach(function(time){
                        var range = {};
                        range.pt_time = {};
                        range.pt_time.gte = $scope.start_time[should_index];
                        range.pt_time.lte = $scope.start_time[should_index];
                        should[should_index] = {};
                        should[should_index++].range = range;
                      });
                      must[must_index] = {};
                      must[must_index].bool = {};
                      must[must_index++].bool.should = should;
                    }
                    else{
                      var range = {};
                      range.pt_time = {};
                      if($scope.start_time != "")
                      {
                        console.log($scope.start_time);
                        range.pt_time.gte = $scope.start_time;
                      }
                      if($scope.end_time != "")
                      {
                        range.pt_time.lte = $scope.end_time;
                      }
                      must[must_index] = {};
                      must[must_index++].range = range;
                      }
                  }
                  bool.must = must;
                  $scope.elastic = JSON.stringify({bool:bool});
                  // var data = {
                  //   userId: $scope.userId,
                  //   keywords: $scope.searchKeywords,
                  //   sites:$scope.searchSites,
                  //   poster:$scope.poster,
                  //   topicids:$scope.searchTopicids,
                  //   start_time:"",
                  //   end_time:"",
                  //   page:$scope.page,
                  //   page_num:page_num,
                  //   sort:$scope.sort
                  //   }; 
                  var data={
                    userId: $scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                    search(data);
                    $scope.sort = 0;
                }
                $scope.onSearch = function()
                {
                  $scope.page = 1;
                  var searchList = $scope.searchStr.split("&");
                  $scope.searchKeywords = [];
                  $scope.searchSites = [];
                  $scope.poster = [];
                  $scope.searchTopicids = [];
                  var bool = {};//es bool查询
                  var must = [];//and
                  var must_index = 0;
                  for(var i = 0; i < searchList.length; i++)
                  {
                    if(searchList[i].indexOf("keywords=") != -1)
                    {
                      $scope.searchKeywords = searchList[i].slice(searchList[i].indexOf("keywords=")+9).trim().split(",");
                      var terms1 = {},
                      terms2 = {},
                      bool_should = {},
                      should = [];
                      bool_should.bool = {};
                      terms1.terms = {};
                      terms2.terms = {};
                      terms1.terms.title = $scope.searchKeywords;
                      terms2.terms.title = $scope.searchKeywords;
                      should.push(terms1);
                      should.push(terms2);
                      bool_should.bool.should = should;
                      must[must_index++] = bool_should;
                    }
                    else if(searchList[i].indexOf("sites=") != -1)
                    {
                      $scope.searchSites = searchList[i].slice(searchList[i].indexOf("sites=")+6).trim().split(",");
                      var terms = {};
                      terms.terms = {};
                      terms.terms.site_id = $scope.searchSites;
                      must[must_index++] = terms;
                    }
                    else if(searchList[i].indexOf("topics=") != -1)
                    {
                      var topicNames = searchList[i].slice(searchList[i].indexOf("topics=")+7).trim().split(",");
                      for(var k = 0; k < topicNames.length; k++)
                      {
                        for(var j = 0; j < $scope.topic.length; j++)
                        {
                          if($scope.topic[j].topicName == topicNames[k])
                          {
                            $scope.searchTopicids.push($scope.topic[j].topicId.toString());
                          }
                        }
                      }
                      var terms = {};
                      terms.terms = {};
                      terms.terms.topic_id = $scope.searchTopicids;
                      must[must_index++] = terms;
                    }
                    bool.must = must;
                    $scope.elastic = JSON.stringify({bool:bool});
                    if($scope.searchKeywords.length == 0&&$scope.searchSites.length == 0&&$scope.poster.length == 0&&$scope.searchTopicids.length == 0 && $scope.searchStr != "")
                    {
                      $scope.searchState = 2;
                      // var searchStrlist = $scope.searchStr.split(',');
                      // searchStrlist.tostring = function()
                      // {
                      //   var temp = '[';
                      //   this.forEach(function(str,i){
                      //     if(i == 0)
                      //     {
                      //       temp = temp + '"' + str + '"';
                      //     }
                      //     else
                      //     {
                      //       temp = temp + ',' + '"' + str + '"';
                      //     }
                      //   });
                      //   temp += ']';
                      //   return temp;
                      // }
                      // console.log(searchStrlist.tostring());
                      var elastic = '{"bool": {"should": [{"match": {"content":{"operator":"and","query":"'+ $scope.searchStr + '"}}},{"match": {"content":{"operator":"and","query":"' + $scope.searchStr + '"}}}]}}';
                      $scope.elastic = elastic;
                    }
                  }
                  console.log($scope.searchKeywords);
                  console.log($scope.searchSites);
                  console.log($scope.searchTopicids);
                  $scope.searchState = 1;
                  var data = {
                        userId:$scope.userId,
                        elastic:$scope.elastic,
                        page:$scope.page,
                        page_num:page_num,
                        sort:$scope.sort
                      }
                    search(data);
                    $scope.sort = 0;
                }
                $scope.onAdvance = function()
                {
                  $scope.searchState = 2;
                  $scope.page = 1;
                  var elastic =  JSON.stringify($('#builder').queryBuilder('getESBool'));
                  $scope.elastic = elastic;
                  console.log(elastic);
                  var data = {
                    userId:$scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                  search(data);
                  $scope.sort = 0;
                }
                $scope.onblur = function()
                {
                  if($scope.page_num<0)
                    $scope.page_num = 0
                  page_num = $scope.page_num;
                  $scope.page = 1;
                  var data = {
                    userId:$scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                  search(data);
                }
                $scope.onChange = function()
                {
                  $scope.page = 1;
                  var data = {
                    userId:$scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                  search(data);
                  // if($scope.searchState == 1)
                  // {
                  //   var data = {
                  //   userId: $scope.userId,
                  //   keywords: $scope.searchKeywords,
                  //   sites:$scope.searchSites,
                  //   poster:$scope.poster,
                  //   topicids:$scope.searchTopicids,
                  //   start_time:"",
                  //   end_time:"",
                  //   page:$scope.page,
                  //   page_num:page_num,
                  //   sort:$scope.sort
                  //   };
                  //   search(data);
                  // }
                  // else if($scope.searchState == 2)
                  // {
                  //   var data = {
                  //   userId:$scope.userId,
                  //   elastic:elastic,
                  //   page:$scope.page,
                  //   page_num:page_num,
                  //   sort:$scope.sort
                  //   };
                  //   search(data);
                  // }
                }
                function search(data)
                {
                  if(data.elastic)//高级检索
                  {
                    SearchFacService.advanceSearch(data).then(function(data){
                      // $("#ruleset").addClass('hide');
                      if(data.success)
                      {
                        $scope.postLists = data.data.post_data;
                        // pages = 10;
                        console.log($scope.postLists);
                        $scope.postLists.forEach(d=>d.content.length>200?d.content=d.content.slice(0,200).trim()+"......":d.content);
                        pages = Math.ceil(data.data.post_count/page_num);
                        $scope.post_count = data.data.post_count;
                        getPagelist();
                        if($scope.postLists.length>0)
                        {
                          getKeys($scope.postLists[0]);
                        }
                      }
                      else{
                        $scope.postLists = [];
                        console.log(请求数据出错);
                      }
                    });
                  }
                  else{      //一般检索
                    SearchFacService.searchData(data).then(function(data){
                      // $("#ruleset").addClass('hide');
                      if(data.success)
                      {
                        $scope.postLists = data.data.post_data;
                        pages = 10;
                        pages = Math.ceil(data.data.post_count/page_num);
                        getPagelist();
                        console.log($scope.postLists);
                      }
                      else{
                        console.log(请求数据出错);
                      }
                    });
                  }
                }
                $scope.setrule = function()
                {
                    $("#ruleset").removeClass('hide');
                }

                $scope.nosetrule = function()
                {
                    $("#ruleset").addClass("hide");
                }
                $scope.AddSenmessage = function(post_id) {
                    console.log(post_id);
                    $scope.post_id = post_id;
                    ngDialog.open(
                    {
                        template: '/static/modules/monitor/pages/addsenmessage.html',
                        controller: 'addSenmessage',
                        appendClassName: "ngdialog-theme-enginesetting",
                        width: "100%",
                        scope: $scope
                    }
                    );
                };
                $scope.MarkRead  = function(post_id) {
                    // console.log($(this).find(".save").find("img").remove());
                    // $("#"+post_id+"").find(".save").find("img").remove()
                    // $("#"+post_id+"").find(".save").prepend("<img src = '/static/assets/img/saved.svg'>");
                };
                $scope.OpenAnaly = function(analy_topic, topic_id) {
                    var anaDom = "#" + analy_topic;
                    var topicDom = "#topic_" + topic_id;
                    angular.element(topicDom).after(angular.element(anaDom));
                    angular.element(anaDom).removeClass("hidden").show("normal");
                    var width = angular.element(topicDom).width();
                    // time 
                    var timeAna = c3.generate({
                        bindto:"#timeAna",
                        size:{
                            width: width * 0.8
                        },
                        padding: {
                            top:20,
                            left:40,
                            right:30,
                            bottom: 20
                        },
                        data: {
                            x: 'x',
                            columns: [
                                ['x', '2013-01-01', '2013-01-02', '2013-01-03', '2013-01-04', '2013-01-05'],
                                ['时间', 30, 200, 100, 400, 150]
                            ]
                        },
                        axis: {
                            x: {
                                type: 'timeseries',
                                tick: {
                                    format: '%Y-%m-%d'
                                }
                            }
                        }
                    });
                };
                $scope.addBg = function($event) {
                    //console.log($event.target);
                    var tt = $event.target;
                    if(angular.element(tt.closest("li")).hasClass("monitor-bg-color") == false) {
                        angular.element(tt.closest("li")).addClass("monitor-bg-color");
                        angular.element(tt.closest("li")).find(".iconslists").removeClass("ng-hide");
                    }
                };
                $scope.removeBg = function($event) {
                    var tt = $event.target;
                    if(angular.element(tt.closest("li")).hasClass("monitor-bg-color")) {
                        angular.element(tt.closest("li")).removeClass("monitor-bg-color");
                        angular.element(tt.closest("li")).find(".iconslists").addClass("ng-hide");
                    }
                };
                $scope.toggleMenu = function()
                {
                    $scope.setIsExtend = !$scope.setIsExtend;
                }
                //分页
                $scope.nextpage = function()
                {
                  $scope.page = ($scope.page < pages ? $scope.page + 1 : pages);
                  getPagelist();
                  // var data = {
                  //   userId: $scope.userId,
                  //   keywords: $scope.searchKeywords,
                  //   sites:$scope.searchSites,
                  //   poster:$scope.poster,
                  //   topicids:$scope.searchTopicids,
                  //   start_time:"",
                  //   end_time:"",
                  //   page:$scope.page,
                  //   page_num:page_num,
                  //   sort:$scope.sort
                  //   };
                  var data = {
                    userId:$scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                  search(data);
                }
                $scope.prepage = function()
                {
                  $scope.page = ($scope.page > 1 ? $scope.page - 1 : 1);
                  getPagelist();
                  // var data = {
                  //   userId: $scope.userId,
                  //   keywords: $scope.searchKeywords,
                  //   sites:$scope.searchSites,
                  //   poster:$scope.poster,
                  //   topicids:$scope.searchTopicids,
                  //   start_time:"",
                  //   end_time:"",
                  //   page:$scope.page,
                  //   page_num:page_num,
                  //   sort:$scope.sort
                  //   };
                  var data = {
                    userId:$scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                  search(data);
                }
                $scope.gopage = function(page)
                {
                  $scope.page = page;
                  getPagelist();
                  // var data = {
                  //   userId: $scope.userId,
                  //   keywords: $scope.searchKeywords,
                  //   sites:$scope.searchSites,
                  //   poster:$scope.poster,
                  //   topicids:$scope.searchTopicids,
                  //   start_time:"",
                  //   end_time:"",
                  //   page:$scope.page,
                  //   page_num:page_num,
                  //   sort:$scope.sort
                  //   };
                  var data = {
                    userId:$scope.userId,
                    elastic:$scope.elastic,
                    page:$scope.page,
                    page_num:page_num,
                    sort:$scope.sort
                  }
                  search(data);
                }
                function getPagelist()
                {
                  $scope.pagelists = [];
                  if(pages < max_size)
                    {
                      for(var i = 1; i < pages + 1; i++)
                      {
                        $scope.pagelists.push(i);
                      }
                    }
                    else if($scope.page < max_size/2 + 1)
                    {
                      for(var i = 1; i < max_size + 1; i++)
                      {
                        $scope.pagelists.push(i);
                      }
                    }
                    else if($scope.page > pages - max_size/2)
                    {
                      for(var i = pages - max_size + 1; i < pages + 1; i++)
                      {
                        $scope.pagelists.push(i);
                      }
                    }
                    else
                    {
                      for(var i = 0; i < max_size; i++)
                      {
                        $scope.pagelists.push($scope.page - Math.floor(max_size/2) + i);
                      }
                    }
                }
                //搜索规则设置
                function searchSet(sites,topics,keywords)
                {
                    // sites = sites || [{siteId:1,siteName:"test"}];
                    // topics = topics || [{topicId:1,topicName:"test"}];
                    // keywords = keywords || [{keyword:"test"}];
                    $('[data-toggle="tooltip"]').tooltip();

                    var $b = $('#builder');
                     var rules_basic = {
                      condition: 'AND',
                      rules: [{
                        id: 'title',
                        operator: 'equal',
                        value: ""
                      }]
                    };
                    var options = {
                      allow_empty: true,

                      rules: rules_basic,
                      plugins: {
                        'bt-tooltip-errors': { delay: 100},
                        'not-group': null
                      },

                      operators: [
                        {type: 'equal',},
                        {type: 'not_equal'},
                        {type: 'in'},
                        {type: 'not_in'},
                        {type: 'between'},
                        {type: 'not_between'},
                      ],
                      filters: [
                      {
                        id: 'site_id',
                        label: '站点',
                        data:{"type":"terms"},
                        input: 'select',
                        operators: ['in', 'not_in'],
                        multiple: true,
                        plugin: 'selectize',
                        plugin_config: {
                          valueField: 'siteId',
                          labelField: 'siteName',
                          options: sites,
                        },
                        valueSetter: function(rule, value) {
                          rule.$el.find('.rule-value-container select')[0].selectize.setValue(value);
                        }
                      },
                      {
                        id: 'topic_id',
                        label: '话题',
                        type: 'string',
                        input: 'select', 
                        operators: ['in','not_in'],
                        multiple: true,
                        plugin: 'selectize',
                        plugin_config: {
                          valueField: 'topicId',
                          labelField: 'topicName',
                          options: topics,
                          // options: [{"topicId":4,"topicName":4}],
                        },
                        data:{"type":"terms"},
                        valueSetter: function(rule, value) {
                          rule.$el.find('.rule-value-container select')[0].selectize.setValue(value);
                        }
                      },
                      {
                        id: 'pt_time',
                        label: '时间',
                        type: 'date',
                        data:{"type":"range"},
                        plugin: 'datepicker',
                        plugin_config: {
                          format: 'yyyy-mm-dd',
                          todayBtn: 'linked',
                          todayHighlight: true,
                          autoclose: true
                        },
                        operators: ['between','not_between'],
                      },
                      {
                        id: 'poster',
                        label: '发帖人',
                        type: 'string',
                        value_separator: ',',
                        data:{"type":"terms"},
                        operators: ['in','not_in'],
                      },
                      {
                        id: 'title',
                        label: '关键词',
                        type: 'string',
                        // input: 'select',
                        operators: ['equal','not_equal'],
                        // values: keywords,
                        // multiple: true,
                        data:{"type":"match","operator":"and"},
                        // plugin: 'selectize',
                        // plugin_config: {
                        //   valueField: 'keyword',
                        //   labelField: 'keyword',
                        //   // options:keywords,
                        //   options: {"keyword":4},
                        // },
                        // valueSetter: function(rule, value) {
                        //   rule.$el.find('.rule-value-container select')[0].selectize.setValue(value);
                        // }
                      },
                      ]
                    };
                    // init
                    $b.queryBuilder(options);
                    $('#builder').on('afterCreateRuleInput.queryBuilder', function(e, rule) {
                        if (rule.filter.plugin == 'selectize') {
                            rule.$el.find('.rule-value-container').css('min-width', '200px')
                              .find('.selectize-control').removeClass('form-control');
                        }
                    });
                }
                //get elastic
                // $('.parse-mongo').on('click', function() {
                //     // $('#result').removeClass('hide').find('pre').html(JSON.stringify($('#builder').queryBuilder('getRules'),undefined, 2));
                //     $('#result').removeClass('hide').find('pre').html(JSON.stringify($('#builder').queryBuilder('getESBool'),undefined, 2));
                // });
                //reset
                $('.reset').on('click',function(){
                  $('#builder').queryBuilder('reset');
                });   
            }
        });
        
   }]);