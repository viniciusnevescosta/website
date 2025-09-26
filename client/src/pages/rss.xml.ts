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

  const items = [...blog, ...projects]
    .sort((a, b) => new Date(b.data.date).valueOf() - new Date(a.data.date).valueOf());

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: await Promise.all(items.map(async (item) => ({
      title: item.data.title,
      description: item.data.description,
      content: await marked.parse(item.body),
      pubDate: item.data.date,
      link: `/${item.collection}/${item.slug}/`,
    }))),
  });
}