import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { HOME } from "@consts";
import { marked } from "marked";

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
      let content = await marked.parse(item.body);
      
      // Add photo gallery for photo collections
      if (item.collection === 'photos' && item.data.photos) {
        const photosHTML = item.data.photos.map((photo: any) => 
          `<img src="${photo.url}" alt="${photo.alt}" style="max-width: 100%; height: auto; margin: 10px 0;" />`
        ).join('\n');
        content = content + '\n\n<h2>Photos</h2>\n' + photosHTML;
      }
      
      return {
        title: item.data.title,
        description: item.data.description,
        content: content,
        pubDate: item.data.date,
        link: `/${item.collection}/${item.slug}/`,
      };
    })),
  });
}