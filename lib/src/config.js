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
var capitalise_1 = require("./capitalise");
var config = {
    DOMAIN: '',
    ACTIONS_PREFIX: '',
    ACTIONS_SUFFIX: 'Actions',
    SPLITTER: '/',
    INIT_FUNCTION: 'init',
    getSplitter: function () { return ''; },
    getActionsName: function (_) { return ''; },
    getActionType: function (_, __) { return ({ type: '' }); },
    getDomainNames: function () { return []; },
};
var getAnyfix = function (newFix, defaultFix) {
    return newFix === '' ? newFix : (newFix || defaultFix);
};
exports.getPrefixAndSuffix = function (newPrefix, defaultPrefix, newSuffix, defaultSuffix) {
    var prefix = getAnyfix(newPrefix, defaultPrefix);
    var suffix = getAnyfix(newSuffix, defaultSuffix);
    if (!prefix && !suffix) {
        suffix = config.ACTIONS_SUFFIX;
    }
    return { ACTIONS_PREFIX: prefix, ACTIONS_SUFFIX: suffix };
};
var getSplitter = function (newConfig) { return newConfig.SPLITTER || config.SPLITTER; };
var buildHelpers = function (newConfig) { return (__assign({}, newConfig, { getSplitter: function () { return getSplitter(newConfig); }, getActionsName: function (name) {
        var preAndSuffix = exports.getPrefixAndSuffix(newConfig.ACTIONS_PREFIX, config.ACTIONS_PREFIX, newConfig.ACTIONS_SUFFIX, config.ACTIONS_SUFFIX);
        return (preAndSuffix.ACTIONS_PREFIX && "" + preAndSuffix.ACTIONS_PREFIX + capitalise_1.capitalise(name) + preAndSuffix.ACTIONS_SUFFIX) || "" + name + preAndSuffix.ACTIONS_SUFFIX;
    }, getActionType: function (typeName, typeAction) { return ({
        type: "" + typeName + getSplitter(newConfig) + typeAction,
    }); }, getDomainNames: function () { return newConfig.DOMAIN.split(getSplitter(newConfig)).filter(function (d) { return !!d; }); } })); };
exports.getConfig = function (newConfig) {
    return buildHelpers(__assign({}, config, newConfig));
};
