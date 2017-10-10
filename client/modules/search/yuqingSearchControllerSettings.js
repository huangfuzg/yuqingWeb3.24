"use strict";
CQ.mainApp.searchController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("yuqingTrendsController", {
                url:"/yuqingTrends",
                params:{"poster":null,"topicIds":null,"keywords":null,"start_time":null,"end_time":null,"sites":null},
                templateUrl: "/static/modules/search/pages/yuqingTrends.html",
                controller: "yuqingTrendsController"
            })
            .state("yuqingAnalyController", {
                url:"/yuqingAnaly",
                params:{"charts":null,"post":null},
                templateUrl: "/static/modules/search/pages/yuqingAnaly.html",
                controller: "yuqingAnalyController"
            });
}]);