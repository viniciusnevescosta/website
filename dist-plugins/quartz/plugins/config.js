"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isLoadedPlugin = isLoadedPlugin;
exports.getPluginInstance = getPluginInstance;
function isLoadedPlugin(plugin) {
    return (typeof plugin === "object" &&
        plugin !== null &&
        "plugin" in plugin &&
        "manifest" in plugin &&
        "type" in plugin &&
        typeof plugin.plugin === "function");
}
function getPluginInstance(plugin, options) {
    if (isLoadedPlugin(plugin)) {
        const factory = plugin.plugin;
        return factory(options);
    }
    return plugin;
}
