const RECENT_SEARCHES_KEY = 'weather_recent_searches';
const MAX_RECENT_SEARCHES = 5;

export const getRecentSearches = () => {
  try {
    const searches = localStorage.getItem(RECENT_SEARCHES_KEY);
    return searches ? JSON.parse(searches) : [];
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

export const addRecentSearch = (city) => {
  try {
    const searches = getRecentSearches();

    // Remove if already exists
    const filtered = searches.filter(s => s.toLowerCase() !== city.toLowerCase());

    // Add to beginning
    const updated = [city, ...filtered].slice(0, MAX_RECENT_SEARCHES);

    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving to localStorage:', error);
    return [];
  }
};

const FAVORITES_KEY = 'weather_favorites';

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error reading favorites:', error);
    return [];
  }
};

export const addFavorite = (city) => {
  try {
    const favorites = getFavorites();
    if (favorites.some(f => f.toLowerCase() === city.toLowerCase())) return favorites;
    const updated = [...favorites, city];
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error saving favorite:', error);
    return [];
  }
};

export const removeFavorite = (city) => {
  try {
    const favorites = getFavorites();
    const updated = favorites.filter(f => f.toLowerCase() !== city.toLowerCase());
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
    return updated;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return [];
  }
};

export const clearRecentSearches = () => {
  localStorage.removeItem(RECENT_SEARCHES_KEY);
  return [];
};