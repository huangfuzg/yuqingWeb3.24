"use strict";
CQ.mainApp = {
    frameController:         angular.module("frame.controller", ["settingservice"]),
    frameServices:           angular.module("frame.services", ["commons","Notice", "scrollBottom"]),
    dashboardController:     angular.module("dashboard.Controller", ["dashboardService"]),
    topicController:         angular.module("topic.Controller", ["topicService"]),
    monitorController:       angular.module("monitor.Controller", ["monitorService","Notice"]),
    senmessageController:    angular.module("senmessage.Controller", ["senmessageService", "Notice"]),
    systemsettingController: angular.module("systemsetting.Controller", ["systemsettingService","Notice"]),
    searchController:        angular.module("search.Controller", ["yuqingsearchService"]),
    historyController:       angular.module("history.Controller",["historyService"]),
    friendLinkController:    angular.module("friendLink.Controller",[]),
    zhishikuController:      angular.module("zhishiku.Controller",["zhishikuService"]),
    errorController:         angular.module("error.Controller",[]),
    usermanagementController:angular.module("usermanagement.Controller",[]),
    groupmanagementController:angular.module("groupmanagement.Controller",[]),
    msgController:           angular.module("msg.Controller",["msgService"])
};
angular.module('mainApp', [
    "ui.router",
    "ngResource",
    "ui.bootstrap",
    "ngDraggable",
    "ngDialog",
    "frame.controller",
    "frame.services",
    "dashboard.Controller",
    "monitor.Controller",
    "topic.Controller",
    "senmessage.Controller",
    "systemsetting.Controller",
    "search.Controller",
    "history.Controller",
    "friendLink.Controller",
    "zhishiku.Controller",
    "error.Controller",
    "usermanagement.Controller",
    "groupmanagement.Controller",
    "msg.Controller"
    ])
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider",
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            //Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;
            $httpProvider.interceptors.push('http-auth-interceptor');
            $urlRouterProvider.otherwise("/dashboard");
            // $stateProvider
            // .state('dashboard', {
            //     url: "/dashboard",
            //     templateUrl: "/static/modules/dashboard/pages/dashboard.html",
            //     controller: "dashboardController"
            // });
            // $httpProvider.defaults.headers.common = {};
            // $httpProvider.defaults.headers.post = {};
            // $httpProvider.defaults.headers.put = {};
            // $httpProvider.defaults.headers.patch = {};
        }
    ])
    .run(['$rootScope', '$window', '$location', '$log', '$state', '$stateParams', 'accountManage', 'permissions', function($rootScope, $window, $location, $log, $state, $stateParams, accountManage, permissions) {
        $rootScope.curentUser = accountManage.getUsername();//获取用户名
        permissions.setPermissions(CQ.variables.PERMISSIONS);//设置用户权限
        var locationChangeStartOff = $rootScope.$on('$locationChangeStart', locationChangeStart);
        var locationChangeSuccessOff = $rootScope.$on('$locationChangeSuccess', locationChangeSuccess);
        var routeChangeStartOff = $rootScope.$on('$routeChangeStart', routeChangeStart);
        var routeChangeSuccessOff = $rootScope.$on('$routeChangeSuccess', routeChangeSuccess);
        var stateChangeSuccessOff = $rootScope.$on('$stateChangeSuccess', stateChangeSuccess);
        $rootScope.$state = $state;  
        $rootScope.$stateParams = $stateParams;
        $rootScope.back = function()
        {
            console.log($rootScope.previousState_name);
            console.log($rootScope.previousState_params);
            $rootScope.$state.go($rootScope.previousState_name, $rootScope.previousState_params);
        }
        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
                console.log(accountManage.isAuthenticated());
                if(!accountManage.isAuthenticated())
                {
                    accountManage.logout();
                }
                if(toState.permission&&!permissions.hasPermission(toState.permission))
                {
                    console.log("没有权限");
                    event.defaultPrevented = true;
                    $state.go('error',{errorcode:401});
                }
                if (fromState.scrollTop === true && window.localStorage) {
                    var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
                    window.localStorage.setItem(fromState.name, scrollTop);
                }
            });
            /* 在页面加载完成的时候将滚动条滚动到上次的位置 */
        $rootScope.$on('$viewContentLoaded', function (event) {
            if ($state.current.scrollTop === true && window.localStorage) {
                var scrollTop = window.localStorage.getItem($state.current.name);
                if (scrollTop) {
                    window.setTimeout(function () {
                        window.scrollTo(0, scrollTop);
                    }, 10)
                }
            }
        });
        function routeChangeStart(event) {
            console.log("manageSettings routeChangeStart");
        }

        function routeChangeSuccess(event) {
            console.log("manageSettings routeChangeSuccess");
        }

        function locationChangeStart(event) {

            console.log("manageSettings locationChangeStart");
        }

        function locationChangeSuccess(event) {
            console.log("mainApp locationChangeSuccess");
        }

        function stateChangeSuccess(event, toState, toParams, fromState, fromParams)
        {
            $rootScope.previousState_name = fromState.name;
            $rootScope.previousState_params = fromParams;
            console.log("mainApp stateChangeSuccess");
        }
    }])
    .directive('ngPermission', function(permissions) {
        return {
          link: function(scope, element, attrs) {
            if(typeof(attrs.ngPermission) == 'number')
                attrs.ngPermission = ''+attrs.ngPermission;
            if((typeof(attrs.ngPermission) != 'string'))
              throw "hasPermission value must be a string";
            if(attrs.ngPermission=="")
                return;
            var value = attrs.ngPermission.trim();
            var notPermissionFlag = value[0] === '!';
            if(notPermissionFlag) {
              value = value.slice(1).trim();
            }
       
            function toggleVisibilityBasedOnPermission() {
              var hasPermission = permissions.hasPermission(value);
       
              if(hasPermission && !notPermissionFlag || !hasPermission && notPermissionFlag)
                element.show();
              else
                element.hide();
            }
            toggleVisibilityBasedOnPermission();
            scope.$on('permissionsChanged', toggleVisibilityBasedOnPermission);
          }
        };
      });