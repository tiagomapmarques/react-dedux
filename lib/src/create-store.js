"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var redux_1 = require("redux");
var thunk = require("redux-thunk");
var middleware = [thunk.default];
if (window && window.devToolsExtension && typeof window.devToolsExtension === 'function') {
    middleware = middleware.concat([(window.devToolsExtension())]);
}
exports.createStore = function (reducersObject) {
    return function (initialState) { return redux_1.createStore(redux_1.combineReducers(reducersObject), initialState, redux_1.applyMiddleware.apply(void 0, middleware)); };
};
