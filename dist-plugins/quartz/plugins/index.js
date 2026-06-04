"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginLoader = exports.PageTypes = void 0;
exports.getStaticResourcesFromPlugins = getStaticResourcesFromPlugins;
function getStaticResourcesFromPlugins(ctx) {
    const staticResources = {
        css: [],
        js: [],
        additionalHead: [],
    };
    for (const transformer of [...ctx.cfg.plugins.transformers, ...ctx.cfg.plugins.emitters]) {
        const res = transformer.externalResources ? transformer.externalResources(ctx) : {};
        if (res?.js) {
            staticResources.js.push(...res.js);
        }
        if (res?.css) {
            staticResources.css.push(...res.css);
        }
        if (res?.additionalHead) {
            staticResources.additionalHead.push(...res.additionalHead);
        }
    }
    // if serving locally, listen for rebuilds and reload the page
    if (ctx.argv.serve) {
        const wsUrl = ctx.argv.remoteDevHost
            ? `wss://${ctx.argv.remoteDevHost}:${ctx.argv.wsPort}`
            : `ws://localhost:${ctx.argv.wsPort}`;
        staticResources.js.push({
            loadTime: "afterDOMReady",
            contentType: "inline",
            script: `
        const socket = new WebSocket('${wsUrl}')
        // reload(true) ensures resources like images and scripts are fetched again in firefox
        socket.addEventListener('message', () => document.location.reload(true))
      `,
        });
    }
    return staticResources;
}
__exportStar(require("./transformers"), exports);
__exportStar(require("./filters"), exports);
__exportStar(require("./emitters"), exports);
__exportStar(require("./types"), exports);
__exportStar(require("./config"), exports);
exports.PageTypes = require("./pageTypes");
exports.PluginLoader = require("./loader");
