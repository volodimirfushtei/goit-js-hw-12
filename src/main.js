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
const perPage = 15;
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
  currentPage = 1; // Скидаємо номер сторінки при новому пошуку

  if (query) {
    if (currentPage === 1) {
      // Новий пошук
      searchButton.removeEventListener('click', handleSearch);
      loadButton.removeEventListener('click', loadImages);
      clearGallery();
    }

    try {
      const { hits, totalHits } = await fetchImages(
        query,
        currentPage,
        perPage
      );

      if (hits.length > 0) {
        renderImages(hits);
        loadButton.style.display = 'block';
        loadButton.addEventListener('click', loadImages);
        if (hits.length >= totalHits) {
          loadButton.style.display = 'none';
          showToastWithIconAtEnd(
            "We're sorry, but you've reached the end of search results.",
            iconErr1,
            3000
          );
        }
      } else if (currentPage === 1) {
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
    const { hits, totalHits } = await fetchImages(query, currentPage, perPage);

    if (hits.length > 0) {
      renderImages(hits);
      setTimeout(scrollPage, 500);
      currentPage++;
      loadButton.addEventListener('click', loadImages);
      loadButton.style.display = 'block';
      if (currentPage * perPage >= totalHits) {
        loadButton.style.display = 'none';
        loadButton.removeEventListener('click', loadImages);
        showToastWithIconAtEnd(
          "We're sorry, but you've reached the end of search results.",
          iconErr1,
          3000
        );
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
function scrollPage() {
  const cardHeight = getCardHeight();
  if (cardHeight > 0) {
    // Прокрутка на дві висоти
    window.scrollBy({
      top: 2 * cardHeight,
      behavior: 'smooth',
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
