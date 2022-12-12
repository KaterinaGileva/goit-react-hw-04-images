const URL = 'https://pixabay.com/api/';
const KEY = '30239587-3f20dad8b68c1db6bb7cff5e0';
const FILTER = '&image_type=photo&orientation=horizontal&per_page=12';

export const fetchImages = (query, page = 1) => {
  return fetch(`${URL}?q=${query}&page=${page}&key=${KEY}${FILTER}`).then(
    response => response.json()
  );
}