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
exports.stateChangersSelector = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (reducers) {
        return Object.keys(reducers)
            .filter(function (key) { return args.indexOf(key) >= 0; })
            .reduce(function (accumulator, key) {
            return (__assign({}, accumulator, (_a = {}, _a[key] = reducers[key], _a)));
            var _a;
        }, {});
    };
};
