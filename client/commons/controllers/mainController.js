"use strict";
CQ.mainApp.frameController
	.controller('mainController', ['$scope', '$rootScope', '$state', 'DataSourceTree',
		function($scope, $rootScope, $state, DataSourceTree) {
		console.log("mainController", "start!");
		$rootScope.mainController = false;
		$scope.cardNums = 0;
		$("#load").hide();
		$scope.$on('$includeContentLoaded', function(event, data) {
			$scope.cardNums += 1;
			if($scope.cardNums == 3) {
					App.init();
					//Dashboard.init();
					$rootScope.mainController = true;
					$scope.$broadcast('uirun', "uirun");
					console.log("UI框架初始化完成");
			}
		});
	}])
	.controller('headerController', ['$scope', '$rootScope', '$state', '$http',
		function($scope, $rootScope, $state, $http) {
			$rootScope.headerController = true;
			$scope.searchword = "";
			$scope.search = function()
			{
				if($scope.searchword != "")
				{
					$state.go("yuqingTrendsController",{keywords:[$scope.searchword]});
				}
			}
			$scope.logout = function()
			{
				$http.post("http://localhost/api/auth/logout",{})
				.success(function(data,status,headers,config){
					console.log("logout!!!");
				});
			}
			console.log("headerController", "start!");
	}])
	.controller('leftbarController', ['$scope', '$rootScope', '$state', 'DataSourceTree',"$http", 
		function($scope, $rootScope, $state, DataSourceTree,$http) {
			//console.log(DataSourceTree.allLinks);
			$scope.allLinks = null;
			$scope.$on('$viewContentLoaded', function() {
	            if($rootScope.mainController) {
	                App.runui();
	            }
        	});
        	$scope.reload = function()
	        {
	            $state.reload();
	        }
        	var urls = CQ.variable.RESTFUL_URL + "dataSourceTree";
			$http.get(urls).then(function(datas) {
				var allsites = datas.data.data.allSites;
				DataSourceTree.allLinks[2].items.forEach(function(si) {
					allsites.forEach(function(ss) {
						if(ss.siteTypeId == si.siteTypeId) {
							var detail = ss.detail_sites;
							var items = [];
							detail.forEach(function(de) {
								var it = {};
								it.hasShow = true;
								it.icon = "";
								it.items = "";
								it.label = de.siteName;
								it.siteTypeId = si.siteTypeId;
								it.siteId = de.siteId;
								it.link = "#/monitor/" +si.siteTypeId + "/" +  de.siteId;
								items.push(it);
							});
							si.items = items;
						}
					});
				});
				console.log(DataSourceTree.allLinks[2].items);
				$scope.allLinks = DataSourceTree.allLinks;
				$rootScope.leftbartree = true;
				
			});
			$scope.allLinks = DataSourceTree.allLinks;
			//console.log(DataSourceTree.allLinks[2].items);
			$scope.moduleHomelinkclick = function(item) {
				$scope.allLinks.forEach(function(d) {
					d.isActive = "";
					if(d.items != "") {
						d.items.forEach(function(d1) {
							d1.isActive = "";
							if(d1.items != ""){
								d1.items.forEach(function(d2) {
									d2.isActive = "";
								});
							}
						});
					}
				});
				$scope.allLinks.forEach(function(d) {
					if(item.label == d.label) {
						d.isActive = "active";
					}
					if(d.items != "") {
						d.items.forEach(function(d1) {
							if(item.label == d1.label) {
								d1.isActive = "active";
							}
							if(d1.items != ""){
								d1.items.forEach(function(d2) {
									if(item.label == d2.label) {
										d2.isActive = "active";
									}
								});
							}
						});
					}
				});
				//console.log(item);
			};
			console.log("leftbarController", "start!"); 
	}])
	.controller('themeController', ['$scope', '$rootScope', '$state', 
		function($scope, $rootScope, $state) {
			$rootScope.themeController = true;
			console.log("themeController", "start!");
	}]);