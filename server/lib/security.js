var config = require("../configuration");
var express = require("express");
var passport = require("passport");
var uuid = require("node-uuid");
var logger = require("logger").createLogger();
var app = express();
var requestHttp = require('request');

var baseUrl = config.RESTAPI.basicUrl;

var getUser = function (user) {
    if (user) {
        return {
            user: {
                id: user.id,
                attributes: user.attributes,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }
        }
    } else {
        return {
            user: null
        }
    }
}

var security = {
    authentication: function (request, response, next) {
        if (request.isAuthenticated()) {
            next();
        } else {
            response.json(401, getUser(request.user));
        }
    },

    adminAuthentication: function (request, response, next) {
        if (request.user && request.user.attributes.admin) {
            next();
        } else {
            response.json(401, getUser(request.user));
        }
    },

    currentUser: function (request, response, next) {
        response.json(200, request.user);
        response.end();
    }
}

module.exports = security;
