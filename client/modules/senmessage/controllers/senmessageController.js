﻿"use strict";
CQ.mainApp.senmessageController
    .controller("senmessageController", ["$rootScope", "$scope", "$http", "ngDialog", "SenFacService", "notice",
        function($rootScope, $scope, $http, ngDialog, SenFacService, notice) {
            console.log("senmessageController", "start!!!");
            $scope.sendata = null;
            $scope.pageSize = 5;
            $scope.pages = 10;
            $scope.newpage = $scope.pages > 5 ? 5 : $scope.pages;
            $scope.pageList = [];
            $scope.pageNum = 1;
            $scope.baseUrl = CQ.variable.RESTFUL_URL;
            $scope.selectList = [];
            $scope.date = getFormatData();
            $scope.dataObj = new DataObj();
            $scope.topic = [{
                "name": "-所有话题-",
                "value": "-1"
            }, {
                "name": "研究生考试",
                "value": 22
            }, {
                "name": "研究生",
                "value": 29
            }, {
                "name": "交大",
                "value": 34
            }, {
                "name": "考研",
                "value": 38
            }, {
                "name": "管综",
                "value": 39
            }];
            $scope.state = [{
                "name": "-所有状态-",
                "value": -1
            }, {
                "name": "未上报",
                "value": 0
            }, {
                "name": "上报未处理",
                "value": 1
            }, {
                "name": "上报已处理",
                "value": 2
            }];
            $scope.getPageData = function(page){
                var page_num = 10;
                var pageset_min = [1, 2, 3, 4, 5],
                    pageset_max = pageset_min.map(d => d + $scope.pages - 5);
                $scope.pagesendata = $scope.sendata.slice(page * page_num - page_num, page * page_num);
                console.log($scope.pagesendata)
                if ($scope.pages < 5) {
                    $scope.pageList = [];
                    for (var i = 1; i < $scope.pages + 1; i++)
                        $scope.pageList.push(i);
                } else if (page < 4)
                    $scope.pageList = angular.copy(pageset_min);
                else if (page > $scope.pages - 3)
                    $scope.pageList = angular.copy(pageset_max);
                else
                    $scope.pageList = pageset_min.map(d => d + page - 3);
                console.log($scope.pageList)
            }
            getData();
            getTopic();
            $scope.selectPage = function(page) {
                if (page < 1 || page > $scope.pages) return;
                $scope.pageNum = page;
                $scope.dataObj.pageNum = page;
                console.log("选择的页：" + page);
                $scope.getPageData(page);
            };
            $scope.isActivePage = function(page) {
                if ($scope.pageNum == page) {
                    return "btn btn-primary";
                } else return "btn";
            };

            //上一页
            $scope.Previous = function() {
                $scope.pageNum = $scope.pageNum == 1 ? 1 : $scope.pageNum - 1;
                $scope.selectPage($scope.pageNum);
            };

            //下一页
            $scope.Next = function() {
                $scope.pageNum = $scope.pageNum == $scope.pages ? $scope.pages : $scope.pageNum + 1;
                $scope.selectPage($scope.pageNum);
            };
            $scope.Firstpage =function(){
                $scope.selectPage(1);
            };
            $scope.Lastpage =function(){
                console.log($scope.pages)
                $scope.selectPage($scope.pages);
            };
            //页面UI初始化；
            $scope.$on('$viewContentLoaded', function() {
                if ($rootScope.mainController) {
                    console.log("senmessage app start!!!");
                    App.runui();
                    getData();
                }
            });

            $("#datepicker-start")
                .datepicker({
                    todayHighlight: true,
                    autoclose: true,
                    format: 'yyyy-mm-dd'
                });
            $("#datepicker-end")
                .datepicker({
                    todayHighlight: true,
                    autoclose: true,
                    format: 'yyyy-mm-dd'
                });

            function getFormatData() {
                var datetime = new Date();
                var year = datetime.getFullYear(); //获取完整的年份(4位,1970)
                var month = datetime.getMonth() + 1; //获取月份(0-11,0代表1月,用的时候记得加上1)
                if (month <= 9) {
                    month = "0" + month;
                }
                var date = datetime.getDate(); //获取日(1-31)
                if (date <= 9) {
                    date = "0" + date;
                }
                return year + "-" + month + "-" + date;
            }
            //定义参数对象
            function DataObj() {
                DataObj.prototype.userId = 1;
                DataObj.prototype.pageCounts = 10;
                DataObj.prototype.pageNum = 1,
                DataObj.prototype.is_report = -1,
                DataObj.prototype.topicId = -1,
                DataObj.prototype.dataType = -1,
                DataObj.prototype.startDate = "",
                DataObj.prototype.endDate = ""
            }
            //get data
            function getData(object) {
                $scope.sendata = [];
                var cons = {
                    // "userId":$scope.dataObj.userId,
                    "pageCounts": "all",
                    "is_report": $scope.dataObj.is_report,
                    "topicId": $scope.dataObj.topicId,
                    "dataType": $scope.dataObj.dataType,
                    "pageNum": $scope.dataObj.pageNum,
                    "startDate": $scope.dataObj.startDate == "" ? '""' : $scope.dataObj.startDate,
                    "endDate": $scope.dataObj.endDate == "" ? '""' : $scope.dataObj.endDate
                };
                SenFacService.getSenLists(cons).then(function(res) {
                    console.log(res);
                    res.postData.forEach(function(d) {
                        if (d.content.length > 40) {
                            d.content = d.content.substring(0, 40) + "...";
                        }
                        d.infoType = "";
                    });
                    $scope.sendata = res.postData;
                    $scope.tableData = res.postData;
                    console.log($scope.sendata)
                    if($scope.sendata.length==0){
                        $scope.pagesendata = [];
                        $scope.pageList = [1]
                    }
                    $scope.sendata.forEach(function(t) {
                        t.namelist = t.user_name_list.join(',')
                    })
                    $scope.pages = Math.ceil(res.totalCount / 10);
                    var page = $scope.dataObj.pageNum || 1; // 防止第一次取数据时出现0
                    console.log("page:",page)
                    // $scope.newpage = $scope.pages > 5 ? 5 : $scope.pages;
                    // //最多显示分页数5
                    // $scope.pageList = [];
                    // for (var i = 0; i < $scope.newpage; i++) {
                    //     $scope.pageList.push(i + 1);
                    // }
                    // if (page > 2) {
                    //     //因为只显示5个页数，大于2页开始分页转换
                    //     var newpageList = [];
                    //     for (var i = (page - 3); i < ((page + 2) > $scope.pages ? $scope.pages : (page + 2)); i++) {
                    //         newpageList.push(i + 1);
                    //     }
                    //     $scope.pageList = newpageList;
                    // }
                    $scope.selectPage(1)
                    //$scope.isActivePage(1);
                });
            }
            
            //添加敏感信息
            $scope.addSenMessage = function() {
                ngDialog.open({
                    template: '/static/modules/senmessage/pages/addSenMessage.html',
                    controller: 'addSenMessage',
                    appendClassName: "ngdialog-theme-details",
                    width: "100%",
                    scope: $scope
                });
            };
            //设置搜索

            $scope.search = function() {
                //console.log($scope.dataObj);
                getData();
                //getoutData();
            };

            function getTopic() {
                var cons = {
                    "userId": 1
                };
                // var cons = {};
                SenFacService.getTopic(cons).then(function(res) {
                    for (var i = 0; i < res.length; i++) {
                        $scope.topic.push({
                            "name": res[i].topicName,
                            "value": i
                        });
                    }
                });
            }
            // 元数据显示
            $scope.getMetaData = function(id) {
                $scope.detailDataId = id;
                ngDialog.open({
                    template: '/static/modules/senmessage/pages/detailData.html',
                    controller: 'displayDetailData',
                    appendClassName: "ngdialog-theme-details",
                    width: "100%",
                    scope: $scope
                });
            };
            // 撤销操作
            $scope.revoke = function(d) {
                var postLists = [];
                if (d) {
                    postLists = [d];
                } else {
                    postLists = $scope.selectList;
                }
                // var url = $scope.baseUrl + "senmassage/delmesg/";
                var Data = {
                    // userId: $scope.dataObj.userId,
                    postLists: postLists
                };
                SenFacService.removeSenData(Data).then(function(res) {
                    console.log(res);
                    notice.notify_info("您好！", "删除成功！", "", false, "", "");
                    setTimeout(function() {
                        getData();
                    }, 2000);

                }, function(err) {
                    notice.notify_info("您好！", "删除失败！ 请重试", "", false, "", "");
                });
            };
            //修改状态
            $scope.changeState = function(state, d) {
                var postLists;
                if (d) {
                    postLists = [d];
                } else {
                    postLists = $scope.selectList;
                }
                var Data = {
                    // userId: $scope.dataObj.userId,
                    postLists: postLists
                };

                if (state != 1 && state != 2)
                    return;
                else if (state == 1) {
                    SenFacService.reportData(Data).then(function(res) {
                        console.log(res);
                        notice.notify_info("您好！", "操作成功！", "", false, "", "");
                        setTimeout(function() {
                            getData();
                        }, 2000);
                    }, function(err) {
                        notice.notify_info("您好！", "操作失败，请重试！", "", false, "", "");
                    });
                } else if (state == 2) {
                    SenFacService.handleData(Data).then(function(res) {
                        //console.log(res);
                        notice.notify_info("您好！", "操作成功！", "", false, "", "");
                        setTimeout(function() {
                            getData();
                        }, 2000);
                    }, function(err) {
                        notice.notify_info("您好！", "操作失败，请重试！", "", false, "", "");
                    });
                }
            };
            //关键词显示
            $scope.toStr = function(kw) {
                if (!(kw instanceof Array)) {
                    return console.error("kw is not a array");
                }
                var result = kw[0].toString();
                for (var i = 1; i < kw.length; i++) {
                    result += ";" + kw[i].toString();
                }
                console.log(result);
                return result;
            }
            //案例自动添加
            $scope.markReport = function() {
                // $scope.changeState(1);
                var screenImg = {};
                var canvas = document.getElementById("screenshot"),
                    html = document.documentElement.innerHTML;
                html = html.replace(/<\/?script\b.*?>/g, "");
                html = html.replace(/ on\w+=".*?"/g, "");
                try {
                    rasterizeHTML.drawHTML(html, canvas).then(function() {
                        var dataurl = canvas.toDataURL("image/png"),
                            blob = $scope.datauriToBlob(dataurl, "image/png");
                        screenImg.blob = blob;
                        screenImg.dataurl = dataurl;
                        console.log(screenImg);
                        $scope.dataUrls = [];
                        $scope.dataUrls.push(screenImg.dataurl);
                        $scope.blobs = [];
                        $scope.blobs.push(screenImg.blob);
                        setTimeout(function() {
                            ngDialog.open({
                                template: '/static/modules/senmessage/pages/addCase.html',
                                controller: 'addCaseController',
                                appendClassName: 'ngdialog-theme-form',
                                width: "100%",
                                scope: $scope
                            });
                        }, 0);
                    });
                } catch (e) {
                    console.log("e");
                }
            };
            $scope.datauriToBlob = function(dataurl, type) {
                var bin = atob(dataurl.split(',')[1]);
                var buffer = new Uint8Array(bin.length);
                for (var i = 0; i < bin.length; i++) {
                    buffer[i] = bin.charCodeAt(i);
                }
                var blob = new Blob([buffer.buffer], {
                    type: type
                });
                return blob;
            };
            //选择按钮
            $scope.selectBoxChange = function(d) {
                if (d.selected) {
                    $scope.selectList.push(d.id);
                } else {
                    for (var index = 0; index < $scope.selectList.length; index++) {
                        if ($scope.selectList[index] == d.id) {
                            $scope.selectList.splice(index, 1);
                            break;
                        }
                    }
                }
                console.log($scope.selectList);
            };
            //全选
            $scope.selectAll = function() {
                $scope.sendata.forEach(function(d) {
                    // console.log(d);
                    d.selected = $scope.allselected;
                    $scope.selectBoxChange(d);
                });
            };
            //取证
            $scope.forensics = function(d) {
                $http({
                    url: CQ.variable.RESTFUL_URL + 'senmassage/evidence',
                    method: "get",
                    params: {
                        // userId: $scope.dataObj.userId,
                        id: d
                    },
                    responseType: 'blob'
                }).success(function(data, status, headers, config) {
                    var blob = new Blob([data], {
                        type: "text/xml"
                    });
                    var fileName = "evidence.html";
                    var a = document.createElement("a");
                    document.body.appendChild(a);
                    a.download = fileName;
                    a.href = URL.createObjectURL(blob);
                    a.click();
                    notice.notify_info("您好！", "下载成功！", "", false, "", "");
                }).error(function(data, status, headers, config) {
                    //upload failed
                    notice.notify_info("您好！", "下载失败！", "", false, "", "");
                });
            };
            $scope.export = function(tableId, type) {
                tableExport(tableId, 'test', type);
                notice.notify_info("您好！", "导出成功！", "", false, "", "");
            };
            $scope.exportPage = function() {
                ngDialog.open({
                    template: '/static/modules/senmessage/pages/table.html',
                    controller: 'exportController',
                    appendClassName: 'ngdialog-theme-table',
                    width: "100%",
                    scope: $scope
                });
            };
            $scope.tableData = [];
            
        }
    ])
    .controller("addSenMessage", ["$rootScope", "$scope", "ngDialog", "PostDataService", "notice",
        function($rootScope, $scope, ngDialog, PostDataService, notice) {
            console.log("addSenMessage", "start!!!");
            //console.log($scope.post_id);
            $scope.detailData = {};
            var today = new Date();
            $scope.detailData.Ip = "";
            $scope.detailData.QQ = "";
            $scope.detailData.add_time = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
            $scope.detailData.board = "";
            $scope.detailData.cellphone = "";
            $scope.detailData.comm_num = null;
            $scope.detailData.content = "";
            $scope.detailData.dataType = -1;
            $scope.detailData.html = " ";
            $scope.detailData.is_report = 0;
            $scope.detailData.lan_type = 0;
            $scope.detailData.read_num = null;
            $scope.detailData.repost_num = null;
            $scope.detailData.repost_pt_id = " ";
            // $scope.detailData.url=" ";
            $scope.detailData.site_id = -1;
            $scope.detailData.site_name = $scope.detailData.board;
            $scope.detailData.st_time = today.getFullYear() + '-' + today.getMonth() + '-' + today.getDate();
            $scope.detailData.text_type = null;
            // $scope.detailData.title = "";
            $scope.detailData.topic_id = [];
            $scope.detailData.topic_name = [];
            $scope.detailData.img_url = " ";
            // $scope.detailData.url="";
            $scope.detailData.poster = {};
            $scope.detailData.poster.authentication = null;
            $scope.detailData.poster.birthday = "";
            $scope.detailData.poster.following = null;
            $scope.detailData.poster.follows = null;
            $scope.detailData.poster.home_url = "";
            $scope.detailData.poster.id = "";
            $scope.detailData.poster.img_url = "";
            $scope.detailData.poster.intro = null;
            $scope.detailData.poster.level = null;
            $scope.detailData.poster.location = "";
            $scope.detailData.poster.name = "";
            $scope.detailData.poster.post_num = null;



            $scope.DoaddSen = function() {
                if ($scope.detailData.senwords && $scope.detailData.senwords.split) {
                    $scope.detailData.senwords = $scope.detailData.senwords.split(',');
                } else {
                    $scope.detailData.senwords = [];
                }
                // console.log("$scope.detailData");
                // console.log($scope.detailData);
                var cons = {};
                var postData = [];
                postData.push($scope.detailData);
                cons.postData = postData;
                cons.postData.forEach(function(d) {
                    if (!d.title || d.title == "" || d.url == "" || !d.url || !d.pt_time || d.pt_time == "") {
                        notice.notify_info("required字段不能为空！");
                    } else {
                        PostDataService.addSenMessage(cons).then(function(res) {
                            console.log(cons);
                            // window.location.reload("index.html#/senmessages");
                            ngDialog.closeAll();
                            window.location.reload("index.html#/senmessages");
                            notice.notify_info("您好", "添加成功！", "", false, "", "");
                        }, function(err) {
                            console.log(err);
                            notice.notify_info("您好", "添加失败！请重试", "", false, "", "");
                        });
                    }
                })

            };

        }
    ])
    .controller("displayDetailData", ["$scope", "SenFacService", function($scope, SenFacService) {
        //console.log($scope.detailDataId);
        $scope.detailData = null;
        var cons = {
            // userId: 1,
            id: $scope.detailDataId
        };
        SenFacService.getDetailData(cons).then(function(res) {
            //console.log(res);
            $scope.detailData = res[0];
            $scope.detailData.senwords = $scope.detailData.senwords.toString();
        });

    }])
    .controller("exportController", ["$scope", "exportSevice", "SenFacService", function($scope, exportSevice, SenFacService) {
        console.log("exportController start!");
        $("#datepicker-start1")
                .datepicker({
                    todayHighlight: true,
                    autoclose: true,
                    format: 'yyyy-mm-dd'
                });
        $("#datepicker-end1")
            .datepicker({
                todayHighlight: true,
                autoclose: true,
                format: 'yyyy-mm-dd'
            });

        $scope.isActiveTablePage = function(page) {
            if ($scope.tablepage == page) {
                return "btn btn-primary";
            } else return "btn";
        };
        // console.log($scope.tableData);
        $scope.x = 0;
        for (var i = 0; i < $scope.tableData.length; i++) {
            if ($scope.tableData[i].data_type == 2) {
                $scope.tableData[i].title = $scope.tableData[i].content;
            }
            if ($scope.tableData[i].is_report == 0) {
                $scope.tableData[i].is_report = "未上报";
            } else if ($scope.tableData[i].is_report == 1) {
                $scope.tableData[i].is_report = "上报未处理";
            } else if ($scope.tableData[i].is_report == 2) {
                $scope.tableData[i].is_report = "已处理";
            }
        }
        $scope.allRows = true;
        for (var i = 0; i < $scope.tableData.length; i++) {
            $scope.tableData[i].export = true;
        }
        $scope.tablepage = 1;
        $scope.getTableData = function(page, data) {
            $scope.$applyAsync()
            console.log($scope.tableData)
            if (data)
                $scope.tableData = data;
            if (page < 1 || page > $scope.max_page)
                return null;
            $scope.counts = $scope.tableData.length;
            var page_num = 10;
            $scope.max_page = Math.ceil($scope.tableData.length / page_num);
            var pageset_min = [1, 2, 3, 4, 5],
                pageset_max = pageset_min.map(d => d + $scope.max_page - 5);
            console.log($scope.max_page);
            $scope.showTableData = $scope.tableData.slice(page * page_num - page_num, page * page_num);
            
            $scope.tablepage = page;
            if ($scope.max_page < 5) {
                $scope.pageset = [];
                for (var i = 1; i < $scope.max_page + 1; i++)
                    $scope.pageset.push(i);
            } else if (page < 4)
                $scope.pageset = angular.copy(pageset_min);
            else if (page > $scope.max_page - 3)
                $scope.pageset = angular.copy(pageset_max);
            else
                $scope.pageset = pageset_min.map(d => d + page - 3);
        }
        
        $scope.OutSearch = function(){
            var cons = {
                    // "userId":$scope.dataObj.userId,
                    "pageCounts": "all",
                    "is_report": $scope.dataObj.is_report,
                    "topicId": $scope.dataObj.topicId,
                    "dataType": $scope.dataObj.dataType,
                    "pageNum": $scope.dataObj.pageNum,
                    "startDate": $scope.dataObj.startDate == "" ? '""' : $scope.dataObj.startDate,
                    "endDate": $scope.dataObj.endDate == "" ? '""' : $scope.dataObj.endDate
                };
                SenFacService.getSenLists(cons).then(function(res) {
                    // console.log(res);
                    res.postData.forEach(function(d) {
                        if (d.content.length > 40) {
                            d.content = d.content.substring(0, 40) + "...";
                        }
                    });
                    $scope.tableData = res.postData;
                    $scope.$applyAsync()
                    console.log("导出筛选")
                    console.log($scope.tableData)
                    if($scope.tableData.length==0){
                        $scope.showTableData = [];
                        $scope.pageset = [1];  
                    }
                    else{
                        $scope.allRows = true;
                        for (var i = 0; i < $scope.tableData.length; i++) {
                            $scope.tableData[i].export = true;
                        }
                        for (var i = 0; i < $scope.tableData.length; i++) {
                            if ($scope.tableData[i].data_type == 2) {
                                $scope.tableData[i].title = $scope.tableData[i].content;
                            }
                            if ($scope.tableData[i].is_report == 0) {
                                $scope.tableData[i].is_report = "未上报";
                            } else if ($scope.tableData[i].is_report == 1) {
                                $scope.tableData[i].is_report = "上报未处理";
                            } else if ($scope.tableData[i].is_report == 2) {
                                $scope.tableData[i].is_report = "已处理";
                            }
                        }
                    }
                });
                $scope.getTableData(1);
        }
        $scope.getTableData(1);
        var $cols = ["board", "infoType", "title", "url", "ip_addr", "ip_addr", "qq_num", "phone_num"];
        $scope.theads = ["网站名称", "信息类型", "信息标题", "网站URL", "网站物理属地", "网站IP", "QQ号码", "联系电话"];
        $scope.showCols = [true, true, true, true, true, true, true, true];
        $scope.exportAll = function() {
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.tableData[i].export = $scope.allRows;
            }
        }
        $scope.removeCol = function(col) {
            $cols.splice(+col, 1);
            $scope.theads.splice(+col, 1);
            $scope.showCols[+col] = false;
            console.log($cols);
        }
        $scope.exportExcel = function(filename) {
            exportSevice.saveExcel($scope.tableData, $cols, $scope.theads, filename);
        }
        $scope.changeTable = function(x) {
            var today = new Date();
            var endtime = today.valueOf();
            if (+x == -1) {
                getAll();
            }
            if (+x == 1) {
                //近一天
                getTimeData(~~((endtime - 86400000) / 1000), ~~(endtime / 1000));
            }
            if (+x == 2) {
                //近一周
                getTimeData(~~((endtime - 604800000) / 1000), ~~(endtime / 1000));
            }
            if (+x == 3) {
                //近一月
                getTimeData(~~((endtime - 2505600000) / 1000), ~~(endtime / 1000));
            } else if (+x == 0) {
                $scope.tableData = JSON.parse(JSON.stringify($scope.sendata));
                $scope.allRows = true;
            }
            for (var i = 0; i < $scope.tableData.length; i++) {
                $scope.tableData[i].export = true;
                if ($scope.tableData[i].data_type == 2) {
                    $scope.tableData[i].title = $scope.tableData[i].content;
                }
                if ($scope.tableData[i].is_report == 0) {
                    $scope.tableData[i].is_report = "未上报";
                } else if ($scope.tableData[i].is_report == 1) {
                    $scope.tableData[i].is_report = "上报未处理";
                } else if ($scope.tableData[i].is_report == 2) {
                    $scope.tableData[i].is_report = "已处理";
                }
            }
            $scope.getTableData(1);
            // }

        }
        var getAll = function() {
            var cons = {
                // "userId":$scope.dataObj.userId,
                "pageCounts": "all",
                "is_report": $scope.dataObj.is_report,
                "topicId": $scope.dataObj.topicId,
                "dataType": $scope.dataObj.dataType,
                "pageNum": $scope.dataObj.pageNum,
                "startDate": $scope.dataObj.startDate == "" ? '""' : $scope.dataObj.startDate,
                "endDate": $scope.dataObj.endDate == "" ? '""' : $scope.dataObj.endDate
            };
            SenFacService.getSenLists(cons).then(function(res) {
                // console.log(res);
                res.postData.forEach(function(d) {
                    if (d.content.length > 40) {
                        d.content = d.content.substring(0, 40) + "...";
                    }
                });
                $scope.tableData = res.postData;
                console.log($scope.tableData)
                $scope.allRows = true;
                for (var i = 0; i < $scope.tableData.length; i++) {
                    $scope.tableData[i].export = true;
                }
                for (var i = 0; i < $scope.tableData.length; i++) {
                    if ($scope.tableData[i].data_type == 2) {
                        $scope.tableData[i].title = $scope.tableData[i].content;
                    }
                    if ($scope.tableData[i].is_report == 0) {
                        $scope.tableData[i].is_report = "未上报";
                    } else if ($scope.tableData[i].is_report == 1) {
                        $scope.tableData[i].is_report = "上报未处理";
                    } else if ($scope.tableData[i].is_report == 2) {
                        $scope.tableData[i].is_report = "已处理";
                    }
                }
            });
        }
        var getTimeData = function(starttime, endtime) {
            console.log(starttime, endtime);
            var cons = {
                // "userId":$scope.dataObj.userId,
                "pageCounts": "all",
                "is_report": $scope.dataObj.is_report,
                "topicId": $scope.dataObj.topicId,
                "dataType": $scope.dataObj.dataType,
                "pageNum": $scope.dataObj.pageNum,
                "startDate": starttime,
                "endDate": endtime,
            };
            SenFacService.getSenmsg(cons).then(function(res) {
                // console.log(res);
                res.postData.forEach(function(d) {
                    if (d.content.length > 40) {
                        d.content = d.content.substring(0, 40) + "...";
                    }
                });
                $scope.tableData = res.postData;
                $scope.allRows = true;
                for (var i = 0; i < $scope.tableData.length; i++) {
                    $scope.tableData[i].export = true;
                }
                for (var i = 0; i < $scope.tableData.length; i++) {
                    if ($scope.tableData[i].data_type == 2) {
                        $scope.tableData[i].title = $scope.tableData[i].content;
                    }
                    if ($scope.tableData[i].is_report == 0) {
                        $scope.tableData[i].is_report = "未上报";
                    } else if ($scope.tableData[i].is_report == 1) {
                        $scope.tableData[i].is_report = "上报未处理";
                    } else if ($scope.tableData[i].is_report == 2) {
                        $scope.tableData[i].is_report = "已处理";
                    }
                }
                $scope.getTableData(1);
            });
        }
    }])
    .controller('addCaseController', ["$scope", function($scope) {
        //添加上传图片
        $scope.addImg = function(files) {
            $scope.files = files;
            console.log($scope.files);
        };
        $scope.removeImg = function() {

        };
    }]);