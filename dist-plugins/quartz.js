"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.layout = void 0;
const config_loader_1 = require("./quartz/plugins/loader/config-loader");
const config = await (0, config_loader_1.loadQuartzConfig)();
exports.default = config;
exports.layout = await (0, config_loader_1.loadQuartzLayout)();
