import axios from 'axios';

export async function fetchImages(query, currentPage = 1, perPage = 15) {
  const API_KEY = '45065033-34b48c3d2ea0e7ba665d8e642';
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
    return response.data.hits;
  } catch (error) {
    handleError(error);
    return [];
  }
}

function handleError(error) {
  if (error.response) {
    switch (error.response.status) {
      case 404:
        console.error('Images not found');
        alert('Images not found');
        break;
      case 500:
        console.error('Server error');
        alert('Server error');
        break;
      default:
        console.error(`Error: ${error.response.status}`);
        alert(`Error: ${error.response.status}`);
    }
  } else if (error.request) {
    console.error('Check your internet connection:');
    alert('Internet connection lost !');
  } else {
    console.error('Error setting up the request:', error.message);
    alert('Error setting up the request');
  }
}
