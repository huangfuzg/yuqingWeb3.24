"use strict";
CQ.mainApp.msgController
    .controller("msgController",["$scope","$stateParams","msgService","notice",
        function($scope,$stateParams,msgService,notice) {
        $scope.recid=[];
        $scope.senduser = null;
            var tmp={};
            msgService.getuser(tmp).then(function (res) {
                $scope.senduser = res;
                console.log($scope.senduser);
                $('#users').selectize({
                    persist: false,
                    createOnBlur: true,
                    create: false,
                    valueField:'user_',
                    labelField:'user_',
                    // options:[{name:'yuqing'},{name:'admin'}],
                    options:$scope.senduser,
                    onItemAdd:function (v) {
                        $scope.recid.push(v);
                        // console.log($scope.recid);
                    },
                    onItemRemove:function (v) {
                        var index = ($scope.recid.indexOf(v));
                        $scope.recid.splice(index,1);
                        // console.log($scope.recid);
                    }
                });
            })
        console.log('start')

            var E = window.wangEditor
            var editor1 = new E('#input')
            editor1.customConfig.debug = true
            editor1.customConfig.uploadImgShowBase64 = true
            editor1.customConfig.menus = [
                // 'head',         //标题
                'bold',         //粗体
                'italic',       //斜体
                'underline',    //下划线
                'strikeThrough', //删除线
                'justify',      //对齐方式
                'image',        //图片
                'undo',         //撤销
                'list'          //列表

            ]
            editor1.create()
            document.getElementById('btn1').addEventListener('click', function () {
                // 读取 html
                // console.log(editor1.txt.html())
                // document.getElementById("test").innerHTML=editor1.txt.html()
                var cons = {
                    content:editor1.txt.html(),
                    rec_username:$scope.recid,
                    title:$scope.title,
                    desc:$scope.desc
                };
                msgService.sendMsg(cons).then(function(res) {
                    console.log('+++++++++',res);
                    if(res.success==true){
                        // alert('发送成功');
                        notice.notify_info("发送成功！！");
                    }
                });
            }, false)

        }]);