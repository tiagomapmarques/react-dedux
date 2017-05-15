"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
exports.reducer = function (typeName, defaultValue, stateChangers, config) {
    return function (prevState, action) {
        var splitter = config.SPLITTER || config_1.getConfig().SPLITTER;
        var actionType = action.type.split(splitter);
        if (actionType.length === 2 && actionType[0].toLowerCase() === typeName.toLowerCase()) {
            return stateChangers[actionType[1]](prevState, action);
        }
        return prevState || defaultValue;
    };
};
