"use strict";
CQ.mainApp.msgController
    .controller("msgdetailController",["$scope","$stateParams","msgService",
        function($scope,$stateParams,msgService) {

            console.log('++++++',$stateParams.msgid);
            var cons = {
                _id:$stateParams.msgid
            };
            msgService.showdetailMsg(cons).then(function(res) {
                $scope.showdata=res;
                console.log('+++++++',$scope.showdata);
                document.getElementById("content").innerHTML=$scope.showdata.content;
            });

    }]);