import { visit } from 'unist-util-visit';

export function remarkObsidianImages() {
  return function transformer(tree) {
    visit(tree, 'text', (node, index, parent) => {
      if (!node.value) return;
      
      // Regex para encontrar imagens do Obsidian: ![[imagem.ext]]
      const obsidianImageRegex = /!\[\[([^\]]+)\]\]/g;
      const matches = [...node.value.matchAll(obsidianImageRegex)];
      
      if (matches.length === 0) return;
      
      // Se encontrou matches, precisamos dividir o texto e criar novos nós
      const newNodes = [];
      let lastIndex = 0;
      
      matches.forEach((match) => {
        const [fullMatch, filename] = match;
        const matchIndex = match.index;
        
        // Adiciona texto antes do match
        if (matchIndex > lastIndex) {
          const textBefore = node.value.slice(lastIndex, matchIndex);
          if (textBefore) {
            newNodes.push({
              type: 'text',
              value: textBefore
            });
          }
        }
        
        // Cria alt text baseado no nome do arquivo
        const altText = filename
          .replace(/\.[^/.]+$/, '') // Remove extensão
          .replace(/[-_]/g, ' ') // Substitui hífens e underscores por espaços
          .replace(/\b\w/g, l => l.toUpperCase()); // Primeira letra maiúscula
        
        // Cria nó de imagem
        newNodes.push({
          type: 'image',
          url: `./${filename}`,
          alt: altText,
          title: null
        });
        
        lastIndex = matchIndex + fullMatch.length;
      });
      
      // Adiciona texto restante
      if (lastIndex < node.value.length) {
        const textAfter = node.value.slice(lastIndex);
        if (textAfter) {
          newNodes.push({
            type: 'text',
            value: textAfter
          });
        }
      }
      
      // Substitui o nó atual pelos novos nós
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
    
    return tree;
  };
}