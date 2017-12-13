"use strict";
CQ.mainApp.groupmanagementController
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	    $stateProvider
	        .state("groupmanagementController", {
	            url:"/gmanagement",
	            templateUrl: "/static/modules/groupmanagement/pages/g_management.html",
	            controller: "groupmanagementController",
	            permission:"3"
	        });
	        // .state("usermanagementController", {
	        //     url:"/management",
	        //     templateUrl: "/static/modules/usermanagement/pages/a_management.html",
	        //     controller: "usermanagementController",
	        //     permission:"3"
	        // });
	}]);