"use strict";
CQ.mainApp = {
    frameController:         angular.module("frame.controller", ["settingservice"]),
    frameServices:           angular.module("frame.services", ["commons","Notice", "scrollBottom"]),
    dashboardController:     angular.module("dashboard.Controller", ["dashboardService"]),
    topicController:         angular.module("topic.Controller", ["topicService"]),
    monitorController:       angular.module("monitor.Controller", ["monitorService","Notice"]),
    senmessageController:    angular.module("senmessage.Controller", ["senmessageService", "Notice"]),
    systemsettingController: angular.module("systemsetting.Controller", ["Notice"]),
    searchController:        angular.module("search.Controller", ["yuqingsearchService"]),
    historyController:       angular.module("history.Controller",["historyService"]),
    friendLinkController:    angular.module("friendLink.Controller",[]),
    zhishikuController:      angular.module("zhishiku.Controller",["zhishikuService"])
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
    "zhishiku.Controller"
    ])
    .config(["$stateProvider", "$urlRouterProvider", "$locationProvider", "$httpProvider",
        function($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
            //Enable cross domain calls
            $httpProvider.defaults.useXDomain = true;
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
    .run(['$rootScope', '$window', '$location', '$log', '$state', '$stateParams', function($rootScope, $window, $location, $log, $state, $stateParams) {

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
    }]);