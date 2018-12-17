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
                items: "",
                permission: "1",
            }
        ];
        var topicLists = [
            {
                label: "敏感话题",
                link: "#/senTopic", 
                hasShow: true,
                icon:"",
                items: "",
                permission: "1",
            },
            {
                label: "热点话题",
                link: "#/hotTopic", 
                hasShow:true,
                icon:"",
                items: "",
                permission: "1",
            }
        ];
        var modelLists = [
            {
                label: "全部模板",
                link: "#/topicmodel/-1/-1", 
                hasShow: true,
                icon:"",
                items: "",
                siteTypeId: -1,
                siteId: -1,
                permission: "2",
            },
            {
                label: "高考",
                link: "#/topicmodel/0/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 0,
                siteId: -1,
                permission: "2",
                items: [{
                    label: "之前",
                    link: "#/topicmodel/0/0", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 0,
                    permission: "2",
                },
                {
                    label: "期间",
                    link: "#/topicmodel/0/1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 1,
                    permission: "2",
                },
                {
                    label: "之后",
                    link: "#/topicmodel/0/2", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 2,
                    permission: "2",
                }]
            },
            {
                label: "成考",
                link: "#/topicmodel/1/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 1,
                siteId: -1,
                permission: "2",
                items: [{
                    label: "之前",
                    link: "#/topicmodel/1/0", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 0,
                    permission: "2",
                },
                {
                    label: "期间",
                    link: "#/topicmodel/1/1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 1,
                    permission: "2",
                },
                {
                    label: "之后",
                    link: "#/topicmodel/1/2", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 2,
                    permission: "2",
                }]
            },
            {
                label: "研考",
                link: "#/topicmodel/2/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 2,
                siteId: -1,
                permission: "2",
                items: [{
                    label: "之前",
                    link: "#/topicmodel/2/0", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 2,
                    siteId: 0,
                    permission: "2",
                },
                {
                    label: "期间",
                    link: "#/topicmodel/2/1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 2,
                    siteId: 1,
                    permission: "2",
                },
                {
                    label: "之后",
                    link: "#/topicmodel/2/2", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 2,
                    siteId: 2,
                    permission: "2",
                }]
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
                siteId: -1,
                permission: "1",
            },
            {
                label: "新闻类",
                link: "#/monitor/0/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 0,
                siteId: -1,
                permission: "1",
                items: [{
                    label: "人民网教育",
                    link: "#/monitor/0/1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 0,
                    permission: "1",
                },
                {
                    label: "搜狐教育",
                    link: "#/monitor/0/0", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 1,
                    permission: "1",
                },
                {
                    label: "新浪教育",
                    link: "#/monitor/0/2", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 0,
                    siteId: 2,
                    permission: "1",
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
                permission: "1",
                items: [{
                    label: "考研帮论坛",
                    link: "#/monitor/1/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 0,
                    permission: "1",
                },
                {
                    label: "天涯论坛",
                    link: "#/monitor/1/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 1,
                    permission: "1",
                },
                {
                    label: "凯迪社区",
                    link: "#/monitor/1/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 1,
                    siteId: 2,
                    permission: "1",
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
                permission: "1",
                items: [{
                    label: "新浪微博",
                    link: "#/monitor/2/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 2,
                    siteId: 0,
                    permission: "1",
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
                permission: "1",
                items: [{
                    label: "西安交通大学贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 0,
                    permission: "1",
                },
                {
                    label: "答案贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 1,
                    permission: "1",
                },
                {
                    label: "高考贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 2,
                    permission: "1",
                },
                 {
                    label: "高三贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 3,
                    permission: "1",
                },
                {
                    label: "高考1997贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 4,
                    permission: "1",
                },
                {
                    label: "高考恋爱100天贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 5,
                    permission: "1",
                },
                {
                    label: "金太阳贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 6,
                    permission: "1",
                },
                {
                    label: "教育贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 7,
                    permission: "1",
                },
                {
                    label: "考试贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 8,
                    permission: "1",
                },
                {
                    label: "理科贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 9,
                    permission: "1",
                },
                {
                    label: "李毅贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 10,
                    permission: "1",
                },
                {
                    label: "理综贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 11,
                    permission: "1",
                },
                {
                    label: "全程高考贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 12,
                    permission: "1",
                },
                {
                    label: "全国卷贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 13,
                    permission: "1",
                },
                {
                    label: "数学贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 14,
                    permission: "1",
                },
                {
                    label: "文科贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 15,
                    permission: "1",
                },
                {
                    label: "文综贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 16,
                    permission: "1",
                },
                {
                    label: "学生贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 17,
                    permission: "1",
                },
                {
                    label: "语文贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 18,
                    permission: "1",
                },
                {
                    label: "答案贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 1,
                    permission: "1",
                },
                {
                    label: "高考贴吧",
                    link: "#/monitor/3/-1", 
                    hasShow:true,
                    icon:"",
                    siteTypeId: 3,
                    siteId: 2,
                    permission: "1",
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
                items: "",
                permission: "1",
            },
            {
                label: "全网搜索",
                link: "#/monitor/5/-1", 
                hasShow:true,
                icon:"",
                siteTypeId: 5,
                siteId: -1,
                items: "",
                permission: "1",
            }
        ];
        var senMessages = [
            {
                label:"敏感信息",
                link: "#/senmessages",
                hasShow: true,
                icon: "",
                items: "",
                permission: "1",
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
                items: "",
                permission: "1",
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
                items: "",
                permission: "1",
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
                items: "",
                permission: "1",
            }
        ];
        var evaluation = [
            {
                label:"舆情导控",
                link: "#/evaluation",
                hasShow: true,
                icon: "",
                items: "",
                permission: "1",
            }
        ];
        var friendLink = [
            {
                label:"友情链接",
                link: "#/friendLink",
                hasShow: true,
                icon: "",
                items: "",
                permission: "1",
            }
        ];
        var zhishiku = [
            {
                label:"舆情知识库",
                link:"#/zhishiku/subjects",
                hasShow:true,
                icon:"",
                items:"",
                permission: "1",
            }
        ];
        var usermanagement = [
            {
                label:"用户管理",
                link:"#/umanagement",
                hasShow:true,
                icon:"",
                items:"",
                permission: "2",
            }
        ];
        // var groupmanagement = [
        //     {
        //         label:"用户组管理",
        //         link:"#/gmanagement",
        //         hasShow:true,
        //         icon:"",
        //         items:"",
        //         permission: "3",
        //     }
        // ];
        factories.allLinks = [
            {
                label:"主页",
                link: "#/dashboard",
                hasShow: true,
                icon: "fa fa-dashboard",
                items: "",
                permission: "1",
            },
            {
                label:"热点话题",
                link: "#/hotTopic",
                hasShow: true,
                icon: "fa fa-bar-chart-o",
                items: "",
                permission: "1",
            },
            {
                label:"实时监控",
                link: "#/monitor/-1/-1",
                hasShow: true,
                icon: "fa fa-eye",
                items: monitorLists,
                permission: "1",
            },
            
            {
                label:"敏感信息",
                link: "#/senmessages",
                hasShow: true,
                icon: "fa fa-table",
                items: "",
                permission: "1",
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
                items: "",
                permission: "5",
            },
            {
                label:"舆情知识库",
                link:"#/zhishiku/subjects",
                hasShow:true,
                icon:"fa fa-database",
                items:"",
                permission: "5",
            },
            {
                label:"舆情导控",
                link: "#/evaluation",
                hasShow: true,
                icon: "fa fa-globe",
                items: "",
                permission: "5",
            },
            {
                label:"话题管理",
                link: "#/userSetting",
                hasShow: true,
                icon: "fa fa-gear",
                items: "",
                permission: "1",
            },
            {
                label:"用户管理",
                link: "#/umanagement",
                hasShow: true,
                icon: "fa fa-user",
                items: "",
                permission: "2",
            },
            {
                label:"话题模板管理",
                link: "#/topicmodel/-1/-1",
                hasShow: true,
                icon: "fa fa-user",
                items: modelLists,
                permission: "2",
            },
            // {
            //     label:"用户组管理",
            //     link: "#/gmanagement",
            //     hasShow: true,
            //     icon: "fa fa-group",
            //     items: "",
            //     permission: "3",
            // }
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