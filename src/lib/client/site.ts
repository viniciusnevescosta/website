import { bindArticleImages, bindPhotoCollection } from "@lib/client/photo-gallery";

const THEME_STORAGE_KEY = "theme";

declare global {
  interface Window {
    __siteSystemThemeBound?: boolean;
    __siteScrollBound?: boolean;
  }
}

function flushStyles(element: Element): string {
  return window.getComputedStyle(element).opacity;
}

function withoutTransitions(callback: () => void): void {
  const css = document.createElement("style");

  css.appendChild(
    document.createTextNode(
      `* {
        -webkit-transition: none !important;
        -moz-transition: none !important;
        -o-transition: none !important;
        -ms-transition: none !important;
        transition: none !important;
      }`,
    ),
  );

  document.head.appendChild(css);
  callback();
  flushStyles(css);
  document.head.removeChild(css);
}

function isSystemDark(): boolean {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark: boolean): void {
  withoutTransitions(() => {
    document.documentElement.classList.toggle("dark", isDark);
  });
}

function applyStoredTheme(): void {
  const userTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (userTheme === "light" || userTheme === "dark") {
    applyTheme(userTheme === "dark");
    return;
  }

  applyTheme(isSystemDark());
}

function onScroll(): void {
  document.documentElement.classList.toggle("scrolled", window.scrollY > 0);
}

function animateIn(): void {
  const animateElements = document.querySelectorAll<HTMLElement>(".animate");

  animateElements.forEach((element, index) => {
    if (element.classList.contains("show")) {
      return;
    }

    window.setTimeout(() => {
      element.classList.add("show");
    }, index * 150);
  });
}

function scrollToTop(event: Event): void {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindClickOnce(element: HTMLElement | null, key: string, handler: EventListener): void {
  if (!element || element.dataset[key] === "true") {
    return;
  }

  element.dataset[key] = "true";
  element.addEventListener("click", handler);
}

function bindThemeButtons(): void {
  bindClickOnce(document.getElementById("light-theme-button"), "siteBound", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    applyTheme(false);
  });

  bindClickOnce(document.getElementById("dark-theme-button"), "siteBound", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    applyTheme(true);
  });

  bindClickOnce(document.getElementById("system-theme-button"), "siteBound", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "system");
    applyTheme(isSystemDark());
  });
}

function bindNavigationButtons(): void {
  bindClickOnce(document.getElementById("back-to-top"), "siteBound", scrollToTop);

  bindClickOnce(document.getElementById("back-to-prev"), "siteBound", (event) => {
    if (window.history.length <= 1) {
      return;
    }

    event.preventDefault();
    window.history.back();
  });
}

function bindSystemThemeListener(): void {
  if (window.__siteSystemThemeBound) {
    return;
  }

  window.__siteSystemThemeBound = true;

  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", (event) => {
    const userTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (userTheme === "system" || !userTheme) {
      applyTheme(event.matches);
    }
  });
}

function bindScrollListener(): void {
  if (window.__siteScrollBound) {
    return;
  }

  window.__siteScrollBound = true;
  document.addEventListener("scroll", onScroll, { passive: true });
}

export function initSite(): void {
  applyStoredTheme();
  bindNavigationButtons();
  bindThemeButtons();
  bindSystemThemeListener();
  bindScrollListener();
  bindArticleImages();
  bindPhotoCollection();
  animateIn();
  onScroll();
}
