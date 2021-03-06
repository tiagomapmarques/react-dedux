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
var config_1 = require("./config");
var strip = function (str, config) {
    var preAndSuffix = config_1.getPrefixAndSuffix(config.ACTIONS_PREFIX, config_1.getConfig().ACTIONS_PREFIX, config.ACTIONS_SUFFIX, config_1.getConfig().ACTIONS_SUFFIX);
    var result = str;
    if (result.indexOf("" + (preAndSuffix.ACTIONS_PREFIX || '')) === 0) {
        result = result.substring(("" + (preAndSuffix.ACTIONS_PREFIX || '')).length);
    }
    var lengthWithoutSuffix = result.length - ("" + (preAndSuffix.ACTIONS_SUFFIX || '')).length;
    if (result.indexOf("" + (preAndSuffix.ACTIONS_SUFFIX || '')) === lengthWithoutSuffix) {
        result = result.substring(0, lengthWithoutSuffix);
    }
    return result.toLowerCase();
};
var actionsToDispatchables = function (actionsGroup, dispatch) {
    return Object.keys(actionsGroup).reduce(function (accumulator, key) {
        return (__assign({}, accumulator, (_a = {}, _a[key] = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return dispatch(actionsGroup[key].apply(actionsGroup, args));
        }, _a)));
        var _a;
    }, {});
};
exports.actionsSelector = function (actions, config) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return function (dispatch) {
        var argsLower = args.map(function (arg) { return arg.toLowerCase(); });
        var selected = Object.keys(actions)
            .filter(function (key) { return argsLower.indexOf(strip(key, config)) >= 0; })
            .reduce(function (accumulator, key) {
            return (__assign({}, accumulator, (_a = {}, _a[key] = actionsToDispatchables(actions[key], dispatch), _a)));
            var _a;
        }, {});
        var init = config.INIT_FUNCTION;
        Object.keys(selected).forEach(function (item) {
            selected[item][init] && typeof selected[item][init] === 'function' && selected[item][init]();
        });
        return selected;
    };
}; };
