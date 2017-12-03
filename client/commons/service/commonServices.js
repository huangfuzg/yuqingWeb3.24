"use strict";
angular.module('commons',[])
    .factory('crypto', function () {
        var ret = {};
        ret.md5 = function(str)
        {
            return CryptoJS.MD5(str);
        }
        ret.sha2 = function(str)
        {
            return CryptoJS.SHA256(str);
        }
        ret.sha5 =function(str)
        {
            return CryptoJS.SHA512(str);
        }
        ret.aesEncrypt = function(str,secret)
        {
            return CryptoJS.AES.encrypt(str,secret);
        }
        ret.aesDecrypt = function(str,secret)
        {
            return CryptoJS.AES.decrypt(str,secret);
        }
        ret.hashEncode = function(pwd)
        {
            var secret = CQ.variable.SECRET,
            secret_arr = secret.split(''),
            hash = CryptoJS.SHA256(pwd+secret).toString().split(''),
            char_index = c=>c-'a';
            secret_arr.forEach(c=>{
                if(hash[char_index(c)])
                {
                    hash[char_index(c)] = c;
                }
            });
            return hash.join('');
        }
        return ret;         
    })
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
    .factory('accountManage', ['crypto', 'localStorage', function (crypto,localstorage) {
        var ret = {};

        //退出登录
        ret.logout = function()
        {
            localstorage.removeItem('user');
            localstorage.removeItem('username');
        }

        //验证是否登录
        ret.isAuthenticated = function()
        {
            var loginfo = localStorage.getItem('user'),
            secret = CQ.variable.SECRET;
            console.log(loginfo);
            return loginfo&&is_exceed_logintime.apply(this,crypto.aesDecrypt(loginfo,secret).split('#'));
        }

        //获得用户名
        ret.getUsername = function()
        {
            if(CQ.variables.CURRENT_USER == "")
            {
                CQ.variables.CURRENT_USER = localStorage.getItem("username");
            }
            return CQ.variables.CURRENT_USER;
        }

        //获得请求token
        ret.getToken = function()
        {
            var loginfo = localStorage.getItem('user'),
            secret = CQ.variable.SECRET;
            if(CQ.variables.APIKEY == null)
            {
                console.log(crypto.aesDecrypt(loginfo,secret));
                CQ.variables.APIKEY = crypto.aesDecrypt(loginfo,secret).toString().split('#')[0];
            }
            console.log(CQ.variables.APIKEY);
            return CQ.variables.APIKEY;
        }
        
        //登录超时验证
        function is_exceed_logintime(token,loginTime,maxTime)
        {
            return (new Date()).getTime()<+loginTime+ +maxTIme;
        }
        
        return ret;
    }])
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
    .factory("RestService", ['$q', '$state', 'accountManage', function($q,$state,accountManage) {
        var factories = {};
        factories.get = function(resource, params) {
            $("#load").show();
            addToken(params);
            var deferred = $q.defer();
            get(resource, params, deferred);
            return deferred.promise;
        };
        factories.update = function(resource, params, data) {
            $("#load").show();
            addToken(data);
            var deferred = $q.defer();
            update(resource, params, data, deferred);
            return deferred.promise;
        };
        factories.remove = function(resource, params) {
            $("#load").show();
            addToken(params);
            var deferred = $q.defer();
            remove(resource, params, deferred);
            return deferred.promise;
        };
        factories.create = function(resource, data) {
            $("#load").show();
            addToken(data);
            var deferred = $q.defer();
            create(resource, data, deferred);
            return deferred.promise;
        };
        //execute get action
        function get(resource, params, deferred) {
            resource.get(params).$promise.then(function(res) {
                $("#load").hide();
                if (res.success) {
                    deferred.resolve(res.data);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                $("#load").hide();
                systemFailHandle(error);
            });
        }
        //execute update action
        function update(resource, params, data, deferred) {
            resource.update(params, data).$promise.then(function(res) {
                $("#load").hide();
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                $("#load").hide();
                systemFailHandle(error);
            });
        }
        //execute remove action
        function remove(resource, params, deferred) {
            resource.remove(params).$promise.then(function(res) {
                $("#load").hide();
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                $("#load").hide();
                systemFailHandle(error);
            });
        }
        //execute get action
        function create(resource, data, deferred) {
            resource.save(data).$promise.then(function(res) {
                $("#load").hide();
                if (res.success) {
                    deferred.resolve(res);
                } else {
                    deferred.reject(res);
                }
            }, function(error) {
                $("#load").hide();
                systemFailHandle(error);
            });
        }
        // deal error
        function systemFailHandle(error) {
            var errMessage = "";
            switch (error.status) {
                case 500:
                    $state.go('error',{errorcode:500});
                    errMessage = "the server responded with a status of 500 (Server Error)";
                    break;
                case 404:
                    $state.go('error',{errorcode:404});
                    errMessage = "未找到:" + error.config.url;
                    break;
                default:
                    // $state.go('error',{});
                    errMessage = error.statusText;
            }
        }
        //add user token
        function addToken(params)
        {
            params.userId = accountManage.getToken();
            console.log(params);
        }
        return factories;
    }]);

