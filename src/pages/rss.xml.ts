import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@consts";
import { marked } from "marked";
import fs from 'node:fs';
import path from 'node:path';

type Context = {
  site: string
}

export async function GET(context: Context) {
  const blog = (await getCollection("blog"))
  .filter(post => !post.data.draft);

  const projects = (await getCollection("projects"))
    .filter(project => !project.data.draft);

  const photos = (await getCollection("photos"))
    .filter(photo => !photo.data.draft);

  const items = [...blog, ...projects, ...photos]
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: await Promise.all(items.map(async (item) => {
      let content = item.body;
      
      // Process Obsidian-style images: ![[image.png]] -> ![alt](./image.png)
      content = content.replace(/!\[\[([^\]]+)\]\]/g, (_match, filename) => {
        const altText = filename
          .replace(/\.[^/.]+$/, '') // Remove extension
          .replace(/[-_]/g, ' ') // Replace hyphens and underscores with spaces
          .replace(/\b\w/g, (l: string) => l.toUpperCase()); // Capitalize first letters
        return `![${altText}](./${filename})`;
      });
      
      // Parse markdown to HTML
      let htmlContent = await marked.parse(content);
      
      // For RSS feeds, we'll copy original images to the public directory structure
      // and reference them directly
      const siteUrl = typeof context.site === 'string' ? context.site : String(context.site);
      
      // Create a mapping of original images to their public URLs
      htmlContent = htmlContent.replace(
        /<img([^>]*?)src="\.\/([^"]+)"([^>]*?)>/g, 
        (_match, before, filename, after) => {
          // Check if the image exists in the content directory
          const imagePath = path.join(process.cwd(), 'src', 'content', item.collection, item.slug, filename);
          const publicImagePath = path.join(process.cwd(), 'dist', item.collection, item.slug, filename);
          
          try {
            // Copy the image to the public directory if it exists
            if (fs.existsSync(imagePath)) {
              // Ensure the directory exists
              const publicDir = path.dirname(publicImagePath);
              if (!fs.existsSync(publicDir)) {
                fs.mkdirSync(publicDir, { recursive: true });
              }
              
              // Copy the image
              if (!fs.existsSync(publicImagePath)) {
                fs.copyFileSync(imagePath, publicImagePath);
              }
              
              // Return the img tag with absolute URL
              const imageUrl = `${siteUrl.replace(/\/$/, '')}/${item.collection}/${item.slug}/${filename}`;
              return `<img${before}src="${imageUrl}"${after}>`;
            }
          } catch (error) {
            console.warn(`Failed to process image ${filename} for RSS:`, error);
          }
          
          // If image processing fails, return a placeholder
          return '<p><em>[Image not available in RSS feed - view on website]</em></p>';
        }
      );
      
      // Add styling to any remaining images (external ones)
      htmlContent = htmlContent.replace(
        /<img([^>]*?)>/g,
        '<img$1 style="max-width: 100%; height: auto; margin: 10px 0;">'
      );
      
      // Add photo gallery for photo collections
      if (item.collection === 'photos' && item.data.photos) {
        const photosHTML = item.data.photos.map((photo: any) => 
          `<img src="${photo.url}" alt="${photo.alt}" style="max-width: 100%; height: auto; margin: 10px 0;" />`
        ).join('\n');
        htmlContent = htmlContent + '\n\n<h2>Photos</h2>\n' + photosHTML;
      }
      
      return {
        title: item.data.title,
        description: item.data.description,
        content: htmlContent,
        pubDate: item.data.date,
        link: `/${item.collection}/${item.slug}/`,
      };
    })),
  });
}