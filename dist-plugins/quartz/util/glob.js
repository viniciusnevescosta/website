"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toPosixPath = toPosixPath;
exports.glob = glob;
const path_1 = require("path");
const globby_1 = require("globby");
function toPosixPath(fp) {
    return fp.split(path_1.default.sep).join("/");
}
async function glob(pattern, cwd, ignorePatterns) {
    const fps = (await (0, globby_1.globby)(pattern, {
        cwd,
        ignore: ignorePatterns,
        gitignore: true,
    })).map(toPosixPath);
    return fps;
}
