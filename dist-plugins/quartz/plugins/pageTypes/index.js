"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageTypeDispatcher = exports.NotFoundPageType = exports.match = void 0;
var matchers_1 = require("./matchers");
Object.defineProperty(exports, "match", { enumerable: true, get: function () { return matchers_1.match; } });
var _404_1 = require("./404");
Object.defineProperty(exports, "NotFoundPageType", { enumerable: true, get: function () { return _404_1.NotFoundPageType; } });
var dispatcher_1 = require("./dispatcher");
Object.defineProperty(exports, "PageTypeDispatcher", { enumerable: true, get: function () { return dispatcher_1.PageTypeDispatcher; } });
