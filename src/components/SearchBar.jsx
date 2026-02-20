import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import { motion } from 'framer-motion';

const SearchBar = ({ onSearch, loading }) => {
  const [city, setCity] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const popularCities = ['Nairobi', 'London', 'New York', 'Tokyo', 'Paris', 'Sydney'];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      onSearch(city);
      setCity('');
      setSuggestions([]);
    }
  };

  // Simulated autocomplete (would connect to a real API in production)
  const handleInputChange = (e) => {
    const value = e.target.value;
    setCity(value);
    
    if (value.length > 2) {
      // This is a simplified example - use a real geocoding API for production
      const mockSuggestions = popularCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <input
              type="text"
              value={city}
              onChange={handleInputChange}
              placeholder="Search for a city (e.g., Nairobi, London, Tokyo)"
              className="w-full px-4 py-3 pl-12 pr-4 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 transition-all"
              disabled={loading}
            />
            <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 text-xl" />
            
            {/* Autocomplete suggestions */}
            {suggestions.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700"
              >
                {suggestions.map((suggestion, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => {
                      onSearch(suggestion);
                      setCity('');
                      setSuggestions([]);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg dark:text-white"
                  >
                    {suggestion}
                  </button>
                ))}
              </motion.div>
            )}
          </div>
          
          <button
            type="submit"
            disabled={loading || !city.trim()}
            className={`px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold transition-all ${
              loading || !city.trim()
                ? 'opacity-50 cursor-not-allowed'
                : 'hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
            }`}
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {/* Popular cities quick search */}
      <div className="mt-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Popular:</p>
        <div className="flex flex-wrap gap-2">
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => onSearch(city)}
              disabled={loading}
              className="px-3 py-1 text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors shadow-sm"
            >
              {city}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchBar;