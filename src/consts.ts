import type { Site, Metadata, Socials } from "@types";

export const SITE: Site = {
  NAME: "Vinícius Costa",
  EMAIL: "contact@viniciusnevescosta.com",
  NUM_POSTS_ON_HOMEPAGE: 3,
  NUM_PROJECTS_ON_HOMEPAGE: 2,
};

export const HOME: Metadata = {
  TITLE: "Home",
  DESCRIPTION: "My blog and portfolio.",
};

export const BLOG: Metadata = {
  TITLE: "Blog",
  DESCRIPTION: "A collection of articles on topics I am passionate about.",
};

export const PROJECTS: Metadata = {
  TITLE: "Projects",
  DESCRIPTION: "A collection of my projects, with links to repositories and demos.",
};

export const PHOTOS: Metadata = {
  TITLE: "Photos",
  DESCRIPTION: "A collection of my photography organized by themes and locations.",
};

export const SOCIALS: Socials = [
  { 
    NAME: "linkedin",
    HREF: "https://www.linkedin.com/in/nevesco/",
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
