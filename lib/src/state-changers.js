"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var reducer_1 = require("./reducer");
var config_1 = require("./config");
exports.stateChangersSelector = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (stateChangers) {
        return Object.keys(stateChangers)
            .filter(function (key) { return args.indexOf(key) >= 0; })
            .reduce(function (accumulator, key) {
            return (__assign({}, accumulator, (_a = {}, _a[key] = stateChangers[key], _a)));
            var _a;
        }, {});
    };
};
exports.replaceStateChangers = function (store, stateChangers, config) {
    return store.replaceReducer(reducer_1.combineReducers(stateChangers, config_1.getConfig(config)));
};
