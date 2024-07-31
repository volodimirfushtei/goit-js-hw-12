import iconErr2 from './img/bi_x-octagon.svg';
import iconErr1 from './img/closebi_x-lg.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';

const formElement = document.querySelector('#search-form');
const loader = document.getElementById('loader');
const loadButton = document.getElementById('loadButton');
const imageContainer = document.getElementById('image-container');

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
    currentPage = 1; // Reset page for new query
    clearGallery();

    try {
      const data = await fetchImages(query, currentPage, perPage);

      if (data.length > 0) {
        renderImages(data);

        loadButton.style.display = 'block'; // Show load button
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
      scrollPage();
      currentPage++;
      loadButton.style.display = 'block'; // Show load button
    } else {
      loadButton.style.display = 'none';

      showToastWithIconAtEnd(
        "We're sorry, but you've reached the end of search results.",
        iconErr1,
        3000
      );
      // Hide button if no more images
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    loadButton.textContent = 'Failed to load more';
  }
}

formElement.addEventListener('submit', handleSearch);
loadButton.addEventListener('click', loadImages);

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
