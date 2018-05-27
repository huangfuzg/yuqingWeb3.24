"use strict";
CQ.mainApp.frameController
	// .config(["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider) {
	// 		$stateProvider
	// 			.state("attrController", {
	//                 url:"/userattr",
	//                 templateUrl: "/static/modules/systemsetting/pages/roleSetting.html",
	//                 controller: "headerController"
	//             });
	// 	}])
	.controller('mainController', ['$scope', '$rootScope', '$state', '$http', 'DataSourceTree',
		function($scope, $rootScope, $state, $http, DataSourceTreem) {


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
	.controller('headerController', ['$scope', '$rootScope', '$state', '$http','$interval','ngDialog', 'accountManage','headerService',
		function($scope, $rootScope, $state, $http,$interval,ngDialog,accountManage,headerService) {
		// console.log('+++++++++++');
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
						// request Notifications permission
						if (Notification && Notification.permission !== "granted") {
				    Notification.requestPermission(function (status) {
				      if (Notification.permission !== status) {
				        Notification.permission = status;
				      }
				    });
				  }
					// create websocket
					var ws = new WebSocket("ws://118.190.133.203:8200/websocketdata/pull_post");
					ws.onmessage = function(evt){

						var res = JSON.parse(evt.data)
						console.log(res);
						if (Notification && Notification.permission === "granted" && document.hidden==true) {
				          //const title = r.title.substring(0,12)+'...';
									res.data.forEach(function(d){
										const title = d.title.substring(0,12)+'...';
										const options = {
					            //body: r.content.substring(0,21)+'...',
					            // body:"abdfsljglhalnlbnalunaiojoldsjnl;jnbl;aj;好...",
					            icon:d.poster_img,
											body:d.content.substring(0,21)+'...',
					            dir:'auto',
					            // timestamp: Date.parse('01 Jan 2000 00:00:00')
					            // tag:"test",
					            data:d.url
					         };
					          var n = new Notification(title,options);
					          n.onclick = function(e){
					            e.preventDefault();
											window.focus();
											console.log(n.data);
					            window.open(n.data);
					          }
									})

				        };
					};

			// $scope.$watch($rootScope.curentUser,function(newValue,oldValue){
			// 	$scope.curentUser = newValue;
			// 	console.log($scope.curentUser);
			// });
			// $http.get("http://118.190.133.203:8100/yqdata/user_attr").then(function(data){
			// 	console.log(data);
			// });
			// $rootScope.headerController = true;
			// $rootScope.fusername = "yuqing123";
			// $scope.pwdyes=true;
			// $rootScope.fbirth = "1949-10-01";
			// $rootScope.femail = "123456@xjtu.com";
			// $rootScope.fwork = "西安交通大学";
			// $rootScope.fdistrict = "陕西省西安市碑林区";
			// $scope.searchword = "";
			// // $scope.$watch($rootScope.curentUser,function(newValue,oldValue){
			// // 	$scope.curentUser = newValue;
			// // 	console.log($scope.curentUser);
			// // });
			// // $scope.curentUser = $rootScope.curentUser;
			// $(".form_datetime")
   //              .datepicker({autoclose:true, format: 'yyyy-mm-dd'})
			$scope.search = function()
			{
				if($scope.searchword != "")
				{
					$state.go("yuqingTrendsController",{keywords:[$scope.searchword]});
				}
			}
            $scope.viewmore = function () {
                $state.go("showController")
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
			// $scope.changename = function(){
			// 	$scope.changed1 = true;
			// }
			// $scope.changebirth = function(){
			// 	$scope.changed2 = true;
			// }
			// $scope.changeemail = function(){
			// 	$scope.changed3 = true;
			// }
			// $scope.changework = function(){
			// 	$scope.changed4 = true;
			// }
			// $scope.changedistrict = function(){
			// 	$scope.changed5 = true;
			// }
			$scope.setattr = function()
			{
				$state.go("roleSettingController",{userName:$rootScope.curentUser});
			}
			// $scope.validatepwd = function(){
			// 	if($('#pwd').val()==="yuqing")
			// 	{
			// 		$scope.changed6=true;
			// 		$scope.pwdyes=false;
			// 	}
			// 	else{
			// 		$scope.pwd=true;
			// 	}
			// }
			// $scope.savepwd = function(){
			// 	if($('#input6').val()===$('#input7').val()){
			// 		$scope.changed6=false;
			// 		$scope.pwdyes=true;
			// 		$('#pwd').val("");
			// 		$('#input6').val("");
			// 		$('#input7').val("");
			// 	}
			// }
			// $scope.saveattr = function(){
			// 	if($('#input1').val())
			// 	{
			// 		$rootScope.fusername = $scope.username;
			// 		//$rootScope.fusername = $('#input1').val();
			// 	}
	  //           if($('#input2').val())
	  //           {
	  //           	$rootScope.fbirth = $('#input2').val();
	  //           }
	  //           if($('#input3').val())
	  //           {
	  //           	$rootScope.femail = $('#input3').val();
	  //           }
	  //           if($('#input4').val())
	  //           {
	  //           	$rootScope.fwork = $('#input4').val();
	  //           }
	  //           //$rootScope.fdistrict = $('.province cxselect option:selected').text();
	  //           //$rootScope.fdistrict = $('.province cxselect').val();
	  //           $rootScope.fdistrict = $(".province cxselect").find("option:selected").text();
	  //           //+$('.city cxselect option:selected').text()+$('.area cxselect option:selected').text();
	  //           console.log($rootScope.fdistrict);
	  //           $scope.changed1 = false;
	  //           $scope.changed2 = false;
	  //           $scope.changed3 = false;
	  //           $scope.changed4 = false;
	  //           $scope.changed5 = false;
   //      	}
			console.log("headerController", "start!");


	}])
	.controller('leftbarController', ['$scope', '$rootScope', '$state', 'DataSourceTree',"$http",
		function($scope, $rootScope, $state, DataSourceTree,$http) {
			//console.log(DataSourceTree.allLinks);
			$scope.allLinks = null;
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
