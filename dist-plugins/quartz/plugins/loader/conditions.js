"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerCondition = registerCondition;
exports.getCondition = getCondition;
exports.getAllConditionNames = getAllConditionNames;
const builtinConditions = {
    "not-index": (props) => props.fileData.slug !== "index",
    "has-tags": (props) => {
        const tags = props.fileData.frontmatter?.tags;
        return Array.isArray(tags) && tags.length > 0;
    },
    "has-backlinks": (props) => {
        const backlinks = props.fileData.backlinks;
        return Array.isArray(backlinks) && backlinks.length > 0;
    },
    "has-toc": (props) => {
        const toc = props.fileData.toc;
        return Array.isArray(toc) && toc.length > 0;
    },
};
const customConditions = new Map();
function registerCondition(name, predicate) {
    customConditions.set(name, predicate);
}
function getCondition(name) {
    return customConditions.get(name) ?? builtinConditions[name];
}
function getAllConditionNames() {
    return [...Object.keys(builtinConditions), ...customConditions.keys()];
}
