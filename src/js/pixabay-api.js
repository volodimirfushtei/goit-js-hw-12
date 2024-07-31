import axios from 'axios';

export async function fetchImages(query, currentPage = 1, perPage = 15) {
  const API_KEY = '45065033-34b48c3d2ea0e7ba665d8e642';
  const url = 'https://pixabay.com/api/';

  const params = {
    key: API_KEY,
    q: encodeURIComponent(query),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: perPage,
  };

  try {
    const response = await axios.get(url, { params });
    return response.data.hits; // Повертаємо тільки зображення (hits)
  } catch (error) {
    if (error.response) {
      // Запит був зроблений, і сервер відповів кодом статусу, що виходить за межі діапазону 2xx
      switch (error.response.status) {
        case 404:
          console.error('Images not found.');
          break;
        case 500:
          console.error('Server error. Please try again later.');
          break;
        default:
          console.error(`Unexpected error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Запит був зроблений, але відповіді не отримано
      console.error('No response received from the server.');
    } else {
      // Щось сталося при налаштуванні запиту
      console.error('Error setting up the request:', error.message);
    }
    return []; // Повертаємо порожній масив у разі помилки
  }
}
