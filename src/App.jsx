import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';
import ThemeToggle from './components/ThemeToggle';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData, fetchForecastData } from './services/weatherService';
import { getRecentSearches, addRecentSearch } from './utils/storage';
import useGeolocation from './hooks/useGeolocation';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  
  const { location, error: geoError, getLocation } = useGeolocation();

  // Load recent searches from localStorage on mount
  useEffect(() => {
    const searches = getRecentSearches();
    setRecentSearches(searches);
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Auto-detect location on first load
  useEffect(() => {
    if (location) {
      handleCitySearch(`${location.city},${location.country}`);
    }
  }, [location]);

  // Auto-refresh every 10 minutes
  useEffect(() => {
    if (!weatherData) return;
    
    const interval = setInterval(() => {
      handleCitySearch(weatherData.name);
    }, 600000); // 10 minutes
    
    return () => clearInterval(interval);
  }, [weatherData]);

  const handleCitySearch = async (city) => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherData(city),
        fetchForecastData(city)
      ]);
      
      setWeatherData(weather);
      setForecastData(forecast);
      
      // Save to recent searches
      const updatedSearches = addRecentSearch(city);
      setRecentSearches(updatedSearches);
      
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    if (weatherData) {
      handleCitySearch(weatherData.name);
    }
  };

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      darkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-400 to-blue-600'
    }`}>
      <Toaster position="top-right" />
      
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <header className="flex justify-between items-center mb-8 animate-fade-in">
          <div>
            <h1 className={`text-4xl font-bold ${
              darkMode ? 'text-white' : 'text-white'
            }`}>
              🌤️ Weather Dashboard
            </h1>
            <p className={`mt-2 ${
              darkMode ? 'text-gray-300' : 'text-white/90'
            }`}>
              Real-time weather monitoring with 7-day forecast
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
            {weatherData && (
              <button
                onClick={handleRefresh}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                aria-label="Refresh"
              >
                🔄
              </button>
            )}
          </div>
        </header>

        {/* Geolocation error message */}
        {geoError && (
          <div className="mb-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 rounded-lg">
            {geoError}. <button onClick={getLocation} className="underline">Try again</button>
          </div>
        )}

        {/* Main content */}
        <div className="grid gap-8">
          {/* Search section */}
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 animate-slide-up">
            <SearchBar onSearch={handleCitySearch} loading={loading} />
            <RecentSearches 
              searches={recentSearches} 
              onSelect={handleCitySearch}
            />
          </div>

          {/* Error display */}
          {error && <ErrorMessage message={error} />}

          {/* Loading state */}
          {loading && <LoadingSpinner />}

          {/* Weather display */}
          {weatherData && !loading && (
            <div className="space-y-6 animate-fade-in">
              <WeatherCard 
                data={weatherData} 
                darkMode={darkMode}
              />
              
              {forecastData && (
                <Forecast 
                  data={forecastData} 
                  darkMode={darkMode}
                />
              )}
            </div>
          )}

          {/* Empty state */}
          {!weatherData && !loading && !error && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-xl">
              <div className="text-6xl mb-4">🔍</div>
              <h2 className={`text-2xl font-semibold mb-2 ${
                darkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Search for a city
              </h2>
              <p className={darkMode ? 'text-gray-400' : 'text-gray-600'}>
                Enter a city name to get current weather and forecast
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className={`mt-12 text-center ${
          darkMode ? 'text-gray-400' : 'text-white/80'
        }`}>
          <p>Data provided by OpenWeatherMap • Updates every 10 minutes</p>
          <p className="text-sm mt-2">
            © 2026 Weather Dashboard • Made with React & Tailwind CSS
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;