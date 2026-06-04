"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Static = void 0;
const path_1 = require("../../util/path");
const fs_1 = require("fs");
const glob_1 = require("../../util/glob");
const path_2 = require("path");
const Static = () => ({
    name: "Static",
    async *emit({ argv, cfg }) {
        const staticPath = (0, path_1.joinSegments)(path_1.QUARTZ, "static");
        const fps = await (0, glob_1.glob)("**", staticPath, cfg.configuration.ignorePatterns);
        const outputStaticPath = (0, path_1.joinSegments)(argv.output, "static");
        await fs_1.default.promises.mkdir(outputStaticPath, { recursive: true });
        for (const fp of fps) {
            const src = (0, path_1.joinSegments)(staticPath, fp);
            const dest = (0, path_1.joinSegments)(outputStaticPath, fp);
            await fs_1.default.promises.mkdir((0, path_2.dirname)(dest), { recursive: true });
            await fs_1.default.promises.copyFile(src, dest);
            yield dest;
        }
    },
    async *partialEmit() { },
});
exports.Static = Static;
