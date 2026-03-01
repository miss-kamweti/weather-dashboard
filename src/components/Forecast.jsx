import React from 'react';
import { motion } from 'framer-motion';
import {
  WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog
} from 'react-icons/wi';

const getWeatherIcon = (condition) => {
  switch (condition?.toLowerCase()) {
    case 'clear': return <WiDaySunny />;
    case 'clouds': return <WiCloudy />;
    case 'rain': case 'drizzle': return <WiRain />;
    case 'snow': return <WiSnow />;
    case 'thunderstorm': return <WiThunderstorm />;
    default: return <WiFog />;
  }
};

const Forecast = ({ data, unit }) => {
  if (!data) return null;

  return (
    <div className="space-y-4">
      {data.map((day, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-all cursor-default group"
        >
          <div className="flex items-center gap-4">
            <span className="data-label w-12">{index === 0 ? 'Today' : day.date.split('/')[0] + '/' + day.date.split('/')[1]}</span>
            <div className="text-2xl neon-blue group-hover:scale-110 transition-transform">
              {getWeatherIcon(day.condition)}
            </div>
          </div>
          <div className="flex gap-4 items-baseline">
            <span className="text-white font-black">{Math.round(day.tempMax)}°</span>
            <span className="text-white/20 text-xs font-mono">{Math.round(day.tempMin)}°</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default Forecast;