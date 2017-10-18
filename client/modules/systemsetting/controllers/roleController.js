"use strict";
CQ.mainApp.systemsettingController
    .controller("roleSettingController", ["$rootScope", "$scope", function ($rootScope, $scope) {
        console.log("roleSettingController", "start!!!");
        //页面UI初始化；
        $scope.$on('$viewContentLoaded', function() {
            if($rootScope.mainController) {
                console.log("monitor app start!!!");
                App.runui();
            }
        });
        
   }]);