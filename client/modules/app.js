"use strict";
CQ.mainApp = {
    frameController:         angular.module("frame.controller", ["settingservice","headerService"]),
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
    usermanagementController:angular.module("usermanagement.Controller",["usermanagementService"]),
    groupmanagementController:angular.module("groupmanagement.Controller",[]),
    msgController:           angular.module("msg.Controller",["msgService"]),
    reportController:        angular.module("report.Controller",["reportService"]),
    topicmodelController:    angular.module("topicmodel.Controller",["topicmodelService","Notice"]),
    dkController:      angular.module("dk.Controller",["dkService"]),
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
    "msg.Controller",
    "report.Controller",
    "topicmodel.Controller",
    "dk.Controller",
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
                console.log(element[0].tagName);
                var div = $('<div class="edit-container"></div>'),
                edit_btn = $('<a href="javascript:void"></a>'),
                remove_btn = $('<a href="javascript:void"></a>'),
                style_btn = $('<a href="javascript:void"></a>'),
                editing = false;
                // input = $('<textarea></textarea>');
                // element.css({'-webkit-user-modify':'read-write-plaintext-only'});
                element.parent().append(div);
                div.append(remove_btn);
                div.append(style_btn);
                div.append(edit_btn);
                // div.append(input);
                div.append(element);
                div.css({position:'relative'});
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
                return div;
            }
        }
        };
    })
    .directive('ngAddelement', function($compile) {
        var elementList = []
        return {
          link: function(scope, element, attrs) {
            if(attrs.ngAddelement !== false && attrs.ngAddelement !== 'false')
            {
                var div = $('<div class="addable-menu pull-right"></div>'),
                    div1 = $('<div class="ngaddable"></div>'),
                    add_btn = $('<a href="javascript:void" class="btn btn-primary btn-xs btn-circle"></a>'),
                    add_i = $('<i class="fa fa-plus"></i>'),
                    menu = $('<ul class="panel nav nav-list collapse" style="background-color:#eeeeee"></ul>'),
                    menu_h = $('<li><a href="javascript::void">标题</a></li>'),
                    menu_p = $('<li><a href="javascript::void">段落文本</a></li>'),
                    menu_img = $('<li><a href="javascript::void">图片</a></li>'),
                    h_menu = $('<ul class="nav nav-list collapse"></ul>'),
                    h_menu_h1 = $('<li><a href="javascript::void">标题1</a></li>'),
                    h_menu_h2 = $('<li><a href="javascript::void">标题2</a></li>'),
                    h_menu_h3 = $('<li><a href="javascript::void">标题3</a></li>'),
                    h_menu_h4 = $('<li><a href="javascript::void">标题4</a></li>'),
                    h_menu_h5 = $('<li><a href="javascript::void">标题5</a></li>'),
                    h_menu_h6 = $('<li><a href="javascript::void">标题6</a></li>'),
                    h_memu_show = false;
                menu.append(menu_h);
                menu.append(menu_p);
                menu.append(menu_img);
                h_menu.append(h_menu_h1);
                h_menu.append(h_menu_h2);
                h_menu.append(h_menu_h3);
                h_menu.append(h_menu_h4);
                h_menu.append(h_menu_h5);
                h_menu.append(h_menu_h6);
                menu_h.append(h_menu);
                div.append(add_btn);
                add_btn.append(add_i);
                div.css({position:'relative'});
                menu.css({'width':'150px'});
                menu.css({'position':'absolute','right':0});
                menu.addClass('text-center');
                h_menu.css({'background-color':'#dddddd'});
                div.hover(function(ev){
                    menu.addClass('in');
                },function(ev){
                    menu.removeClass('in');
                });
                menu_h.click(function(ev){
                    if(h_memu_show)
                        h_menu.removeClass('in');
                    else
                        h_menu.addClass('in');
                    h_memu_show = !h_memu_show;
                });
                if(attrs.ngEditable && attrs.ngEditable !== false && attrs.ngEditable !== 'false')
                {
                    element.parent().parent().append(div1);
                    div1.append(element.parent());
                    div1.append(div);
                    // element.parent().after(div);
                }
                else
                {
                    element.parent().append(div1);
                    div1.append(element);
                    div1.append(div);
                    // element.after(div);
                }
                add_btn.after(menu);
                div1.hover(function(ev){
                    element.css({'border-bottom':'.5px dashed'});
                    div.show();
                },function(ev){
                    element.css({'border-bottom':'none'});
                    div.hide();
                });
                menu_p.click(function(ev){
                    var e_p = $compile('<p ng-editable="true" ng-addelement="true">编辑</p>')(scope);
                    div.after(e_p.parent().parent());
                    e_p.focus();
                });
                menu_img.click(function(ev){
                    var e_img = $compile('<img ng-editable="true" ng-addelement="true"/>')(scope);
                    div.after(e_img.parent().parent());
                });
                h_menu_h1.click(function(ev){
                    var e_h1 = $compile('<h1 ng-editable="true" ng-addelement="true">标题一</h1>')(scope);
                    div.after(e_h1.parent().parent());
                    e_h1.focus();
                });
                h_menu_h2.click(function(ev){
                    var e_h2 = $compile('<h2 ng-editable="true" ng-addelement="true">标题二</h2>')(scope);
                    div.after(e_h2.parent().parent());
                    e_h2.focus;
                });
                h_menu_h3.click(function(ev){
                    var e_h3 = $compile('<h3 ng-editable="true" ng-addelement="true">标题三</h3>')(scope);
                    div.after(e_h3.parent().parent());
                    e_h3.focus();
                });
                h_menu_h4.click(function(ev){
                    var e_h4 = $compile('<h4 ng-editable="true" ng-addelement="true">标题四</h4>')(scope);
                    div.after(e_h4.parent().parent());
                    e_h4.focus();
                });
                h_menu_h5.click(function(ev){
                    var e_h5 = $compile('<h5 ng-editable="true" ng-addelement="true">标题五</h5>')(scope);
                    div.after(e_h5.parent().parent());
                    e_h5.focus();
                });
                h_menu_h6.click(function(ev){
                    var e_h6 = $compile('<h6 ng-editable="true" ng-addelement="true">标题六</h6>')(scope);
                    div.after(e_h6.parent().parent());
                    e_h6.focus();
                });
                return div;
            }
          }
        };
    });