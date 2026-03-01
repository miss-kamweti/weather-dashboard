import React from 'react';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import { WiHumidity, WiStrongWind, WiBarometer, WiThermometer, WiSunrise, WiSunset } from 'react-icons/wi';
import { WiDaySunny, WiCloudy, WiRain, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';

const getWeatherIcon = (condition) => {
  const iconSize = "text-inherit";
  switch (condition?.toLowerCase()) {
    case 'clear': return <WiDaySunny className={iconSize} />;
    case 'clouds': return <WiCloudy className={iconSize} />;
    case 'rain':
    case 'drizzle': return <WiRain className={iconSize} />;
    case 'snow': return <WiSnow className={iconSize} />;
    case 'thunderstorm': return <WiThunderstorm className={iconSize} />;
    case 'mist':
    case 'smoke':
    case 'haze':
    case 'dust':
    case 'fog':
    case 'sand':
    case 'ash':
    case 'squall':
    case 'tornado': return <WiFog className={iconSize} />;
    default: return <WiCloudy className={iconSize} />;
  }
};

const WeatherCard = ({ data, darkMode, unit = 'metric' }) => {
  if (!data) return null;

  const tempUnit = unit === 'metric' ? '°C' : '°F';
  const speedUnit = unit === 'metric' ? 'm/s' : 'mph';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`relative overflow-hidden group border border-white/5 rounded-[3rem] p-10 ${darkMode ? 'bg-slate-900/40' : 'bg-black/20 shadow-2xl backdrop-blur-3xl'}`}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
        <div>
          <div className="flex items-center gap-3 text-white/40 font-mono text-[10px] tracking-[0.3em] uppercase mb-1">
            <FiMapPin className="text-blue-500" /> Sensor_Location
          </div>
          <h1 className="text-5xl font-black text-white tracking-tighter flex items-center gap-3">
            {data.name} <span className="text-xs px-2 py-1 bg-white/5 rounded-lg font-mono text-white/30">{data.coord.lat.toFixed(2)}, {data.coord.lon.toFixed(2)}</span>
          </h1>
          <p className="text-white/30 font-mono text-[10px] tracking-widest uppercase mt-4">
            Status: {data.weather[0].description} // Code: {data.weather[0].id}
          </p>
        </div>
        <div className="text-right">
          <div className="text-blue-500 text-7xl animate-float">
            {getWeatherIcon(data.weather[0].main)}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative z-10">
        <div className="bg-black/40 rounded-[2.5rem] p-10 border border-white/5 flex flex-col justify-center">
          <span className="text-white/20 font-black uppercase tracking-[0.4em] text-[10px] mb-4">Core_Thermals</span>
          <div className="flex items-baseline gap-2">
            <span className="text-8xl font-black text-white tracking-tighter">
              {Math.round(data.main.temp)}
            </span>
            <span className="text-4xl font-light text-blue-500">{tempUnit}</span>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/5">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Feels_Like</span>
              <span className="text-sm font-mono text-white">{Math.round(data.main.feels_like)}{tempUnit}</span>
            </div>
            <div className="bg-white/5 px-4 py-2 rounded-xl border border-white/10 shadow-lg">
              <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest block mb-1">Thermal_Range</span>
              <span className="text-sm font-mono text-white flex gap-3">
                <span className="text-blue-400">L: {Math.round(data.main.temp_min)}°</span>
                <span className="text-orange-400">H: {Math.round(data.main.temp_max)}°</span>
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pb-2">
          <WeatherDetailItem
            icon={<WiHumidity className="text-3xl text-cyan-400" />}
            label="Humidity"
            value={`${data.main.humidity}%`}
            sub="H2O Saturation"
          />
          <WeatherDetailItem
            icon={<WiStrongWind className="text-3xl text-emerald-400" />}
            label="Wind"
            value={`${data.wind.speed} ${speedUnit}`}
            sub={`Vector: ${data.wind.deg}°`}
          />
          <WeatherDetailItem
            icon={<WiBarometer className="text-3xl text-purple-400" />}
            label="Pressure"
            value={`${data.main.pressure}`}
            sub="hPa Ambient"
          />
          <WeatherDetailItem
            icon={<WiThermometer className="text-3xl text-orange-400" />}
            label="Visiblity"
            value={`${(data.visibility / 1000).toFixed(1)} km`}
            sub="Optical Range"
          />
        </div>
      </div>
    </motion.div>
  );
};

const WeatherDetailItem = ({ icon, label, value, sub }) => (
  <div className="bg-black/20 p-6 rounded-3xl border border-white/5 hover:bg-white/10 transition-all group/item shadow-2xl relative overflow-hidden">
    <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full -mr-8 -mt-8"></div>
    <div className="mb-4">{icon}</div>
    <div className="space-y-1">
      <span className="text-white/20 font-black uppercase tracking-[0.2em] text-[10px] block">{label}</span>
      <span className="text-2xl font-black text-white tracking-tight block">{value}</span>
      <span className="text-[9px] font-mono text-white/30 uppercase tracking-widest">{sub}</span>
    </div>
  </div>
);

export default WeatherCard;
