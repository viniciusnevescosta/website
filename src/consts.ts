import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Vinícius Costa",
  EMAIL: "contact@viniciusnevescosta.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Web Developer & CS Student",
  DESCRIPTION: "Web developer and computer engineering student. I write about software development, Linux, and technology. I also share personal projects and photography.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "Articles about software development, Linux, technology, and personal reflections by Vinícius Costa.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "Open-source and personal projects by Vinícius Costa — web apps, tools, and experiments, with links to live demos and source code.",
};

export const PHOTOS: Metadata = {
  TITLE: "Photos",
  DESCRIPTION: "Photography by Vinícius Costa — collections organized by locations and themes across Brazil and beyond.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/viniciusnevescosta",
  },
  { 
    NAME: "github",
    HREF: "https://github.com/viniciusnevescosta"
  },
  { 
    NAME: "rss",
    HREF: "/rss.xml"
  },
];
