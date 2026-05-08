import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Vinícius Neves Costa",
  EMAIL: "contact@viniciusnevescosta.com",
  NUM_POSTS_ON_HOMEPAGE: 2,
  NUM_PROJECTS_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Programmer",
  DESCRIPTION:
    "I'm Vinícius Neves Costa, a programmer and software engineering student. I write about software development, Linux, and technology. I also share personal projects and photography.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION:
    "Articles about software development, Linux, technology, and personal reflections by Vinícius Neves Costa.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION:
    "Open-source and personal projects by Vinícius Neves Costa — apps, tools, and experiments, with links to live demos and source code.",
};

export const PHOTOS: Metadata = {
  TITLE: "Photos",
  DESCRIPTION:
    "Photography by Vinícius Neves Costa — collections organized by locations and themes across Brazil and beyond.",
};

export const SOCIALS: Socials = [
  {
    NAME: "resume",
    HREF: "https://resume.viniciusnevescosta.com/en",
  },
  {
    NAME: "github",
    HREF: "https://github.com/viniciusnevescosta",
  },
  {
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/viniciusnevescosta",
  },
  {
    NAME: "unsplash",
    HREF: "https://unsplash.com/@viniciusnevescosta",
  },
  {
    NAME: "rss",
    HREF: "/rss.xml",
  },
];
