"use strict";

window.CQ = {};

//global variable
CQ.variable = {
    dics: "",
    defaultParams: "",
    userEnume: "",
    CURRENT_USER: "",
    USER_PRIVILEGES_CHARTS: "",
    USER_PRIVILEGES_DEPTS: "",
    USERNAME_ADMIN: "admin",
    SECRET:"nicai",
    MAX_LOGIN_TIME:60*60*1000,
    APIKEY: null,
    RESTFUL_URL: "http://118.190.133.203:8899/yqdata/"
};
CQ.variables = {};
CQ.variables.CURRENT_USER = "";
CQ.variables.PERMISSIONS = [];

function aesDecrypt(str)
{
    var secret = CQ.variable.SECRET,
    iv = secret;
    return CryptoJS.enc.Utf8.stringify(CryptoJS.AES.decrypt(str,secret,{
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }));
}
$(function () {
    var loginfo = localStorage.getItem('user');
    CQ.variables.PERMISSIONS = JSON.parse(aesDecrypt(loginfo)).permissionList;
    console.log("mainApp", "system init!");
    angular.bootstrap(document, ['mainApp']);
});
