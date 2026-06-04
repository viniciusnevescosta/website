#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gitLoader_js_1 = require("./gitLoader.js");
const quartz_js_1 = require("../../../quartz.js");
async function main() {
    const quartzConfig = quartz_js_1.default;
    const externalPlugins = quartzConfig.externalPlugins || [];
    if (externalPlugins.length === 0) {
        console.log("No external plugins to install.");
        return;
    }
    console.log(`Installing ${externalPlugins.length} plugin(s) from Git...`);
    const specs = externalPlugins.map((source) => (0, gitLoader_js_1.parsePluginSource)(source));
    const installed = await (0, gitLoader_js_1.installPlugins)(specs, { verbose: true });
    if (installed.size === externalPlugins.length) {
        console.log("✓ All plugins installed successfully");
    }
    else {
        console.error(`✗ Only ${installed.size}/${externalPlugins.length} plugins installed`);
        process.exit(1);
    }
}
main().catch((err) => {
    console.error("Failed to install plugins:", err);
    process.exit(1);
});
