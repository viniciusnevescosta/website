"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QUARTZ = exports.normalizeHastElement = exports.transformLink = exports.transformInternalLink = exports.slugTag = exports.splitAnchor = exports.resolveRelative = exports.pathToRoot = exports.getAllSegmentPrefixes = exports.isFolderPath = exports.getFileExtension = exports.stripSlashes = exports.trimSuffix = exports.endsWith = exports.joinSegments = exports.simplifySlug = exports.slugifyFilePath = exports.getFullSlug = exports.isAbsoluteURL = exports.isRelativeURL = exports.isSimpleSlug = exports.isFullSlug = exports.isFilePath = void 0;
exports.normalizeRelativeURLs = normalizeRelativeURLs;
// Re-export shared path utilities from @quartz-community/utils
var utils_1 = require("@quartz-community/utils");
Object.defineProperty(exports, "isFilePath", { enumerable: true, get: function () { return utils_1.isFilePath; } });
Object.defineProperty(exports, "isFullSlug", { enumerable: true, get: function () { return utils_1.isFullSlug; } });
Object.defineProperty(exports, "isSimpleSlug", { enumerable: true, get: function () { return utils_1.isSimpleSlug; } });
Object.defineProperty(exports, "isRelativeURL", { enumerable: true, get: function () { return utils_1.isRelativeURL; } });
Object.defineProperty(exports, "isAbsoluteURL", { enumerable: true, get: function () { return utils_1.isAbsoluteURL; } });
Object.defineProperty(exports, "getFullSlug", { enumerable: true, get: function () { return utils_1.getFullSlug; } });
Object.defineProperty(exports, "slugifyFilePath", { enumerable: true, get: function () { return utils_1.slugifyFilePath; } });
Object.defineProperty(exports, "simplifySlug", { enumerable: true, get: function () { return utils_1.simplifySlug; } });
Object.defineProperty(exports, "joinSegments", { enumerable: true, get: function () { return utils_1.joinSegments; } });
Object.defineProperty(exports, "endsWith", { enumerable: true, get: function () { return utils_1.endsWith; } });
Object.defineProperty(exports, "trimSuffix", { enumerable: true, get: function () { return utils_1.trimSuffix; } });
Object.defineProperty(exports, "stripSlashes", { enumerable: true, get: function () { return utils_1.stripSlashes; } });
Object.defineProperty(exports, "getFileExtension", { enumerable: true, get: function () { return utils_1.getFileExtension; } });
Object.defineProperty(exports, "isFolderPath", { enumerable: true, get: function () { return utils_1.isFolderPath; } });
Object.defineProperty(exports, "getAllSegmentPrefixes", { enumerable: true, get: function () { return utils_1.getAllSegmentPrefixes; } });
Object.defineProperty(exports, "pathToRoot", { enumerable: true, get: function () { return utils_1.pathToRoot; } });
Object.defineProperty(exports, "resolveRelative", { enumerable: true, get: function () { return utils_1.resolveRelative; } });
Object.defineProperty(exports, "splitAnchor", { enumerable: true, get: function () { return utils_1.splitAnchor; } });
Object.defineProperty(exports, "slugTag", { enumerable: true, get: function () { return utils_1.slugTag; } });
Object.defineProperty(exports, "transformInternalLink", { enumerable: true, get: function () { return utils_1.transformInternalLink; } });
Object.defineProperty(exports, "transformLink", { enumerable: true, get: function () { return utils_1.transformLink; } });
Object.defineProperty(exports, "normalizeHastElement", { enumerable: true, get: function () { return utils_1.normalizeHastElement; } });
// --- v5-specific exports below ---
exports.QUARTZ = "quartz";
// from micromorph/src/utils.ts
// https://github.com/natemoo-re/micromorph/blob/main/src/utils.ts#L5
const _rebaseHtmlElement = (el, attr, newBase) => {
    const rebased = new URL(el.getAttribute(attr), newBase);
    el.setAttribute(attr, rebased.pathname + rebased.hash);
};
function normalizeRelativeURLs(el, destination) {
    el.querySelectorAll('[href=""], [href^="./"], [href^="../"]').forEach((item) => {
        _rebaseHtmlElement(item, "href", destination);
    });
    el.querySelectorAll('[src=""], [src^="./"], [src^="../"]').forEach((item) => {
        _rebaseHtmlElement(item, "src", destination);
    });
}
