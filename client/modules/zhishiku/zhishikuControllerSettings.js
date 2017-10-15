"use strict";
CQ.mainApp.zhishikuController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("zhishiku", {
                url:"/zhishiku/subjects/events/analyze",
                templateUrl: "/static/modules/zhishiku/pages/zhishiku.html",
                controller: "zhishikuController"
            })
            .state("subjects", {
                url:"/zhishiku/subjects",
                templateUrl: "/static/modules/zhishiku/pages/subjects.html",
                controller: "subjectController"
            })
            .state("events", {
                url:"/zhishiku/subjects/events",
                templateUrl: "/static/modules/zhishiku/pages/events.html",
                params:{"subject":null},
                controller: "eventsController"
            })
            .state("zhishiku.eventdetail", {
                url:"/eventdetail",
                templateUrl: "/static/modules/zhishiku/pages/eventdetail.html",
                params:{"event":null},
                controller: "eventdetailController"
            })
            .state("zhishiku.community", {
                url:"/community",
                templateUrl: "/static/modules/zhishiku/pages/community.html",
                params:{"event":null},
                controller: "communityController"
            })
            .state("zhishiku.behavioural", {
                url:"/behavioural",
                templateUrl: "/static/modules/zhishiku/pages/behavioural.html",
                params:{"event":null},
                controller: "behaviouralController"
            })
            .state("zhishiku.sentiment", {
                url:"/sentiment",
                templateUrl: "/static/modules/zhishiku/pages/sentiment.html",
                params:{"event":null},
                controller: "sentimentController"
            })
            .state("zhishiku.viewpoint", {
                url:"/viewpoint",
                templateUrl: "/static/modules/zhishiku/pages/viewpoint.html",
                params:{"event":null},
                controller: "viewpointController"
            })
            .state("zhishiku.evolutionary", {
                url:"/evolutionary",
                templateUrl: "/static/modules/zhishiku/pages/evolutionary.html",
                params:{"event":null},
                controller: "evolutionaryController"
            })
            .state("zhishiku.guidance", {
                url:"/guidance",
                templateUrl: "/static/modules/zhishiku/pages/guidance.html",
                params:{"event":null},
                controller: "guidanceController"
            });
}]);