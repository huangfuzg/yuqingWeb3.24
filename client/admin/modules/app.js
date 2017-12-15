"use strict";
CQ.mainApp = {
    frameController:         angular.module("frame.controller", ["settingservice","headerService"]),
    frameServices:           angular.module("frame.services", ["commons","Notice", "scrollBottom"]),
    dashboardController:     angular.module("dashboard.Controller", []),
    contentController:       angular.module("content.Controller", []),
    usergroupmanageController:     angular.module("usergroupmanage.Controller", []),
    usermanageController:     angular.module("usermanage.Controller", []),
    errorController:     angular.module("error.Controller", []),
    systemsettingController:    angular.module("systemsetting.Controller", ["systemsettingService"]),
    msgController:           angular.module("msg.Controller",["msgService"]),
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
    "content.Controller",
    "usergroupmanage.Controller",
    "usermanage.Controller",
    "error.Controller",
    "systemsetting.Controller",
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
    })
    .directive('ngEditable', function(ngDialog) {
        return {
          link: function(scope, element, attrs) {
            if(attrs.ngEditable !== false && attrs.ngEditable !== 'false')
            {
                var div = $('<div class="edit-container"></div>'),
                edit_btn = $('<a href="javascript:void"></a>'),
                remove_btn = $('<a href="javascript:void"></a>'),
                style_btn = $('<a href="javascript:void"></a>'),
                tagName = element[0].tagName,
                editing = false;
                // input = $('<textarea></textarea>');
                // element.css({'-webkit-user-modify':'read-write-plaintext-only'});
                element.parent().append(div);
                div.append(remove_btn);
                div.append(style_btn);
                div.append(edit_btn);
                // div.append(input);
                div.append(element);
                div.css({position:'relative',width:element.width()});
                edit_btn.attr("title","编辑");
                edit_btn.addClass('btn fa fa-edit pull-right');
                edit_btn.css({'margin-top':element.height()/2-10});
                edit_btn.click(function(){
                    element.css({'-webkit-user-modify':'read-write-plaintext-only'});
                    edit_btn.hide();
                    remove_btn.hide();
                    style_btn.hide();
                    element.focus();
                    editing = true;
                    element.keyup(function(ev){
                        if(attrs['ngBind']&&attrs['ngBind']!='')
                        {
                            scope[attrs['ngBind']] = element.text();
                            scope.$digest();
                        }
                    });
                    element.focusout(function(ev){
                        element.css({'-webkit-user-modify':'read-only'});
                        editing = false;
                    });
                });
                remove_btn.attr("title","删除");
                remove_btn.addClass('btn fa fa-trash-o pull-right');
                remove_btn.css({'margin-top':element.height()/2-10});
                remove_btn.click(function(){
                    div.remove();
                });
                style_btn.attr("title","修改样式");
                style_btn.addClass('btn fa fa-tags pull-right');
                style_btn.css({'margin-top':element.height()/2-10});
                style_btn.click(function(){
                    ngDialog.open(
                    {
                        template: '/static/modules/senmessage/pages/addSenMessage.html',
                        // controller: 'addSenMessage',
                        // appendClassName: "ngdialog-theme-details",
                        data: [],
                        width: "100%",
                        scope: scope
                    });
                });
                div.hover(function(){
                    if(!editing)
                    {
                        edit_btn.show();
                        remove_btn.show();
                        style_btn.show();
                    }    
                },function(){
                    edit_btn.hide();
                    remove_btn.hide();
                    style_btn.hide();
                });
                // input.css({position:'absolute',width:'100%','min-height':'100%',border:'none','word-break':'break-all'});
                // console.log(div);
            }
          }
        };
    })
    .directive('ngAddelement', function() {
        var elementList = []
        return {
          link: function(scope, element, attrs) {
            
          }
        };
    });