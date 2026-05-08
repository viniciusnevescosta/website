import { visit } from "unist-util-visit";
import type { Node, Parent } from "unist";

// Tipagens básicas para os nós da AST do mdast
interface TextNode extends Node {
  type: "text";
  value: string;
}

interface ImageNode extends Node {
  type: "image";
  url: string;
  alt: string | null;
  title: string | null;
}

export function remarkObsidianImages() {
  return function transformer(tree: Node) {
    visit(tree, "text", (node: Node, index?: number, parent?: Parent) => {
      const textNode = node as TextNode;

      if (!textNode.value || index === undefined || !parent) return;

      const obsidianImageRegex = /!\[\[([^\]]+)\]\]/g;
      const matches = [...textNode.value.matchAll(obsidianImageRegex)];

      if (matches.length === 0) return;

      const newNodes: Node[] = [];
      let lastIndex = 0;

      matches.forEach((match) => {
        const [fullMatch, filename] = match;
        const matchIndex = match.index;

        if (matchIndex === undefined) return;

        if (matchIndex > lastIndex) {
          const textBefore = textNode.value.slice(lastIndex, matchIndex);
          if (textBefore) {
            newNodes.push({
              type: "text",
              value: textBefore,
            } as TextNode);
          }
        }

        const altText = filename
          .replace(/\.[^/.]+$/, "")
          .replace(/[-_]/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase());

        newNodes.push({
          type: "image",
          url: `./${filename}`,
          alt: altText,
          title: null,
        } as ImageNode);

        lastIndex = matchIndex + fullMatch.length;
      });

      if (lastIndex < textNode.value.length) {
        const textAfter = textNode.value.slice(lastIndex);
        if (textAfter) {
          newNodes.push({
            type: "text",
            value: textAfter,
          } as TextNode);
        }
      }

      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}
