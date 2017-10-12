"use strict";
CQ.mainApp.zhishikuController
    .controller("zhishikuController", ["$rootScope", "$scope", "$http", "ngDialog", "$state",
    function($rootScope, $scope, $http, ngDialog, $state) {
        console.log("zhishikuController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("zhishiku app start!!!");
                App.runui();
                $(".description>div>p").hide();
                $(".img-box").hover(function(){
                    $(this).find(".description>div").animate({"height":"100%","padding":"20px"},500,"linear");
                    $(this).find(".description>div>p").show();
                },function(){
                    $(this).find(".description>div>p").hide();
                    $(this).find(".description>div").animate({"height":"80px","padding":"0 20px"},500,"linear");
                });
            }
        });
    }]);