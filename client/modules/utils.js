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
    APIKEY: "309dea40e47f447ca83efb6407cea0c9",
    RESTFUL_URL: "http://localhost:8091/restapi/"
};
CQ.variables = {};
CQ.variables.CURRENT_USER = "";


$(function () {
    console.log("mainApp", "system init!");
    angular.bootstrap(document, ['mainApp']);
});
