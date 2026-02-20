import React from 'react';
import { motion } from 'framer-motion';

const WeatherCard = ({ data, darkMode }) => {
  const getWeatherBackground = (condition) => {
    const backgrounds = {
      Clear: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      Clouds: 'bg-gradient-to-r from-gray-400 to-gray-600',
      Rain: 'bg-gradient-to-r from-blue-400 to-blue-700',
      Snow: 'bg-gradient-to-r from-blue-200 to-blue-400',
      Thunderstorm: 'bg-gradient-to-r from-purple-600 to-indigo-900',
      Drizzle: 'bg-gradient-to-r from-blue-300 to-blue-500',
      Mist: 'bg-gradient-to-r from-gray-500 to-gray-700',
    };
    
    return backgrounds[condition] || 'bg-gradient-to-r from-blue-500 to-purple-600';
  };

  const getWeatherIcon = (iconCode) => {
    return `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`rounded-2xl shadow-2xl overflow-hidden ${
        darkMode ? 'dark' : ''
      }`}
    >
      <div className={`${getWeatherBackground(data.weather[0].main)} p-6`}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              {data.name}, {data.sys.country}
            </h2>
            <p className="text-white/90 text-lg">
              {new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
          
          <div className="flex items-center mt-4 md:mt-0">
            <img 
              src={getWeatherIcon(data.weather[0].icon)} 
              alt={data.weather[0].description}
              className="w-24 h-24"
            />
            <div className="text-right">
              <div className="text-6xl font-bold text-white">
                {Math.round(data.main.temp)}°C
              </div>
              <p className="text-white/90 capitalize text-xl">
                {data.weather[0].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-white dark:bg-gray-800">
        <div className="text-center">
          <div className="text-3xl mb-2">💧</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Humidity</div>
          <div className="text-xl font-semibold dark:text-white">
            {data.main.humidity}%
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-2">💨</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Wind Speed</div>
          <div className="text-xl font-semibold dark:text-white">
            {data.wind.speed} m/s
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-2">🌡️</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Feels Like</div>
          <div className="text-xl font-semibold dark:text-white">
            {Math.round(data.main.feels_like)}°C
          </div>
        </div>
        
        <div className="text-center">
          <div className="text-3xl mb-2">☁️</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">Pressure</div>
          <div className="text-xl font-semibold dark:text-white">
            {data.main.pressure} hPa
          </div>
        </div>
      </div>

      <div className="flex justify-between p-4 bg-gray-50 dark:bg-gray-700">
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Sunrise:</span> {formatTime(data.sys.sunrise)}
        </div>
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <span className="font-semibold">Sunset:</span> {formatTime(data.sys.sunset)}
        </div>
      </div>
    </motion.div>
  );
};

export default WeatherCard;