import axios from 'axios';

export async function fetchImages(query) {
  const apiKey = '45065033-34b48c3d2ea0e7ba665d8e642';
  const params = {
    key: apiKey,

    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  };

  try {
    const response = await axios.get('https://pixabay.com/api/', { params });
    return response.data; // Повертаємо дані, які приходять у відповіді
  } catch (error) {
    if (error.response) {
      // Запит був зроблений і сервер відповів з кодом помилки
      switch (error.response.status) {
        case 404:
          throw new Error('Images not found');
        case 500:
          throw new Error('Server error');
        default:
          throw new Error(`Error: ${error.response.status}`);
      }
    } else if (error.request) {
      // Запит був зроблений, але відповіді не отримано
      console.error('Check your internet connection:', error.message);
      alert('Internet connection lost.');
    } else {
      // Щось сталося під час налаштування запиту
      console.error('An error occurred:', error.message);
      alert(error.message);
    }
    return { hits: [] }; // Повертаємо порожній масив при помилці
  }
}
