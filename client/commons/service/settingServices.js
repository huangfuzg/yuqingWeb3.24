"use strict";
angular.module('settingservice',[])
    .factory("DataSourceTree",function($rootScope) {
        var factories = {};
        var dashboard = [
            {
                label: "主页",
                link: "#/dashboard", 
                hasShow:true,
                icon:"",
                items: ""
            }
        ];
        var topicLists = [
            {
                label: "敏感话题",
                link: "#/senTopic", 
                hasShow: true,
                icon:"",
                items: ""
            },
            {
                label: "热点话题",
                link: "#/hotTopic", 
                hasShow:true,
                icon:"",
                items: ""
            }
        ];
        var monitorLists = [
            {
                label: "全部数据源",
                link: "#/monitor/-1/-1", 
                hasShow: true,
                icon:"",
                items: "",
                siteTypeId: -1,
                siteId: -1
            },
            {
                label: "新闻类",
                link: "#/monitor/0/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 0,
                siteId: -1,
                items: [{
                    label: "人民网教育",
                    link: "#/monitor/0/1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 0,
                },
                {
                    label: "搜狐教育",
                    link: "#/monitor/0/0", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 1,
                },
                {
                    label: "新浪教育",
                    link: "#/monitor/0/2", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 2,
                },   
                ]
            },
            {
                label: "论坛类",
                link: "#/monitor/1/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 1,
                siteId: -1,
                items: [{
                    label: "考研帮论坛",
                    link: "#/monitor/1/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 0,
                },
                {
                    label: "天涯论坛",
                    link: "#/monitor/1/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 1,
                },
                {
                    label: "凯迪社区",
                    link: "#/monitor/1/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 2,
                },
                  
                ]
            },
            {
                label: "微博类",
                link: "#/monitor/2/-1", 
                hasShow:true,
                siteTypeId: 2,
                siteId: -1,
                icon:"",
                items: [{
                    label: "新浪微博",
                    link: "#/monitor/2/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 2,
                    siteId: 0,
                },
                 
                ]
            },
            {
                label: "贴吧类",
                link: "#/monitor/3/-1", 
                hasShow:true,
                siteTypeId: 3,
                siteId: -1,
                icon:"",
                items: [{
                    label: "西安交通大学贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 0,
                },
                {
                    label: "答案贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 1,
                },
                {
                    label: "高考贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 2,
                },
                 {
                    label: "高三贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 3,
                },
                {
                    label: "高考1997贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 4,
                },
                {
                    label: "高考恋爱100天贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 5,
                },
                {
                    label: "金太阳贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 6,
                },
                {
                    label: "教育贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 7,
                },
                {
                    label: "考试贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 8,
                },
                {
                    label: "理科贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 9,
                },
                {
                    label: "李毅贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 10,
                },
                {
                    label: "理综贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 11,
                },
                {
                    label: "全程高考贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 12,
                },
                {
                    label: "全国卷贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 13,
                },
                {
                    label: "数学贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 14,
                },
                {
                    label: "文科贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 15,
                },
                {
                    label: "文综贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 16,
                },
                {
                    label: "学生贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 17,
                },
                {
                    label: "语文贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 18,
                },
                {
                    label: "答案贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 1,
                },
                {
                    label: "高考贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 2,
                },
                ]
            },
            {
                label: "微信类",
                link: "#/monitor/4/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 4,
                siteId: -1,
                items: ""
            },
            {
                label: "全网搜索",
                link: "#/monitor/5/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 5,
                siteId: -1,
                items: ""
            }
        ];
        var senMessages = [
            {
                label:"敏感信息",
                link: "#/senmessages",
                hasShow: true,
                icon: "",
                items: ""
            },
            // {
            //     label:"手工添加",
            //     link: "#/addmessages",
            //     hasShow: true,
            //     icon: "",
            //     items: ""
            // }
        ];
        var systemSettings = [
            {
                label:"话题设置",
                link: "#/userSetting",
                hasShow: true,
                icon: "",
                items: ""
            },
            // {
            //     label:"角色设置",
            //     link: "#/roleSetting",
            //     hasShow: true,
            //     icon: "",
            //     items: ""
            // }
        ];
        var yuqingSearch = [
            {
                label:"舆情检索",
                link: "#/yuqingTrends",
                hasShow: true,
                icon: "",
                items: ""
            },
            // {
            //     label:"关联分析",
            //     link: "#/yuqingAnaly",
            //     hasShow: true,
            //     icon: "",
            //     items: ""
            // }
        ];
        var historys = [
            {
                label:"历史案例",
                link: "#/yuqingHistory",
                hasShow: true,
                icon: "",
                items: ""
            }
        ];
        var friendLink = [
            {
                label:"友情链接",
                link: "#/friendLink",
                hasShow: true,
                icon: "",
                items: ""
            }
        ];
        var zhishiku = [
            {
                label:"舆情知识库",
                link:"#/zhishiku/subjects",
                hasShow:true,
                icon:"",
                items:""
            }
        ]
        factories.allLinks = [
            {
                label:"主页",
                link: "#/dashboard",
                hasShow: true,
                icon: "fa fa-dashboard",
                items: ""
            },
            {
                label:"热点话题",
                link: "#/hotTopic",
                hasShow: true,
                icon: "fa fa-bar-chart-o",
                items: ""
            },
            {
                label:"实时监控",
                link: "#/monitor/-1/-1",
                hasShow: true,
                icon: "fa fa-eye",
                items: monitorLists
            },
            
            {
                label:"敏感信息",
                link: "#/senmessages",
                hasShow: true,
                icon: "fa fa-table",
                items: ""
            },
            // {
            //     label:"舆情检索",
            //     link: "#/yuqingTrends",
            //     hasShow: true,
            //     icon: "fa fa-search",
            //     items: yuqingSearch
            // },
            {
                label:"历史案例",
                link: "#/yuqingHistory",
                hasShow: true,
                icon: "fa fa-star",
                items: ""
            },
            {
                label:"舆情知识库",
                link:"#/zhishiku/subjects",
                hasShow:true,
                icon:"fa fa-database",
                items:""
            },
            {
                label:"系统设置",
                link: "#/userSetting",
                hasShow: true,
                icon: "fa fa-gear",
                items: ""
            }
            // {
            //     label:"友情链接",
            //     link: "#/friendLink",
            //     hasShow: true,
            //     icon: "fa fa-flag",
            //     items: friendLink
            // }
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