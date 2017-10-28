"use strict";
angular.module("senmessageService", ["commons"])
    .factory("SenFac", ['$resource', 'parseResource', function ($resource, parseResource) {
        var factories = {};

        factories.getSenLists = $resource(CQ.variable.RESTFUL_URL + "senmassage/showmsg", parseResource.params, parseResource.actions);
    
        factories.getDetailData = $resource(CQ.variable.RESTFUL_URL + "senmassage/showrawmsg", parseResource.params, parseResource.actions);

        factories.removeSenData = $resource(CQ.variable.RESTFUL_URL + "senmassage/delmesg", parseResource.params, parseResource.actions);
        
        factories.reportData = $resource(CQ.variable.RESTFUL_URL + "senmassage/markmesg", parseResource.params, parseResource.actions);
        
        factories.getTopic = $resource(CQ.variable.RESTFUL_URL + "topic_statistics",parseResource.params,parseResource.actions);

        factories.handleData = $resource(CQ.variable.RESTFUL_URL + "senmassage/handlemesg", parseResource.params, parseResource.actions);
        factories.getSenmsg = $resource(CQ.variable.RESTFUL_URL + "senmassage/senmsgout", parseResource.params, parseResource.actions);
        return factories;
    }])
    .factory("SenFacService", ["SenFac", "RestService", function(SenFac, RestService) {
        var factories = {};

        factories.getSenLists = function(params) {
            return RestService.get(SenFac.getSenLists, params);
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
            var outStr = "<tr>";
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
    });
