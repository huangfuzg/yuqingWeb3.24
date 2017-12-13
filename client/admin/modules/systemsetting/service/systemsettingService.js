"use strict";

angular.module('systemsettingService',['commons'])
    .factory('UserattrService', ['$http', function($http){
        var factories = {};
        factories.getUserattrData = function() {
            return $http.get("http://118.190.133.203:8100/yqdata/user_attr");
        };
        return factories;
    }]);