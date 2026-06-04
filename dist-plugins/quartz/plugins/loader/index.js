"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MINIMUM_QUARTZ_VERSION = void 0;
exports.resolvePlugins = resolvePlugins;
exports.instantiatePlugin = instantiatePlugin;
exports.satisfiesVersion = satisfiesVersion;
const util_1 = require("util");
const gitLoader_1 = require("./gitLoader");
const MINIMUM_QUARTZ_VERSION = "4.5.0";
exports.MINIMUM_QUARTZ_VERSION = MINIMUM_QUARTZ_VERSION;
function satisfiesVersion(required, current) {
    if (!required)
        return true;
    const parseVersion = (v) => {
        const parts = v.replace(/^v/, "").split(".");
        return {
            major: parseInt(parts[0]) || 0,
            minor: parseInt(parts[1]) || 0,
            patch: parseInt(parts[2]) || 0,
        };
    };
    const req = parseVersion(required);
    const cur = parseVersion(current);
    if (cur.major > req.major)
        return true;
    if (cur.major < req.major)
        return false;
    if (cur.minor > req.minor)
        return true;
    if (cur.minor < req.minor)
        return false;
    return cur.patch >= req.patch;
}
async function tryImportPlugin(packageName) {
    try {
        const module = await Promise.resolve(`${packageName}`).then(s => require(s));
        const manifest = module.manifest ?? null;
        return { module, manifest };
    }
    catch (error) {
        throw new Error(`Failed to import package: ${error instanceof Error ? error.message : String(error)}`);
    }
}
function detectPluginType(module) {
    if (!module || typeof module !== "object")
        return null;
    const mod = module;
    if (typeof mod.default === "function") {
        return null;
    }
    const hasPageTypeProps = ["match", "body", "layout"].every((key) => key in mod);
    const hasTransformerProps = ["textTransform", "markdownPlugins", "htmlPlugins"].some((key) => key in mod && (typeof mod[key] === "function" || mod[key] === undefined));
    const hasFilterProps = ["shouldPublish"].some((key) => key in mod && typeof mod[key] === "function");
    const hasEmitterProps = ["emit"].some((key) => key in mod && typeof mod[key] === "function");
    if (hasPageTypeProps)
        return "pageType";
    if (hasEmitterProps)
        return "emitter";
    if (hasFilterProps)
        return "filter";
    if (hasTransformerProps)
        return "transformer";
    return null;
}
function extractPluginFactory(module, type) {
    if (!module || typeof module !== "object")
        return null;
    const mod = module;
    const factory = mod.default ?? mod[type] ?? mod.plugin ?? null;
    if (typeof factory === "function") {
        return factory;
    }
    return null;
}
function isGitSource(source) {
    // Check if it's a Git-based or local file path source
    return ((0, gitLoader_1.isLocalSource)(source) ||
        source.startsWith("github:") ||
        source.startsWith("git+") ||
        source.startsWith("https://github.com/") ||
        source.startsWith("https://gitlab.com/") ||
        source.startsWith("https://bitbucket.org/"));
}
async function resolveSinglePlugin(specifier, options) {
    let packageName;
    let manifest = {};
    let pluginSource = "npm";
    if (typeof specifier === "string") {
        packageName = specifier;
        // Check if it's a Git-based source
        if (isGitSource(specifier)) {
            pluginSource = "git";
        }
    }
    else if ("name" in specifier) {
        packageName = specifier.name;
        if (isGitSource(specifier.name)) {
            pluginSource = "git";
        }
    }
    else if ("plugin" in specifier) {
        const rawType = specifier.manifest?.category ?? "transformer";
        const type = Array.isArray(rawType) ? rawType[0] : rawType;
        return {
            plugin: {
                plugin: specifier.plugin,
                manifest: {
                    name: specifier.manifest?.name ?? "inline-plugin",
                    displayName: specifier.manifest?.displayName ?? "Inline Plugin",
                    description: specifier.manifest?.description ?? "Inline plugin instance",
                    version: specifier.manifest?.version ?? "1.0.0",
                    category: rawType,
                    ...specifier.manifest,
                },
                type,
                source: "inline",
            },
            error: null,
        };
    }
    else {
        return {
            plugin: null,
            error: {
                plugin: "unknown",
                message: "Invalid plugin specifier format",
                type: "invalid-manifest",
            },
        };
    }
    if (pluginSource === "git") {
        try {
            const gitSpec = (0, gitLoader_1.parsePluginSource)(packageName);
            await (0, gitLoader_1.installPlugin)(gitSpec, { verbose: options.verbose });
            const entryPoint = (0, gitLoader_1.getPluginEntryPoint)(gitSpec.name);
            // Import the plugin
            const module = await Promise.resolve(`${(0, gitLoader_1.toFileUrl)(entryPoint)}`).then(s => require(s));
            const importedManifest = module.manifest ?? null;
            (0, gitLoader_1.validatePluginExternals)(gitSpec.name, entryPoint, { verbose: options.verbose });
            manifest = importedManifest ?? {};
            const categoryOrCategories = manifest.category ?? detectPluginType(module);
            if (!categoryOrCategories) {
                return {
                    plugin: null,
                    error: {
                        plugin: packageName,
                        message: "Could not detect plugin type from Git source",
                        type: "invalid-manifest",
                    },
                };
            }
            // Normalize to single processing category for factory extraction
            const processingCategories = ["transformer", "filter", "emitter", "pageType"];
            const detectedType = Array.isArray(categoryOrCategories)
                ? categoryOrCategories[0]
                : categoryOrCategories;
            const processingType = Array.isArray(categoryOrCategories)
                ? categoryOrCategories.find((c) => processingCategories.includes(c))
                : processingCategories.includes(categoryOrCategories)
                    ? categoryOrCategories
                    : undefined;
            // Component-only plugins don't have a processing factory
            if (!processingType) {
                const fullManifest = {
                    name: manifest.name ?? gitSpec.name,
                    displayName: manifest.displayName ?? gitSpec.name,
                    description: manifest.description ?? "No description provided",
                    version: manifest.version ?? "1.0.0",
                    author: manifest.author,
                    homepage: manifest.homepage,
                    keywords: manifest.keywords,
                    category: manifest.category ?? detectedType,
                    quartzVersion: manifest.quartzVersion,
                    configSchema: manifest.configSchema,
                };
                if (options.verbose) {
                    console.log((0, util_1.styleText)("green", `\u2713`) +
                        ` Loaded ${detectedType} plugin: ${(0, util_1.styleText)("cyan", fullManifest.displayName)}@${fullManifest.version} ${(0, util_1.styleText)("gray", `(from ${gitSpec.repo})`)}`);
                }
                return { plugin: null, error: null };
            }
            const factory = extractPluginFactory(module, processingType);
            if (!factory) {
                return {
                    plugin: null,
                    error: {
                        plugin: packageName,
                        message: "Could not find plugin factory in Git source",
                        type: "invalid-manifest",
                    },
                };
            }
            const fullManifest = {
                name: manifest.name ?? gitSpec.name,
                displayName: manifest.displayName ?? gitSpec.name,
                description: manifest.description ?? "No description provided",
                version: manifest.version ?? "1.0.0",
                author: manifest.author,
                homepage: manifest.homepage,
                keywords: manifest.keywords,
                category: manifest.category ?? detectedType,
                quartzVersion: manifest.quartzVersion,
                configSchema: manifest.configSchema,
            };
            const loadedPlugin = {
                plugin: factory,
                manifest: fullManifest,
                type: detectedType,
                source: gitSpec.local ? `local:${gitSpec.repo}` : `${gitSpec.repo}#${gitSpec.ref}`,
            };
            if (options.verbose) {
                console.log((0, util_1.styleText)("green", `✓`) +
                    ` Loaded ${detectedType} plugin: ${(0, util_1.styleText)("cyan", fullManifest.displayName)}@${fullManifest.version} ${(0, util_1.styleText)("gray", `(from ${gitSpec.repo})`)}`);
            }
            return { plugin: loadedPlugin, error: null };
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : String(error);
            return {
                plugin: null,
                error: {
                    plugin: packageName,
                    message: `Failed to load Git plugin: ${errorMessage}`,
                    type: "import-error",
                },
            };
        }
    }
    try {
        const { module: importedModule, manifest: importedManifest } = await tryImportPlugin(packageName);
        manifest = importedManifest ?? {};
        // Load components if the plugin declares any
        if (manifest.components && Object.keys(manifest.components).length > 0) {
            const { loadComponentsFromPackage } = await Promise.resolve().then(() => require("./componentLoader"));
            await loadComponentsFromPackage(packageName, manifest);
        }
        const categoryOrCategories = manifest.category ?? detectPluginType(importedModule);
        if (!categoryOrCategories) {
            return {
                plugin: null,
                error: {
                    plugin: packageName,
                    message: `Could not detect plugin type. Ensure the plugin exports a valid factory function or has a 'category' field in its manifest.`,
                    type: "invalid-manifest",
                },
            };
        }
        // Normalize to single processing category for factory extraction
        const processingCategories = ["transformer", "filter", "emitter", "pageType"];
        const detectedType = Array.isArray(categoryOrCategories)
            ? categoryOrCategories[0]
            : categoryOrCategories;
        const processingType = Array.isArray(categoryOrCategories)
            ? categoryOrCategories.find((c) => processingCategories.includes(c))
            : processingCategories.includes(categoryOrCategories)
                ? categoryOrCategories
                : undefined;
        if (manifest.quartzVersion &&
            !satisfiesVersion(manifest.quartzVersion, options.quartzVersion)) {
            return {
                plugin: null,
                error: {
                    plugin: packageName,
                    message: `Plugin requires Quartz ${manifest.quartzVersion} but current version is ${options.quartzVersion}`,
                    type: "version-mismatch",
                },
            };
        }
        // Component-only plugins don't have a processing factory
        if (!processingType) {
            const fullManifest = {
                name: manifest.name ?? packageName,
                displayName: manifest.displayName ?? packageName,
                description: manifest.description ?? "No description provided",
                version: manifest.version ?? "1.0.0",
                author: manifest.author,
                homepage: manifest.homepage,
                keywords: manifest.keywords,
                category: manifest.category ?? detectedType,
                quartzVersion: manifest.quartzVersion,
                configSchema: manifest.configSchema,
            };
            if (options.verbose) {
                console.log((0, util_1.styleText)("green", `\u2713`) +
                    ` Loaded ${detectedType} plugin: ${(0, util_1.styleText)("cyan", fullManifest.displayName)}@${fullManifest.version}`);
            }
            return { plugin: null, error: null };
        }
        const factory = extractPluginFactory(importedModule, processingType);
        if (!factory) {
            return {
                plugin: null,
                error: {
                    plugin: packageName,
                    message: `Could not find plugin factory in module. Expected 'export default' or '${processingType}' export.`,
                    type: "invalid-manifest",
                },
            };
        }
        const fullManifest = {
            name: manifest.name ?? packageName,
            displayName: manifest.displayName ?? packageName,
            description: manifest.description ?? "No description provided",
            version: manifest.version ?? "1.0.0",
            author: manifest.author,
            homepage: manifest.homepage,
            keywords: manifest.keywords,
            category: manifest.category ?? detectedType,
            quartzVersion: manifest.quartzVersion,
            configSchema: manifest.configSchema,
        };
        const loadedPlugin = {
            plugin: factory,
            manifest: fullManifest,
            type: detectedType,
            source: packageName,
        };
        if (options.verbose) {
            console.log((0, util_1.styleText)("green", `✓`) +
                ` Loaded ${detectedType} plugin: ${(0, util_1.styleText)("cyan", fullManifest.displayName)}@${fullManifest.version}`);
        }
        return { plugin: loadedPlugin, error: null };
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        if (errorMessage.includes("Cannot find module") || errorMessage.includes("MODULE_NOT_FOUND")) {
            return {
                plugin: null,
                error: {
                    plugin: packageName,
                    message: `Plugin package not found. Run 'npm install ${packageName}' to install it.`,
                    type: "not-found",
                },
            };
        }
        return {
            plugin: null,
            error: {
                plugin: packageName,
                message: errorMessage,
                type: "import-error",
            },
        };
    }
}
async function resolvePlugins(specifiers, options) {
    const plugins = [];
    const errors = [];
    if (options.verbose) {
        console.log((0, util_1.styleText)("cyan", `Resolving ${specifiers.length} external plugin(s)...`));
    }
    for (const specifier of specifiers) {
        const { plugin, error } = await resolveSinglePlugin(specifier, options);
        if (plugin) {
            plugins.push(plugin);
        }
        else if (error) {
            errors.push(error);
            console.error((0, util_1.styleText)("red", `✗`) +
                ` Failed to load plugin: ${(0, util_1.styleText)("yellow", error.plugin)}\n` +
                `  ${error.message}`);
        }
    }
    if (options.verbose && plugins.length > 0) {
        const byType = plugins.reduce((acc, p) => {
            acc[p.type] = (acc[p.type] || 0) + 1;
            return acc;
        }, {});
        console.log((0, util_1.styleText)("cyan", `External plugins loaded:`) +
            ` ${byType.transformer ?? 0} transformers, ${byType.filter ?? 0} filters, ${byType.emitter ?? 0} emitters, ${byType.pageType ?? 0} pageTypes`);
    }
    return { plugins, errors };
}
function instantiatePlugin(loadedPlugin, options) {
    const factory = loadedPlugin.plugin;
    return factory(options);
}
