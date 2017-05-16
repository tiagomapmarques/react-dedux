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
var redux_1 = require("redux");
var thunk = require("redux-thunk");
var reducer_1 = require("./reducer");
var middleware = [thunk.default];
if (window && window.devToolsExtension && typeof window.devToolsExtension === 'function') {
    middleware = middleware.concat([(window.devToolsExtension())]);
}
var autoReduce = function (reducersObject, defaultValues, config) {
    return Object.keys(reducersObject).reduce(function (accumulator, key) {
        return (__assign({}, accumulator, (_a = {}, _a[key] = reducer_1.reducer(key, defaultValues[key], reducersObject[key], config), _a)));
        var _a;
    }, {});
};
exports.createStore = function (reducersObject, defaultValues, config) {
    return function (initialState) { return redux_1.createStore(redux_1.combineReducers(autoReduce(reducersObject, defaultValues, config)), initialState, redux_1.applyMiddleware.apply(void 0, middleware)); };
};
