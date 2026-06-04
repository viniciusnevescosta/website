"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.External = External;
const registry_1 = require("./registry");
function External(name, options) {
    const registered = registry_1.componentRegistry.get(name);
    if (!registered) {
        throw new Error(`External component "${name}" not found. ` +
            `Make sure the plugin is installed and components are loaded before layouts are evaluated.`);
    }
    const { component } = registered;
    if (typeof component === "function") {
        return component(options);
    }
    return component;
}
