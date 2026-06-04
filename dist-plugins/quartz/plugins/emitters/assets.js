"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Assets = void 0;
const path_1 = require("../../util/path");
const path_2 = require("path");
const fs_1 = require("fs");
const glob_1 = require("../../util/glob");
function getPageTypeExtensions(ctx) {
    const extensions = new Set();
    const pageTypes = (ctx.cfg.plugins.pageTypes ?? []);
    for (const pt of pageTypes) {
        if (pt.fileExtensions) {
            for (const ext of pt.fileExtensions) {
                extensions.add(ext);
            }
        }
    }
    return extensions;
}
const filesToCopy = async (argv, cfg, excludeExtensions) => {
    const excludePatterns = ["**/*.md", ...cfg.configuration.ignorePatterns];
    for (const ext of excludeExtensions) {
        excludePatterns.push(`**/*${ext}`);
    }
    return await (0, glob_1.glob)("**", argv.directory, excludePatterns);
};
const copyFile = async (argv, fp) => {
    const src = (0, path_1.joinSegments)(argv.directory, fp);
    const name = (0, path_1.slugifyFilePath)(fp);
    const dest = (0, path_1.joinSegments)(argv.output, name);
    const dir = path_2.default.dirname(dest);
    await fs_1.default.promises.mkdir(dir, { recursive: true });
    await fs_1.default.promises.copyFile(src, dest);
    return dest;
};
const Assets = () => {
    return {
        name: "Assets",
        async *emit(ctx) {
            const excludeExtensions = getPageTypeExtensions(ctx);
            const fps = await filesToCopy(ctx.argv, ctx.cfg, excludeExtensions);
            for (const fp of fps) {
                yield copyFile(ctx.argv, fp);
            }
        },
        async *partialEmit(ctx, _content, _resources, changeEvents) {
            const excludeExtensions = getPageTypeExtensions(ctx);
            for (const changeEvent of changeEvents) {
                const ext = path_2.default.extname(changeEvent.path);
                if (ext === ".md" || excludeExtensions.has(ext))
                    continue;
                if (changeEvent.type === "add" || changeEvent.type === "change") {
                    yield copyFile(ctx.argv, changeEvent.path);
                }
                else if (changeEvent.type === "delete") {
                    const name = (0, path_1.slugifyFilePath)(changeEvent.path);
                    const dest = (0, path_1.joinSegments)(ctx.argv.output, name);
                    await fs_1.default.promises.unlink(dest);
                }
            }
        },
    };
};
exports.Assets = Assets;
