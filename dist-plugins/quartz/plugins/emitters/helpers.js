"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.write = void 0;
const path_1 = require("path");
const fs_1 = require("fs");
const path_2 = require("../../util/path");
const write = async ({ ctx, slug, ext, content }) => {
    const pathToPage = (0, path_2.joinSegments)(ctx.argv.output, slug + ext);
    const dir = path_1.default.dirname(pathToPage);
    await fs_1.default.promises.mkdir(dir, { recursive: true });
    await fs_1.default.promises.writeFile(pathToPage, content);
    return pathToPage;
};
exports.write = write;
