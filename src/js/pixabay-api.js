import axios from 'axios';

let currentPage = 1;
const perPage = 15;
const API_KEY = '45065033-34b48c3d2ea0e7ba665d8e642'; // Get API key from environment variable

export async function fetchImages(query) {
  if (!query) {
    throw new Error('Search query is required');
  }

  try {
    const response = await axios.get('https://api.pixabay.com/api/', {
      params: {
        key: API_KEY,
        q: query,
        page: currentPage,
        per_page: perPage,
      },
    });

    const data = response.data;
    currentPage++; // Increment page number for next request

    return data; // Return the entire data object
  } catch (error) {
    console.error('Error fetching images:', error);
    throw error; // Propagate error for further handling
  }
}
