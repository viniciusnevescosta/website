"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.trieFromAllFiles = trieFromAllFiles;
const fileTrie_1 = require("./fileTrie");
function trieFromAllFiles(allFiles) {
    const trie = new fileTrie_1.FileTrieNode([]);
    allFiles.forEach((file) => {
        if (file.frontmatter) {
            trie.add({
                ...file,
                slug: file.slug,
                title: file.frontmatter.title,
                filePath: file.filePath,
            });
        }
    });
    return trie;
}
