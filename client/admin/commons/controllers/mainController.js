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
	.controller('headerController', ['$scope', '$rootScope', '$state', '$http','$interval','ngDialog', 'accountManage','headerService',
		function($scope, $rootScope, $state, $http,$interval,ngDialog,accountManage,headerService) {
            $scope.viewmore = function () {
                $state.go("showController")
            }
            $scope.delNot = function () {
                $('#NotLabel').hide();
            }
            $scope.showdetail = function(msgid)
            {
                $state.go("detailController",{msgid:msgid});
            }
            var cons={}
            headerService.getUnreadNum(cons).then(function (res) {
                // console.log('aaaaaa'+res);
                $scope.unReadNum = res.unread_num;
            })
            headerService.getUnread(cons).then(function (res) {
                // console.log('bbbbbb'+res);
                $scope.unReadList = res;
            })
            $interval(function () {
                var cons={}
                headerService.getUnreadNum(cons).then(function (res) {
                    // console.log('aaaaaa'+res);
                    $scope.unReadNum = res.unread_num;
                    if($scope.unReadNum!=0){
                        $('#NotLabel').show();
                    }
                })
                headerService.getUnread(cons).then(function (res) {
                    // console.log('bbbbbb'+res);
                    $scope.unReadList = res;
                })
            },20000);
            $scope.sendmsg = function () {
                $state.go('msgController');
            }
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
				$state.go("adminroleSettingController",{userName:$rootScope.curentUser});
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
	