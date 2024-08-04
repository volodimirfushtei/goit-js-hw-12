'use strict';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export function renderImages(images) {
  const imageContainer = document.getElementById('image-container');
  const existingImages = Array.from(
    imageContainer.querySelectorAll('.gallery-link')
  );
  if (images.length > 0) {
    const imageCards = images
      .map(
        image => `
      <li class="gallery-link">
        <a class="card-link" href="${image.largeImageURL}" data-lightbox="gallery" data-title="${image.tags}">
          <div class="card">
          <div id="loader" class="loader" aria-live="polite" role="status"></div>
            <img class="image" src="${image.webformatURL}" alt="${image.tags}">
            <div class="card-points">
              <div class="card-text"><p>Likes: ${image.likes}</p></div>
              <div class="card-text"><p>Views: ${image.views}</p></div>
              <div class="card-text"><p>Comments: ${image.comments}</p></div>
              <div class="card-text"><p>Downloads: ${image.downloads}</p></div>
            </div>
          </div>
        </a>
      </li>
    `
      )
      .join('');
    imageContainer.innerHTML += imageCards;
    const lightbox = new SimpleLightbox('[data-lightbox="gallery"]');
    lightbox.refresh();
  }
  const imagesLoaded = document.querySelectorAll('.image');
  imagesLoaded.forEach(img => {
    img.onload = () => {
      img.previousElementSibling.style.display = 'none'; // Приховати лоадер
    };
  });
}
const AppState = (() => {
  let currentPage = 1;
  let query = '';

  return {
    getCurrentPage: () => currentPage,
    setCurrentPage: page => {
      if (Number.isInteger(page) && page > 0) currentPage = page;
    },
    getQuery: () => query,
    setQuery: newQuery => {
      if (typeof newQuery === 'string') query = newQuery;
    },
    incrementPage: () => (currentPage += 1),
    resetPage: () => {
      currentPage = 1;
    },
  };
})();
export default AppState;
