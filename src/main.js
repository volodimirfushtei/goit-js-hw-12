import iconErr2 from './img/bi_x-octagon.svg';
import iconErr1 from './img/closebi_x-lg.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const formElement = document.querySelector('#search-form');
const loader = document.getElementById('loader');
const loadButton = document.getElementById('loadButton');
const searchButton = document.querySelector('.submit');
const imageContainer = document.getElementById('image-container');
const inputSearch = document.getElementById('search-input');
let query = '';
let currentPage = 1;
const perPage = 15; // Number of images per page

function showToastWithIconAtEnd(message, iconUrl, timeout = 3000) {
  iziToast.show({
    position: 'topRight',
    message: message,
    backgroundColor: '#EF4040',
    messageColor: '#fff',
    messageSize: '16',
    maxWidth: 432,
    iconUrl: iconErr2,
    timeout: timeout,
    class: 'iziToast-custom',
    onOpening: function (instance, toast) {
      const iconElement = document.createElement('div');
      iconElement.className = 'custom-icon';
      iconElement.style.backgroundImage = `url(${iconUrl})`;
      toast.querySelector('.iziToast-message').appendChild(iconElement);
    },
  });
}

async function handleSearch(event) {
  event.preventDefault();
  query = document.querySelector('#search-input').value.trim();

  if (query) {
    if (currentPage === 1) {
      // Reset gallery only if it's a new search
      searchButton.removeEventListener('click', handleSearch);
      loadButton.removeEventListener('click', loadImages);
      clearGallery();
    }

    try {
      const data = await fetchImages(query, currentPage, perPage);

      if (data.length > 0) {
        renderImages(data);
        loadButton.addEventListener('click', loadImages);
        loadButton.style.display = 'block'; // Show load button
      } else if (currentPage === 1) {
        // Only show "No Images Found" on the first page
        NoImagesFound();
      }
    } catch (error) {
      console.error('Error searching images:', error);
      showToastWithIconAtEnd(error.message, iconErr1, 3000);
      if (currentPage === 1) {
        clearGallery();
      }
    }
  } else if (currentPage === 1) {
    // Show "No Images Found" only for empty query
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
}

function clearGallery() {
  imageContainer.innerHTML = '';
}

async function loadImages() {
  try {
    const data = await fetchImages(query, currentPage, perPage);
    if (data.length > 0) {
      renderImages(data);
      setTimeout(scrollPage, 500);
      currentPage++;
      loadButton.addEventListener('click', loadImages);
      loadButton.style.display = 'block'; // Show load button
    } else {
      loadButton.removeEventListener('click', loadImages);
      loadButton.style.display = 'none';
      showToastWithIconAtEnd(
        "We're sorry, but you've reached the end of search results.",
        iconErr1,
        3000
      );
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    loadButton.textContent = 'Failed to load more';
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
// Функція для плавного прокручування сторінки
function scrollPage() {
  const cardHeight = getCardHeight();
  if (cardHeight > 0) {
    // Прокрутка на дві висоти карточки
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth', // Параметр 'smooth' забезпечує плавну анімацію прокрутки
    });
  }
}
inputSearch.addEventListener('blur', () => {
  if (inputSearch.value.length === 0 || !inputSearch.value) {
    inputSearch.style.border = '4px solid red';
  } else {
    inputSearch.style.border = '4px solid green';
  }
});
