"use strict";
angular.module('commons',[])
    .factory('crypto', function () {
        var ret = {};
        ret.md5 = function(str)
        {
            return CryptoJS.MD5(str).toString();
        }
        ret.sha2 = function(str)
        {
            return CryptoJS.SHA256(str).toString();
        }
        ret.sha5 =function(str)
        {
            return CryptoJS.SHA512(str).toString();
        }
        ret.b64encode = function(str)
        {
            return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
        }
        ret.b64decode = function(str)
        {
            return decodeURIComponent(atob(str).split('').map(function(c) {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));
        }
        ret.aesEncrypt = function(str)
        {
            var secret = CQ.variable.SECRET,
            iv = secret;
            return CryptoJS.AES.encrypt(str,secret,{
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }).toString();
        } 
        ret.aesDecrypt = function(str)
        {
            var secret = CQ.variable.SECRET,
            iv = secret;
            return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(str,secret,{
                iv: iv,
                mode: CryptoJS.mode.CBC,
                padding: CryptoJS.pad.Pkcs7
            }));
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
    .factory('permissions', ['$rootScope', 'crypto', 'localStorage', function ($rootScope, crypto, localstorage) {
        var ret = {},
        permissionList=[];
        ret.setPermissions = function(permissions)
        {
            permissionList = permissions;
            $rootScope.$broadcast('permissionsChanged');
        }
        ret.hasPermission = function(permission)
        {
            permission = permission.trim();
            return permissionList.filter(p=>p==permission).length>0;
        }
        return ret;
    }])
    .factory('accountManage', ['crypto', 'localStorage', function (crypto,localstorage) {
        var ret = {};

        //退出登录
        ret.logout = function()
        {
            localstorage.removeItem('user');
            window.location = "/yuqing/login";
            // localstorage.removeItem('username');
        }

        //验证是否登录
        ret.isAuthenticated = function()
        {
            var loginfo = localStorage.getItem('user'),
            secret = CQ.variable.SECRET;
            console.log(loginfo);
            return loginfo&&is_exceed_logintime(JSON.parse(crypto.aesDecrypt(loginfo)));
        }

        //获得用户名
        ret.getUsername = function()
        {
            if(CQ.variables.CURRENT_USER == "")
            {
                var loginfo = localStorage.getItem('user');
                CQ.variables.CURRENT_USER = JSON.parse(crypto.aesDecrypt(loginfo)).username;
            }
            return CQ.variables.CURRENT_USER;
        }

        //获得用户权限
        ret.getPermissions = function()
        {
            if(CQ.variables.PERMISSIONS == "")
            {
                var loginfo = localStorage.getItem('user');
                CQ.variables.PERMISSIONS = JSON.parse(crypto.aesDecrypt(loginfo)).permissionList;
            }
            return CQ.variables.PERMISSIONS;
        }

        //获得请求token
        ret.getToken = function()
        {
            var loginfo = localStorage.getItem('user'),
            userinfo = JSON.parse(crypto.aesDecrypt(loginfo)),
            token = userinfo.token,
            loginTime = userinfo.loginTime,
            maxTime = userinfo.maxLoginTime;
            if((new Date()).getTime()<+loginTime+ +maxTime)
            {
                return token;
            }
            else
            {
                ret.logout();
            }
            // if(CQ.variables.APIKEY == null)
            // {
            //     var loginfo = localStorage.getItem('user');
            //     CQ.variables.APIKEY = JSON.parse(crypto.aesDecrypt(loginfo)).token;
            // }
            // return CQ.variables.APIKEY;
        }
        
        //登录超时验证
        function is_exceed_logintime(userinfo)
        {
            var token = userinfo.token,
            loginTime = userinfo.loginTime,
            maxTime = userinfo.maxLoginTime;
            return (new Date()).getTime()<+loginTime+ +maxTime;
        }
        
        return ret;
    }])
    .factory('http-auth-interceptor', function ($q, $rootScope, accountManage, crypto) {
        return {
            request: function(config){
                config.headers = config.headers || {};
                config.headers.authorization = crypto.b64encode(accountManage.getToken()+'.'+Math.random()*900+100+'.'+(new Date()).getTime());
                return config;
            },
            responseError: function (response) {
                if (response.status === 401 || response.status === 403) {
                    $rootScope.$broadcast('event:auth-loginRequired');
                }
                return $q.reject(response);
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
    .factory("RestService", ['$q', '$state', 'accountManage', 'crypto', function($q,$state,accountManage,crypto) {
        var factories = {};
        factories.get = function(resource, params, not_load) {
            if(!not_load)
                $("#load").show();
            // addToken(params);
            var deferred = $q.defer();
            get(resource, params, deferred);
            return deferred.promise;
        };
        factories.update = function(resource, params, data, not_load) {
            if(!not_load)
                $("#load").show();
            // addToken(data);
            var deferred = $q.defer();
            update(resource, params, data, deferred);
            return deferred.promise;
        };
        factories.remove = function(resource, params, not_load) {
            if(!not_load)
                $("#load").show();
            // addToken(params);
            var deferred = $q.defer();
            remove(resource, params, deferred);
            return deferred.promise;
        };
        factories.create = function(resource, data, not_load) {
            if(!not_load)
                $("#load").show();
            // addToken(data);
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
            params.userid = crypto.b64encode(accountManage.getToken()+'#'+(new Date()).getTime()
            );
            console.log(params);
        }
        return factories;
    }]);

