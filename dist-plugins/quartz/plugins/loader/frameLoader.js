"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadFramesFromPackage = loadFramesFromPackage;
const registry_1 = require("../../components/frames/registry");
const gitLoader_1 = require("./gitLoader");
async function loadFramesFromPackage(pluginName, manifest) {
    if (!manifest?.frames)
        return;
    try {
        const framesPath = (0, gitLoader_1.getPluginSubpathEntry)(pluginName, "./frames");
        let framesModule;
        if (framesPath) {
            framesModule = await Promise.resolve(`${(0, gitLoader_1.toFileUrl)(framesPath)}`).then(s => require(s));
        }
        else {
            framesModule = await Promise.resolve(`${`${pluginName}/frames`}`).then(s => require(s));
        }
        for (const [exportName, _frameMeta] of Object.entries(manifest.frames)) {
            const frame = framesModule[exportName];
            if (!frame) {
                console.warn(`Frame "${exportName}" declared in manifest but not found in ${pluginName}/frames`);
                continue;
            }
            const pageFrame = frame;
            if (!pageFrame.name || typeof pageFrame.render !== "function") {
                console.warn(`Frame "${exportName}" from ${pluginName} is not a valid PageFrame (missing name or render)`);
                continue;
            }
            // Register under the frame's declared name
            registry_1.frameRegistry.register(pageFrame.name, pageFrame, pluginName);
        }
    }
    catch {
        if (manifest.frames && Object.keys(manifest.frames).length > 0) {
            console.warn(`Plugin "${pluginName}" declares frames but failed to load them`);
        }
    }
}
