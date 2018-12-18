"use strict";
angular.module("senmessageService", ["commons"])
    .factory("SenFac", ['$resource', 'parseResource', function ($resource, parseResource) {
        var factories = {};

        factories.getSenLists = $resource(CQ.variable.RESTFUL_URL + "senmassage/showmsg", parseResource.params, parseResource.actions);

        factories.getDetailData = $resource(CQ.variable.RESTFUL_URL + "senmassage/showrawmsg", parseResource.params, parseResource.actions);

        factories.removeSenData = $resource(CQ.variable.RESTFUL_URL + "senmassage/delmesg", parseResource.params, parseResource.actions);

        factories.reportData = $resource(CQ.variable.RESTFUL_URL + "senmassage/markmesg", parseResource.params, parseResource.actions);
        // factories.reportData = $resource("http://118.190.133.203:8200/yqdata/senmassage/markmesg", parseResource.params, parseResource.actions);

        factories.getTopic = $resource(CQ.variable.RESTFUL_URL + "topic_statistics",parseResource.params,parseResource.actions);

        factories.handleData = $resource(CQ.variable.RESTFUL_URL + "senmassage/handlemesg", parseResource.params, parseResource.actions);
        factories.getSenmsg = $resource(CQ.variable.RESTFUL_URL + "senmassage/senmsgout", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("SenFacService", ["SenFac", "RestService","$http", function(SenFac, RestService,$http) {
        var factories = {};

        factories.getSenLists = function(params) {
            return RestService.get(SenFac.getSenLists, params);
            //return $http.get(CQ.variable.RESTFUL_URL + "senmassage/showmsg", params);
        };

        factories.getDetailData = function(params) {
            return RestService.get(SenFac.getDetailData, params);
        };

        factories.removeSenData = function(data) {
            return RestService.create(SenFac.removeSenData, data);
        };

        factories.getSenmsg = function(params) {
            return RestService.get(SenFac.getSenmsg, params);
        };

        factories.reportData = function(data) {
            return RestService.create(SenFac.reportData, data);
        };

        factories.handleData = function(data) {
            return RestService.create(SenFac.handleData, data);
        };

        factories.getTopic = function(params) {
            return RestService.get(SenFac.getTopic,params);
        }

        return factories;
    }])
    .factory("exportSevice", function(){
        var ret = {};
        ret.saveExcel = function(table,Cols,theads,filename)
        {
            var format = function(date)
            {
                var year = date.getFullYear(),
                    month = date.getMonth()+1,
                    day = date.getDate();
                    month = month < 10 ? '0' + month : month;
                    day = day < 10 ? '0' + day : day;
                return '(' + month + '月' + day + '日' + ')';
            }
            var outStr = "<tr><td rowspan='2' style='text-align:center; font-size:1.5em; font-weight:800;' colspan=" + theads.length + ">2019年研考互联网信息安全专项监测情况通报" + format(new Date()) +"</td></tr><tr></tr><tr><td colspan=" + theads.length + ">现将2018年" + format(new Date(new Date().getTime())) + "XX时至" + format(new Date()) + "XX时监测到的高考有害信息通报如下：</td></tr><tr>";
            for(var i = 0; i < theads.length; i++)
            {
                outStr += "<td>" + theads[i] + "</td>";
            }
            outStr += "</tr>";
            for(var i = 0, row; row = table[i]; i++)
            {
                if(row.export!=false)
                {
                    outStr += "<tr>";
                    for(var j = 0; j < Cols.length; j++)
                    {
                        var prop = Cols[j];
                        outStr += "<td>";
                        outStr += row[prop];
                        outStr += "</td>";
                    }
                    outStr += "</tr>";
                }
            }
            console.log("outStr:"+ outStr);
            var template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">'
                         + '<head><meta http-equiv="Content-type" content="text/html;charset=UTF-8" /><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/>'
                         + '</x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>';
            var base64 = function(s)
            {
                return btoa(unescape(encodeURIComponent(s)));
            }
            var format = function(s,c)
            {
                return s.replace(/{(\w+)}/g,function(m,p){
                    return c[p];
                });
            }
            var ctx = {
                worksheet:filename||'test.xls',
                table:outStr,
            };
            var dataUri = "data:application/vnd.ms-excel;base64," + base64(format(template,ctx));
            var a = document.createElement('a');
            a.href = dataUri;
            a.download = filename || 'test.xls';
            a.click();
        }
        return ret;
    })
    .factory("PostDataService", ["$http", function($http) {
        var factories = {};
        // flush data every 30s
        /*factories.flushData = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "monitor/flush", data);
        };*/

        factories.addSenMessage = function(data) {
            return $http.post(CQ.variable.RESTFUL_URL + "senmassage/addmsg", data);
             // return $http.post("http://118.190.133.203:8100/yqdata/senmassage/addmsg", data);
        };

        return factories;
    }]);
