import React from 'react';
import { motion } from 'framer-motion';

const Forecast = ({ data, darkMode }) => {
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6"
    >
      <h3 className="text-xl font-semibold mb-4 dark:text-white">
        7-Day Forecast
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
        {data.map((day, index) => (
          <div
            key={index}
            className="text-center p-3 rounded-lg bg-gray-50 dark:bg-gray-700 hover:shadow-md transition-shadow"
          >
            <div className="font-semibold dark:text-white mb-2">
              {index === 0 ? 'Today' : getDayName(day.date)}
            </div>
            
            <img
              src={`https://openweathermap.org/img/wn/${day.icon}.png`}
              alt={day.condition}
              className="w-12 h-12 mx-auto"
            />
            
            <div className="mt-2">
              <span className="font-bold dark:text-white">
                {Math.round(day.tempMax)}°
              </span>
              <span className="text-gray-500 dark:text-gray-400 ml-1">
                {Math.round(day.tempMin)}°
              </span>
            </div>
            
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1 capitalize">
              {day.condition}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default Forecast;