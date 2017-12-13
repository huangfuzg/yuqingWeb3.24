"use strict";
CQ.mainApp.usermanagementController
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider){
	    $stateProvider
	        .state("usermanagementController", {
	            url:"/umanagement",
	            templateUrl: "/static/modules/usermanagement/pages/u_management.html",
	            controller: "usermanagementController",
	            permission:"2"
	        })
	        .state("viewUserController", {
                url:"/viewUser/:userName",
                templateUrl: "/static/modules/usermanagement/pages/viewUser.html",
                controller: "usermanagementController"
            })
	        // .state("usermanagementController", {
	        //     url:"/management",
	        //     templateUrl: "/static/modules/usermanagement/pages/a_management.html",
	        //     controller: "usermanagementController",
	        //     permission:"3"
	        // });
	        .state("managetopicController", {
	            url:"/managetopic",
	            templateUrl: "/static/modules/usermanagement/pages/managetopic.html",
	            controller: "managetopicController",
	            permission:"2"
	        });
	}]);