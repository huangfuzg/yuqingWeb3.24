"use strict";
CQ.mainApp.msgController
    .controller("showController",["$scope","$state","$stateParams","msgService",
        function($scope,$state,$stateParams,msgService) {
        $scope.selectList = [];
        var cons = {
            // userid:1
        };
        msgService.pushMsg(cons).then(function(res) {
            $scope.showdata=res;
            console.log('+++++++',$scope.showdata);
        });
        $scope.select = function(item){
            console.log(item);
            if($scope.selectList.indexOf(item._id)==-1)
            $scope.selectList.push(item._id);
            else{
                var index = ($scope.selectList.indexOf(item._id));
                $scope.selectList.splice(index,1);
            }
            console.log($scope.selectList);
        }
        $scope.delmsg = function () {
            console.log("deleting something")
            var cons = {
                _id : $scope.selectList
            }
            msgService.deluserMsg(cons).then(function (res) {
                console.log(res);
                }
            )
        }
        var handleEmailActionButtonStatus=function(){
                if($("[data-checked=email-checkbox]:checked").length!==0)
                {$("[data-email-action]").removeClass("hide")}
                else{$("[data-email-action]").addClass("hide")}};
        var handleEmailCheckboxChecked=function(){
                $("[data-checked=email-checkbox]").live("click",function(){
                var e=$(this).closest("label");
                var t=$(this).closest("li");
                if($(this).prop("checked")){
                    $(e).addClass("active");
                    $(t).addClass("selected")}
                else{$(e).removeClass("active");
                    $(t).removeClass("selected")}handleEmailActionButtonStatus()}
                    )};
        var handleEmailAction=function(){
            $("[data-email-action]").live("click",function(){
                var e="[data-checked=email-checkbox]:checked";
                if($(e).length!==0)
                {
                    $(e).closest("li").slideToggle(function()
                    {
                        $(this).remove();
                        handleEmailActionButtonStatus()
                    })
                }
            })};
        $scope.showdetail = function(msgid)
            {
                $state.go("detailController",{msgid:msgid});
            }
        handleEmailCheckboxChecked();
        handleEmailAction();
    }]);
