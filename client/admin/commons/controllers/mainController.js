"use strict";
CQ.mainApp.frameController
	.config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
			// $stateProvider
			// 	.state("attrController", {
	        //         url:"/userattr",
	        //         templateUrl: "/static/modules/systemsetting/pages/roleSetting.html",
	        //         controller: "headerController"
	        //     });
		}])
	.controller('mainController', ['$scope', '$rootScope', '$state', '$http', 'DataSourceTree', 
		function($scope, $rootScope, $state, $http, DataSourceTreem) {
		console.log("mainController", "start!");
		$rootScope.mainController = false;
		$scope.cardNums = 0;
		$("#load").hide();
		$scope.$on('$includeContentLoaded', function(event, data) {
			$scope.cardNums += 1;
			if($scope.cardNums == 2) {
					App.init();
					//Dashboard.init();
					$rootScope.mainController = true;
					$scope.$broadcast('uirun', "uirun");
					console.log("UI框架初始化完成");
			}
		});
	}])
	.controller('headerController', ['$scope', '$rootScope', '$state', '$http','ngDialog', 'accountManage','UserattrService',
		function($scope, $rootScope, $state, $http,ngDialog,accountManage,UserattrService) {
			$scope.logout = function()
			{
				accountManage.logout();
				// $http.post("/api/auth/logout",{})
				// .success(function(data,status,headers,config){
				// 	CQ.variables.CURRENT_USER = "";
				// 	console.log("logout!!!");
				// });
			}
			$scope.setattr = function()
			{
				$state.go("roleSettingController",{userName:$rootScope.curentUser});
			}
			console.log("headerController", "start!");
	}])
	.controller('leftbarController', ['$scope', '$rootScope', '$state', 'DataSourceTree',"$http", 
		function($scope, $rootScope, $state, DataSourceTree,$http) {
			//console.log(DataSourceTree.allLinks);
			$scope.allLinks = DataSourceTree.allLinks;
			console.log($scope.allLinks);
			// $scope.curentUser = CQ.variables.CURRENT_USER;
			$scope.$on('$viewContentLoaded', function() {
	            if($rootScope.mainController) {
	                App.runui();
	            }
        	});
        	
        	$scope.reload = function()
	        {
	            $state.reload();
	        }
			console.log("leftbarController", "start!"); 
	}])
	.controller('themeController', ['$scope', '$rootScope', '$state', 
		function($scope, $rootScope, $state) {
			$rootScope.themeController = true;
			console.log("themeController", "start!");
	}]);
	