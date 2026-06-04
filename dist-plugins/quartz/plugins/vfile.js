"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultProcessedContent = defaultProcessedContent;
const vfile_1 = require("vfile");
function defaultProcessedContent(vfileData) {
    const root = { type: "root", children: [] };
    const vfile = new vfile_1.VFile("");
    vfile.data = vfileData;
    return [root, vfile];
}
