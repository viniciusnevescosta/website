type ViewerPhoto = {
  url: string;
  alt: string;
};

declare global {
  interface Window {
    openPhotoViewer?: (photos: ViewerPhoto[], index?: number) => void;
  }
}

const BUTTON_SELECTOR = "[data-photo-item]";

function openViewer(photos: ViewerPhoto[], index: number) {
  if (!window.openPhotoViewer || photos.length === 0) {
    return;
  }

  window.openPhotoViewer(photos, index);
}

function getButtons(root: ParentNode) {
  return Array.from(root.querySelectorAll<HTMLButtonElement>(BUTTON_SELECTOR));
}

function getPhotosFromButtons(buttons: HTMLButtonElement[]): ViewerPhoto[] {
  return buttons.map((button, index) => ({
    url: button.dataset.photoUrl ?? "",
    alt: button.dataset.photoAlt ?? button.getAttribute("aria-label") ?? `Photo ${index + 1}`,
  }));
}

function getButtonIndex(button: HTMLButtonElement, buttons: HTMLButtonElement[]) {
  return buttons.indexOf(button);
}

function handleCollectionActivate(container: ParentNode, target: EventTarget | null) {
  const button =
    target instanceof Element ? target.closest<HTMLButtonElement>(BUTTON_SELECTOR) : null;

  if (!button) {
    return;
  }

  const buttons = getButtons(container);
  const index = getButtonIndex(button, buttons);

  if (index < 0) {
    return;
  }

  openViewer(getPhotosFromButtons(buttons), index);
}

export function bindPhotoCollection(root: ParentNode = document) {
  const collections = Array.from(root.querySelectorAll<HTMLElement>("[data-photo-collection]"));

  collections.forEach((collection) => {
    if (collection.dataset.photoCollectionBound === "true") {
      return;
    }

    collection.dataset.photoCollectionBound = "true";

    collection.addEventListener("click", (event) => {
      const target = event.target;

      if (!(target instanceof Element) || !target.closest(BUTTON_SELECTOR)) {
        return;
      }

      event.preventDefault();
      handleCollectionActivate(collection, target);
    });

    collection.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element) || !target.closest(BUTTON_SELECTOR)) {
        return;
      }

      event.preventDefault();
      handleCollectionActivate(collection, target);
    });
  });
}

export function bindArticleImages(root: ParentNode = document) {
  const articles = Array.from(root.querySelectorAll<HTMLElement>("article[data-photo-gallery]"));

  articles.forEach((article) => {
    const images = Array.from(article.querySelectorAll<HTMLImageElement>("img"));

    images.forEach((image, index) => {
      if (image.closest(BUTTON_SELECTOR)) {
        return;
      }

      const button = document.createElement("button");
      const alt = image.alt || `Image ${index + 1}`;

      button.type = "button";
      button.dataset.photoItem = "true";
      button.dataset.photoUrl = image.currentSrc || image.src;
      button.dataset.photoAlt = alt;
      button.className =
        "photo-item cursor-pointer focus:outline-none focus:ring-2 focus:ring-black/20 dark:focus:ring-white/30 rounded-lg group block w-full";
      button.setAttribute("aria-label", `View image: ${alt}`);

      image.parentNode?.insertBefore(button, image);
      button.appendChild(image);
      image.classList.add("group-hover:scale-[1.02]", "transition-transform", "duration-300");
    });

    if (article.dataset.photoGalleryBound === "true") {
      return;
    }

    article.dataset.photoGalleryBound = "true";

    article.addEventListener("click", (event) => {
      const target = event.target;

      if (!(target instanceof Element) || !target.closest(BUTTON_SELECTOR)) {
        return;
      }

      event.preventDefault();
      handleCollectionActivate(article, target);
    });

    article.addEventListener("keydown", (event) => {
      if (event.key !== "Enter" && event.key !== " ") {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element) || !target.closest(BUTTON_SELECTOR)) {
        return;
      }

      event.preventDefault();
      handleCollectionActivate(article, target);
    });
  });
}
