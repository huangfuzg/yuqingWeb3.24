"use strict";
CQ.mainApp.errorController
    .controller("errorController",["$scope","$stateParams",
        function($scope,$stateParams) {
            $scope.errorcode = $stateParams.errorcode;
            $scope.errormsg = null;
            $scope.errordes=null;
            if($scope.errorcode=='500'){
                $scope.errormsg = '服务器出错！';
                $scope.errordes='服务器开了一下小差，我们马上解决！';
            }
            if($scope.errorcode=='404'){
                $scope.errormsg = '找不到该页面!';
                $scope.errordes='你访问的页面不存在，你可以检查一下网址是否正确！';
            }
            if($scope.errorcode==''){
                $scope.errormsg='数据加载出错！';
                $scope.errordes='数据出现了一点小问题，我们马上解决！';
            }
        }]);