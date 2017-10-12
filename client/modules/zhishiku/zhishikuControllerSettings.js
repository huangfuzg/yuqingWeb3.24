"use strict";
CQ.mainApp.zhishikuController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("zhishiku", {
                url:"/zhishiku",
                templateUrl: "/static/modules/zhishiku/pages/zhishiku.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.eventdetail", {
                url:"/eventdetail",
                templateUrl: "/static/modules/zhishiku/pages/eventdetail.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.community", {
                url:"/community",
                templateUrl: "/static/modules/zhishiku/pages/community.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.behavioural", {
                url:"/behavioural",
                templateUrl: "/static/modules/zhishiku/pages/behavioural.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.sentiment", {
                url:"/sentiment",
                templateUrl: "/static/modules/zhishiku/pages/sentiment.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.viewpoint", {
                url:"/viewpoint",
                templateUrl: "/static/modules/zhishiku/pages/viewpoint.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.evolutionary", {
                url:"/evolutionary ",
                templateUrl: "/static/modules/zhishiku/pages/evolutionary.html",
                controller: "zhishikuController"
            })
            .state("zhishiku.guidance", {
                url:"/guidance ",
                templateUrl: "/static/modules/zhishiku/pages/guidance.html",
                controller: "zhishikuController"
            });
}]);