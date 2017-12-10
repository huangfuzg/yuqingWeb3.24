"use strict";
angular.module('settingservice',[])
    .factory("DataSourceTree",function($rootScope) {
        var factories = {};                            
        factories.allLinks = [
            {
                label:"主页",
                link: "#/dashboard",
                hasShow: true,
                icon: "fa fa-dashboard",
                items: "",
                permission: "3",
            },
            {
                label:"用户管理",
                link: "#/usermanage",
                hasShow: true,
                icon: "fa fa-user",
                items: "",
                permission: "3",
            },
            {
                label:"用户组管理",
                link: "#/usergroupmanage",
                hasShow: true,
                icon: "fa fa-group",
                items: "",
                permission: "3",
            },
            {
                label:"内容管理",
                link: "#/content",
                hasShow: true,
                icon: "fa fa-database",
                items: "",
                permission: "3",
            }
        ];
        /**
         * 将json格式的数据转化为字符串作为value,以"jsondatas"为key
         */
        factories.jsonDataToForm = function(jsondata) {
            console.log("jsonDataToForm");
            if (jsondata.$$hashKey) {
                delete jsondata.$$hashKey;
            }
            if (jsondata.objectId) {
                delete jsondata.objectId;
            }

            var obj = {};
            for (var key in jsondata) {
                obj[key] = jsondata[key];
            }
            //格式化对象,作为form数据
            var formData = $.param(obj);
            return formData;
        };
        return factories;
    });