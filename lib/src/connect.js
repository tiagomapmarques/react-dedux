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
var react_redux_1 = require("react-redux");
var actions_1 = require("./actions");
var state_changers_1 = require("./state-changers");
exports.connect = function (actions, config) { return function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return react_redux_1.connect(state_changers_1.stateChangersSelector.apply(void 0, args), actions_1.actionsSelector(Object.keys(actions).reduce(function (accumulator, key) {
        return (__assign({}, accumulator, (_a = {}, _a[config.getActionsName(key)] = actions[key], _a)));
        var _a;
    }, {}), config).apply(void 0, args));
}; };
