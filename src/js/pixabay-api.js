import axios from 'axios';

export async function fetchImages(searchTerm, page = 1, perPage = 15) {
  const API_KEY = '45065033-34b48c3d2ea0e7ba665d8e642';
  const url = `https://pixabay.com/api/?q=${encodeURIComponent(
    searchTerm
  )}&page=${page}&per_page=${perPage}&key=${API_KEY}`;

  if (!searchTerm) {
    throw new Error('Search query is required');
  }

  try {
    const response = await axios.get(url);
    const { hits } = response.data; // Вибираємо тільки зображення (hits) з даних відповіді
    return hits; // Повертаємо масив зображень
  } catch (error) {
    console.error('Error fetching images:', error.message);
    throw error; // Пробросити помилку для подальшої обробки
  }
}
