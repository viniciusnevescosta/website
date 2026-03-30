const THEME_STORAGE_KEY = "theme";

function withoutTransitions(callback: () => void) {
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
  window.getComputedStyle(css).opacity;
  document.head.removeChild(css);
}

function isSystemDark() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function applyTheme(isDark: boolean) {
  withoutTransitions(() => {
    document.documentElement.classList.toggle("dark", isDark);
  });
}

function applyStoredTheme() {
  const userTheme = localStorage.getItem(THEME_STORAGE_KEY);

  if (userTheme === "light" || userTheme === "dark") {
    applyTheme(userTheme === "dark");
    return;
  }

  applyTheme(isSystemDark());
}

function onScroll() {
  document.documentElement.classList.toggle("scrolled", window.scrollY > 0);
}

function animateIn() {
  const animateElements = document.querySelectorAll<HTMLElement>(".animate");

  animateElements.forEach((element, index) => {
    window.setTimeout(() => {
      element.classList.add("show");
    }, index * 150);
  });
}

function scrollToTop(event: Event) {
  event.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function bindThemeButtons() {
  const lightThemeButton = document.getElementById("light-theme-button");
  const darkThemeButton = document.getElementById("dark-theme-button");
  const systemThemeButton = document.getElementById("system-theme-button");

  lightThemeButton?.addEventListener("click", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    applyTheme(false);
  });

  darkThemeButton?.addEventListener("click", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "dark");
    applyTheme(true);
  });

  systemThemeButton?.addEventListener("click", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "system");
    applyTheme(isSystemDark());
  });
}

function bindNavigationButtons() {
  const backToTop = document.getElementById("back-to-top");
  const backToPrev = document.getElementById("back-to-prev");

  backToTop?.addEventListener("click", scrollToTop);
  backToPrev?.addEventListener("click", (event) => {
    if (window.history.length <= 1) {
      return;
    }

    event.preventDefault();
    window.history.back();
  });
}

function bindSystemThemeListener() {
  const media = window.matchMedia("(prefers-color-scheme: dark)");

  media.addEventListener("change", (event) => {
    const userTheme = localStorage.getItem(THEME_STORAGE_KEY);

    if (userTheme === "system" || !userTheme) {
      applyTheme(event.matches);
    }
  });
}

export function initSite() {
  applyStoredTheme();
  bindNavigationButtons();
  bindThemeButtons();
  bindSystemThemeListener();
  animateIn();
  onScroll();
  document.addEventListener("scroll", onScroll, { passive: true });
}
