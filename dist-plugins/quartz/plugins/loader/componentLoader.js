"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadComponentsFromPackage = loadComponentsFromPackage;
const registry_1 = require("../../components/registry");
const gitLoader_1 = require("./gitLoader");
async function loadComponentsFromPackage(pluginName, manifest) {
    if (!manifest?.components)
        return;
    try {
        const componentsPath = (0, gitLoader_1.getPluginSubpathEntry)(pluginName, "./components");
        let componentsModule;
        if (componentsPath) {
            componentsModule = await Promise.resolve(`${(0, gitLoader_1.toFileUrl)(componentsPath)}`).then(s => require(s));
        }
        else {
            componentsModule = await Promise.resolve(`${`${pluginName}/components`}`).then(s => require(s));
        }
        const componentEntries = Object.entries(manifest.components);
        for (const [exportName, componentManifest] of componentEntries) {
            const component = componentsModule[exportName];
            if (!component) {
                console.warn(`Component "${exportName}" declared in manifest but not found in ${pluginName}/components`);
                continue;
            }
            // Register under the fully-qualified key (pluginName/exportName)
            registry_1.componentRegistry.register(`${pluginName}/${exportName}`, component, pluginName, componentManifest);
            // Also register under just the export name (e.g. "Footer", "NotePropertiesComponent")
            // so buildLayoutForEntries can find it via PascalCase conversion of plugin name
            if (!registry_1.componentRegistry.get(exportName)) {
                registry_1.componentRegistry.register(exportName, component, pluginName, componentManifest);
            }
        }
        // If plugin has exactly one component, also register under just the plugin name
        // (e.g. "footer", "note-properties") for direct kebab-case lookup
        if (componentEntries.length === 1) {
            const [exportName] = componentEntries[0];
            const component = componentsModule[exportName];
            if (component && !registry_1.componentRegistry.get(pluginName)) {
                registry_1.componentRegistry.register(pluginName, component, pluginName, componentEntries[0][1]);
            }
        }
    }
    catch {
        if (manifest.components && Object.keys(manifest.components).length > 0) {
            console.warn(`Plugin "${pluginName}" declares components but failed to load them`);
        }
    }
}
