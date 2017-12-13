"use strict";
CQ.mainApp.reportController
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	    $stateProvider
	        .state("reportlistController", {
	            url:"/reportlist",
	            templateUrl: "/static/modules/report/pages/reportList.html",
	            controller: "reportlistController",
	            permission:"1"
	        })
	        .state("reportdesignController", {
	            url:"/reportdesign",
	            templateUrl: "/static/modules/report/pages/reportDesign.html",
	            controller: "reportdesignController",
	            permission:"1"
			})
			.state("reportController", {
	            url:"/report",
	            templateUrl: "/static/modules/report/pages/report.html",
	            controller: "reportController",
	            permission:"1"
			});
	}]);