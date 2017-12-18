"use strict";

angular.module('systemsettingService',['commons'])
    .factory('adminattrService', ['$http', function($http){
        var factories = {};
        factories.getUserattrData = function() {
            return $http.get("http://118.190.133.203:8899/yqdata/user_attr");
        };
        return factories;
    }]);