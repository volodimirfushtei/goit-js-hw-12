import iconErr2 from './img/bi_x.svg';
import iconErr1 from './img/close.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
import AppState from './js/render-functions.js';

const formElement = document.querySelector('#search-form');
const loader = document.getElementById('loader');
const loadButton = document.getElementById('loadButton');
const searchButton = document.querySelector('.submit');
const imageContainer = document.getElementById('image-container');
const inputSearch = document.getElementById('search-input');

// Нові елементи для відображення загальної кількості переглядів та поточної сторінки
const totalHitsElement = document.getElementById('total-hits');
const currentPageElement = document.getElementById('current-page');

const perPage = 15;

function showToastWithIconAtEnd(message, iconUrl, timeout = 3000) {
  iziToast.show({
    position: 'topRight',
    message,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    messageSize: '16',
    maxWidth: 432,
    iconUrl: iconErr2,
    timeout,
    class: 'iziToast-custom',
    onOpening: (instance, toast) => {
      const iconElement = document.createElement('div');
      iconElement.className = 'custom-icon';
      iconElement.style.backgroundImage = `url(${iconUrl})`;
      toast.querySelector('.iziToast-message').appendChild(iconElement);
    },
  });
}

function updateInfo(totalHits, currentPage) {
  totalHitsElement.innerText = `Total Hits: ${totalHits}`;
  currentPageElement.innerText = `Current Page: ${currentPage}`;
}

async function handleSearch(event) {
  event.preventDefault();
  const query = document.querySelector('#search-input').value.trim();
  AppState.setQuery(query);
  AppState.resetPage();
  if (query) {
    searchButton.removeEventListener('click', handleSearch);
    loadButton.removeEventListener('click', loadImages);
    clearGallery();

    try {
      const { hits, totalHits } = await fetchImages(
        AppState.getQuery(),
        AppState.getCurrentPage(),
        perPage
      );

      if (hits.length > 0) {
        renderImages(hits);
        loadButton.style.display = 'block';
        loadButton.addEventListener('click', loadImages);
        updateInfo(totalHits, AppState.getCurrentPage()); // Оновлення інформації

        if (hits.length >= totalHits) {
          loadButton.style.display = 'none';
          showToastWithIconAtEnd(
            "We're sorry, but you've reached the end of search results.",
            iconErr1,
            3000
          );
        }
      } else {
        NoImagesFound();
      }
    } catch (error) {
      console.error('Error searching images:', error);
      showToastWithIconAtEnd(error.message, iconErr1, 3000);
      clearGallery();
    }
  } else {
    NoImagesFound();
  }

  formElement.reset();
}

function NoImagesFound() {
  showToastWithIconAtEnd(
    'Sorry, there are no images matching your search query. Please try again!',
    iconErr1,
    3000
  );
  clearGallery();
  loadButton.style.display = 'none';
}

function clearGallery() {
  imageContainer.innerHTML = '';
}

async function loadImages() {
  AppState.incrementPage();
  console.log('Loading images...');
  console.log('Current page:', AppState.getCurrentPage());
  try {
    const { hits, totalHits } = await fetchImages(
      AppState.getQuery(),
      AppState.getCurrentPage(),
      perPage
    );

    console.log('Fetched hits:', hits);
    console.log('Total hits:', totalHits);

    if (hits.length > 0) {
      renderImages(hits);
      setTimeout(scrollPage, 500);

      updateInfo(totalHits, AppState.getCurrentPage()); // Оновлення інформації

      if (AppState.getCurrentPage() * perPage >= totalHits) {
        loadButton.style.display = 'none';
        showToastWithIconAtEnd(
          "We're sorry, but you've reached the end of search results.",
          iconErr1,
          3000
        );
        loadButton.removeEventListener('click', loadImages);
      } else {
        loadButton.style.display = 'block';
      }
    } else {
      loadButton.style.display = 'none';
      showToastWithIconAtEnd(
        "We're sorry, but you've reached the end of search results.",
        iconErr1,
        3000
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    loadButton.removeEventListener('click', loadImages);
  }
}

formElement.addEventListener('submit', handleSearch);

function getCardHeight() {
  const card = document.querySelector('.card');
  if (card) {
    const cardRect = card.getBoundingClientRect();
    return cardRect.height;
  }
  return 0;
}

function scrollPage() {
  const cardHeight = getCardHeight();
  if (cardHeight > 0) {
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth',
    });
  }
}

inputSearch.addEventListener('blur', () => {
  inputSearch.style.border = inputSearch.value
    ? '4px solid green'
    : '4px solid red';
});
