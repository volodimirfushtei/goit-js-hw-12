'use strict';
import iconErr2 from './img/bi_x-octagon.svg';
import iconErr1 from './img/closebi_x-lg.svg';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { fetchImages } from './js/pixabay-api.js';
import { renderImages } from './js/render-functions.js';
document.addEventListener('DOMContentLoaded', function () {
  const formElement = document.querySelector('#search-form');
  const loader = document.getElementById('loader');

  formElement.addEventListener('submit', handleSearch);

  function showToastWithIconAtEnd(message, iconUrl, timeout = 3000) {
    iziToast.show({
      position: 'topRight',
      message: message,
      backgroundColor: '#EF4040',
      messageColor: `#fff`,
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

  function handleSearch(event) {
    event.preventDefault();
    const query = document.querySelector('#search-input').value.trim();

    if (query) {
      clearGallery();
      showLoader();
      fetchImages(query)
        .then(data => {
          hideLoader();
          if (data.hits && data.hits.length > 0) {
            renderImages(data.hits);
          } else {
            NoImagesFound();
          }
        })
        .catch(error => {
          hideLoader();
          console.error('Error searching images:', error);
          showToastWithIconAtEnd(error.message, iconErr1, 3000);
          clearGallery();
        });
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
    const imageContainer = document.getElementById('image-container');
    imageContainer.innerHTML = '';
  }
  function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.add('visible');
    } else {
      console.error('Loader not found');
    }
  }

  function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) {
      loader.classList.remove('visible');
    } else {
      console.error('Loader not found');
    }
  }
});
