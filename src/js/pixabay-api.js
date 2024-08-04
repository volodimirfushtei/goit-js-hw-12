import axios from 'axios';
const API_KEY = '45065033-34b48c3d2ea0e7ba665d8e642';

export async function fetchImages(query, currentPage = 1, perPage = 15) {
  const url = 'https://pixabay.com/api/';

  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: currentPage,
    per_page: perPage,
  };

  try {
    const response = await axios.get(url, { params });
    const { hits, totalHits } = response.data;
    console.log('API response:', hits); // Логування відповіді від API
    console.log('Current page:', currentPage);
    return { hits, totalHits };
  } catch (error) {
    handleError(error);
    return { hits: [], totalHits: 0 };
  }
}

function handleError(error) {
  if (error.response) {
    // Сервер повернув код статусу
    switch (error.response.status) {
      case 404:
        console.error('Images not found');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error(`Error: ${error.response.status}`);
    }
  } else if (error.request) {
    console.error('Check your internet connection:');
  } else {
    console.error('Error setting up request:', error.message);
  }
}
