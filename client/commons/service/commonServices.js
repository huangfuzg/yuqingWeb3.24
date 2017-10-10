"use strict";
angular.module('commons',[])
    .factory('http-auth-interceptor', function ($q, $rootScope) {
        return {
            responseError: function (response) {
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$broadcast('event:auth-loginRequired');
                }
                return $q.reject(response);
            }
        };
    })
    .factory('localStorage', function () {
        return {
            get: function (storage_name) {
                return JSON.parse(localStorage.getItem(storage_name) || "[]");
            },
            put: function(storage_name, objects) {
                localStorage.setItem(storage_name, JSON.stringify(objects));
            },
            removeItem: function(itemIndex) {
                localStorage.removeItem(itemIndex);
            }
        };
    })
    .factory('redirectInterceptor', ['$q', '$location', '$window', function($q, $location, $window) {
        return {
            'response': function(response) {
                //console.log(response);
                if ("string" === typeof(response.data) && response.data.indexOf('<title>高考舆情系统</title>') !== -1) {
                    $window.location.href = "/yuqing/login.html";
                }
                return response;
            }
        };
    }])
    .factory("parseResource", ["$rootScope", function($rootScope) {
        var self = {},
        headers = {
            "Content-Type": "application/json",
            //'Content-Type':'application/x-www-form-urlencoded'
        };
        self.params = {};
        self.actions = {
            // headers are passed in as javascript name/value pairs
            'query': {
                method: 'GET',
                transformRequest: headers
            },
            'save': {
                method: 'POST',
                headers: headers,
            },
            'get': {
                method: 'GET',
                headers: headers
            },
            'update': {
                method: 'PUT',
                headers: headers
            },
            'remove': {
                method: 'DELETE',
                headers: headers
            }
        };
        return self;
    }])
    .factory("RestService", function($q) {
        var factories = {};
        factories.get = function(resource, params) {
            var deferred = $q.defer();
            get(resource, params, deferred);
            return deferred.promise;
        };
        factories.update = function(resource, params, data) {
            var deferred = $q.defer();
            update(resource, params, data, deferred);
            return deferred.promise;
        };
        factories.remove = function(resource, params) {
            var deferred = $q.defer();
            remove(resource, params, deferred);
            return deferred.promise;
        };
        factories.create = function(resource, data) {
            var deferred = $q.defer();
            create(resource, data, deferred);
            return deferred.promise;
        };
        //execute get action
        function get(resource, params, deferred) {
            resource.get(params).$promise.then(function(res) {
                if (res.success) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                systemFailHandle(error);
            });
        }
        //execute update action
        function update(resource, params, data, deferred) {
            resource.update(params, data).$promise.then(function(res) {
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                systemFailHandle(error);
            });
        }
        //execute remove action
        function remove(resource, params, deferred) {
            resource.remove(params).$promise.then(function(res) {
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                systemFailHandle(error);
            });
        }
        //execute get action
        function create(resource, data, deferred) {
            resource.save(data).$promise.then(function(res) {
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                systemFailHandle(error);
            });
        }
        // deal error
        function systemFailHandle(error) {
            var errMessage = "";
            switch (error.status) {
                case 500:
                    errMessage = "the server responded with a status of 500 (Server Error)";
                    break;
                case 404:
                    errMessage = "未找到:" + error.config.url;
                    break;
                default:
                    errMessage = error.statusText;
            }
        }
        return factories;
    });

