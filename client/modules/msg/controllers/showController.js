"use strict";
CQ.mainApp.msgController
    .controller("showController", ["$scope", "$state", "$stateParams", "msgService",
        function($scope, $state, $stateParams, msgService) {
        $scope.selectList = [];
        $scope.view = 'View All';
        $scope.kong = false;
        $scope.getShowData = function () {
            var cons = {
                // userid:1
            };
            msgService.pushMsg(cons).then(function(res) {
                // console.log(res[0]['is_read'])

                res.sort(function (a,b) {
                    if(a.is_read==false && b.is_read==true)
                        return -1;
                    if(a.is_read==true && b.is_read==false)
                        return 1;

                    return b.send_time>a.send_time?1:-1;
                })
                $scope.alldata = res;
                $scope.page = 1;
                $scope.page_num = 10;//一页显示的消息数量
                $scope.max_page = Math.ceil($scope.alldata.length/$scope.page_num);
                $scope.showdata = getDataBypage(1);
                $scope.kong=false;
                // $scope.showdata = res;
                console.log('+++++++',$scope.showdata);
            });
            $scope.view = 'View All';
            $("i#All").addClass('fa-circle');
            $("i#Unread").removeClass('fa-circle');
        };
        $scope.getAlertData = function(){
          var cons = {}
          msgService.pushAlertMsg(cons).then(function(res) {
              // console.log(res[0]['is_read'])

              res.sort(function (a,b) {
                  return b.send_time>a.send_time?1:-1;
              })
              $scope.alldata = res;
              $scope.page = 1;
              $scope.page_num = 10;//一页显示的消息数量
              $scope.max_page = Math.ceil($scope.alldata.length/$scope.page_num);
              $scope.showdata = getDataBypage(1);
              $scope.kong=false;
              // $scope.showdata = res;
              console.log('+++++++',$scope.showdata);
          });
        }
        $scope.getShowData();
        $scope.selectItems = [];
        $scope.select = function(item){
            console.log(item);
            if($scope.selectList.indexOf(item._id)==-1)
            {
                $scope.selectList.push(item._id);
                $scope.selectItems.push(item);
            }
            else{
                var index = ($scope.selectList.indexOf(item._id));
                $scope.selectList.splice(index,1);
                $scope.selectItems.splice(index,1);
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
        $scope.unreadmsg = function () {

            for(var i=$scope.showdata.length-1;i>=0;i--){
                if($scope.showdata[i]['is_read']==true)
                    $scope.showdata.pop();
                else{
                    break;
                }
            }
            if($scope.showdata.length==0)
                $scope.kong=true;
            $("i#Unread").addClass('fa-circle');
            $("i#All").removeClass('fa-circle');
            $scope.view = 'Unread';
            console.log('----------',$scope.showdata)
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
        //发送消息
        $scope.sendMessage = function()
        {
            $state.go('msgController');
        }
        //回复消息
        $scope.replyMessage = function()
        {
            console.log($scope.selectItems);
            $state.go('msgController',{'sendUsers':$scope.selectItems.map(d=>d.send_user_acc)});
        }
        //分页功能
        function getDataBypage(page)
        {
            return $scope.alldata.slice(page*$scope.page_num-$scope.page_num,page*$scope.page_num);
        }
        $scope.perPage = function()
        {
            $scope.page = $scope.page == 1 ? 1 : $scope.page - 1;
            $scope.showdata = getDataBypage($scope.page);
        }
        $scope.nextPage = function()
        {
            $scope.page = $scope.page == $scope.max_page ? $scope.max_page : $scope.page + 1;
            $scope.showdata = getDataBypage($scope.page);
        }
        handleEmailCheckboxChecked();
        handleEmailAction();
    }]);
