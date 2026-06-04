"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundPageType = void 0;
const matchers_1 = require("./matchers");
const components_1 = require("../../components");
const vfile_1 = require("../vfile");
const i18n_1 = require("../../i18n");
const NotFoundPageType = () => ({
    name: "404",
    priority: -1,
    match: matchers_1.match.none(),
    generate({ cfg }) {
        const notFound = (0, i18n_1.i18n)(cfg.locale).pages.error.title;
        const slug = "404";
        const [, vfile] = (0, vfile_1.defaultProcessedContent)({
            slug,
            text: notFound,
            description: notFound,
            frontmatter: { title: notFound, tags: [] },
        });
        return [
            {
                slug,
                title: notFound,
                data: vfile.data,
            },
        ];
    },
    layout: "404",
    frame: "minimal",
    body: components_1.NotFound,
});
exports.NotFoundPageType = NotFoundPageType;
