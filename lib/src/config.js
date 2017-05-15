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
var config = {
    ACTIONS_PREFIX: '',
    ACTIONS_SUFFIX: 'Actions',
    SPLITTER: '/',
    INIT_FUNCTION: 'init',
    getActionsName: function (_) { return ''; },
    getActionType: function (_, __) { return ({ type: '' }); },
};
var buildHelpers = function (newConfig) { return (__assign({}, newConfig, { getActionsName: function (name) { return "" + newConfig.ACTIONS_PREFIX + name + newConfig.ACTIONS_SUFFIX; }, getActionType: function (typeName, typeAction) { return ({
        type: "" + typeName + newConfig.SPLITTER + typeAction,
    }); } })); };
exports.getConfig = function (newConfig) { return buildHelpers(__assign({}, config, newConfig)); };
