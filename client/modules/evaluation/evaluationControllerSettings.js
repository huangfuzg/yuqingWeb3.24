"use strict";
CQ.mainApp.dkController
    .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
        $stateProvider
            .state("dk", {
                url:"/evaluation/subject/analyse",
                templateUrl: "/static/modules/evaluation/pages/dk_analyse.html",
                controller: "dkController"
            })
            .state("evaluation", {
                url:"/evaluation",
                templateUrl: "/static/modules/evaluation/pages/evaluation.html",
                controller: "evaluationController",
                permission:"1"
            })
            .state("dk.petc", {
                url:"/petc?id",
                templateUrl: "/static/modules/evaluation/pages/petc.html",
                controller: "petcController",
                params:{"content":null},
                permission:"1"
            })
            .state("dk.zhibiao", {
                url:"/factor?id",
                templateUrl: "/static/modules/evaluation/pages/zhibiao.html",
                controller: "zhibiaoController",
                params:{"content":null},
                permission:"1"
            })
            .state("dk.ronghe", {
                url:"/mix?id",
                templateUrl: "/static/modules/evaluation/pages/ronghe.html",
                controller: "rongheController",
                params:{"content":null},
                permission:"1"
            })
    		.state("yqdk", {
                url:"/evaluation/analyse/steps?id",
                templateUrl: "/static/modules/evaluation/pages/steps.html",
                params:{"content":null},
                controller: "stepController"
            })
            .state("pg", {
                url:"/evaluation/result?id",
                templateUrl: "/static/modules/evaluation/pages/result.html",
                params:{"content":null},
                controller: "pgController"
            })
            .state("dk.method", {
                url:"/method?id",
                templateUrl: "/static/modules/evaluation/pages/methodProvide.html",
                params:{"event":null},
                controller: "methodController"
            })
    }]);