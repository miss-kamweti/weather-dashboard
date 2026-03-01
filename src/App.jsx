import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { motion } from 'framer-motion';
import {
  FiRefreshCw, FiActivity, FiGlobe, FiDatabase, FiCpu,
  FiClock, FiStar, FiZap, FiNavigation, FiAlertCircle
} from 'react-icons/fi';
import SearchBar from './components/SearchBar';
import Forecast from './components/Forecast';
import RecentSearches from './components/RecentSearches';
import Favorites from './components/Favorites';
import UnitToggle from './components/UnitToggle';
import LoadingSpinner from './components/LoadingSpinner';
import { fetchWeatherData, fetchForecastData } from './services/weatherService';
import { getRecentSearches, addRecentSearch, getFavorites, addFavorite, removeFavorite } from './utils/storage';
import './App.css';

const StatWidget = ({ label, value, unit, color, percentage }) => (
  <div className="space-y-2 group">
    <div className="flex justify-between items-end">
      <span className="data-label group-hover:text-white transition-colors">{label}</span>
      <span className="text-sm font-black text-white">
        {value ?? '--'} <span className="text-[10px] text-white/40 font-mono">{unit}</span>
      </span>
    </div>
    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: `${(percentage || 0) - 100}%` }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ backgroundColor: color, boxShadow: `0 0 8px ${color}` }}
      />
    </div>
  </div>
);

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [unit, setUnit] = useState('metric');

  useEffect(() => {
    setRecentSearches(getRecentSearches());
    setFavorites(getFavorites());
    performSearch('Nairobi', false);
  }, []);

  const performSearch = async (city, updateRecent = true) => {
    if (!city || !city.trim()) return;
    setLoading(true);
    setError(null);
    try {
      const [weather, forecast] = await Promise.all([
        fetchWeatherData(city, unit),
        fetchForecastData(city, unit),
      ]);
      setWeatherData(weather);
      setForecastData(forecast);
      if (updateRecent) {
        addRecentSearch(city);
        setRecentSearches(getRecentSearches());
      }
    } catch (err) {
      const msg = err.message || 'Failed to fetch weather data';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleUnitToggle = (newUnit) => {
    setUnit(newUnit);
    if (weatherData) {
      performSearch(weatherData.name, false);
    }
  };

  const handleToggleFavorite = () => {
    if (!weatherData) return;
    const isFav = favorites.some((f) => f.toLowerCase() === weatherData.name.toLowerCase());
    if (isFav) {
      const updated = removeFavorite(weatherData.name);
      setFavorites(updated);
      toast('Removed from favorites');
    } else {
      const updated = addFavorite(weatherData.name);
      setFavorites(updated);
      toast.success('Saved to favorites!');
    }
  };

  const isFavorite = weatherData
    ? favorites.some((f) => f.toLowerCase() === weatherData.name.toLowerCase())
    : false;

  return (
    <div className="min-h-screen bg-[#05070a] text-slate-300 overflow-x-hidden relative">
      {/* Background wave effect */}
      <div className="bg-waves pointer-events-none" />

      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { background: '#0a0f18', color: '#fff', border: '1px solid rgba(255,255,255,0.08)' },
        }}
      />

      <main className="max-w-[1600px] mx-auto p-4 md:p-8 relative z-10">
        {/* ── HEADER ── */}
        <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-10 gap-6">
          <div className="flex items-center gap-5">
            <div className="h-14 w-14 bg-[#00f2ff]/10 border border-[#00f2ff]/20 rounded-2xl flex items-center justify-center neon-blue text-2xl">
              <FiZap />
            </div>
            <div>
              <h1 className="text-2xl font-black text-white tracking-widest flex items-center gap-3">
                SKYCAST_OS{' '}
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/30 font-bold uppercase tracking-[0.2em]">
                  v2.4.0
                </span>
              </h1>
              <p className="data-label">Real-time Environmental Monitoring Dashboard</p>
            </div>
          </div>

          <div className="flex items-center gap-3 bg-white/5 p-2 rounded-2xl border border-white/5 backdrop-blur-xl">
            <UnitToggle unit={unit} onToggle={handleUnitToggle} />
            <div className="w-px h-8 bg-white/10 mx-1" />
            <button
              onClick={() => weatherData && performSearch(weatherData.name, false)}
              className="p-3 rounded-xl hover:bg-white/5 transition-all text-white/40 hover:text-[#00f2ff]"
              title="Refresh"
            >
              <FiRefreshCw className={loading ? 'animate-spin' : ''} />
            </button>
          </div>
        </header>

        {/* ── MAIN GRID ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* LEFT: Telemetry + Favorites */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            <div className="glass-panel p-6">
              <div className="scanline" />
              <h3 className="data-label mb-6 flex items-center gap-2">
                <FiActivity className="neon-blue" /> Sensor_Telemetry
              </h3>
              <div className="space-y-5">
                <StatWidget label="Pressure" value={weatherData?.main?.pressure} unit="hPa" color="#fbbf24" percentage={75} />
                <StatWidget label="Humidity" value={weatherData?.main?.humidity} unit="%" color="#00f2ff" percentage={weatherData?.main?.humidity ?? 0} />
                <StatWidget
                  label="Visibility"
                  value={weatherData ? (weatherData.visibility / 1000).toFixed(1) : null}
                  unit="km"
                  color="#10b981"
                  percentage={weatherData ? Math.min((weatherData.visibility / 10000) * 100, 100) : 0}
                />
                <StatWidget label="Clouds" value={weatherData?.clouds?.all} unit="%" color="#f87171" percentage={weatherData?.clouds?.all ?? 0} />
              </div>
            </div>

            <div className="glass-panel p-6 flex-grow">
              <h3 className="data-label mb-4">Network_Favorites</h3>
              <Favorites
                favorites={favorites}
                onSelect={(city) => performSearch(city)}
                onRemove={(city) => setFavorites(removeFavorite(city))}
              />
              <div className="mt-6 border-t border-white/5 pt-6">
                <h3 className="data-label mb-4">Command_History</h3>
                <RecentSearches searches={recentSearches} onSelect={(city) => performSearch(city)} />
              </div>
            </div>
          </aside>

          {/* CENTRE: Main Display + Mini Widgets */}
          <section className="lg:col-span-6 flex flex-col gap-6">
            {/* Main Card */}
            <div className="glass-panel p-8 flex flex-col min-h-[420px]">
              {error ? (
                <div className="flex-grow flex flex-col items-center justify-center gap-4 text-center">
                  <FiAlertCircle className="text-5xl text-red-400" />
                  <p className="data-label text-red-400 max-w-xs">{error}</p>
                  <button
                    onClick={() => performSearch('Nairobi', false)}
                    className="mt-4 px-6 py-2 bg-white/5 border border-white/10 rounded-xl data-label hover:bg-white/10 transition-all"
                  >
                    Reset
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <h2 className="text-4xl font-black text-white tracking-tighter flex items-center gap-3">
                        {loading ? '...' : weatherData?.name || 'Awaiting_Target'}
                        {weatherData && (
                          <button
                            onClick={handleToggleFavorite}
                            className="text-xl transition-all"
                            title={isFavorite ? 'Remove from favorites' : 'Save to favorites'}
                          >
                            <FiStar className={isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-white/20 hover:text-yellow-400'} />
                          </button>
                        )}
                      </h2>
                      <p className="data-label mt-1">
                        ID: {weatherData?.id ?? '0000'} // COORDS: {weatherData?.coord?.lat ?? '0.0000'},{' '}
                        {weatherData?.coord?.lon ?? '0.0000'}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-6xl neon-blue font-black tracking-tighter leading-none">
                        {weatherData ? Math.round(weatherData.main.temp) : '--'}°{unit === 'metric' ? 'C' : 'F'}
                      </div>
                      <p className="data-label mt-2 capitalize">
                        {weatherData?.weather[0]?.description ?? 'Scanning...'}
                      </p>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="flex-grow flex items-end gap-1 px-2 mb-3" style={{ minHeight: 160 }}>
                    {loading ? (
                      <div className="w-full flex items-center justify-center">
                        <LoadingSpinner />
                      </div>
                    ) : (
                      [40, 60, 45, 80, 55, 90, 70, 85, 60, 75].map((h, i) => (
                        <motion.div
                          key={i}
                          initial={{ height: 0 }}
                          animate={{ height: `${h}%` }}
                          transition={{ delay: i * 0.08, duration: 0.8 }}
                          className="w-full rounded-t bg-gradient-to-t from-blue-500/10 to-[#00f2ff]/40 border-t border-[#00f2ff]/30"
                          style={{ minWidth: 0 }}
                        />
                      ))
                    )}
                  </div>
                  <div className="flex justify-between data-label px-2">
                    {['00:00', '06:00', '12:00', '18:00', '23:59'].map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Wind + Feels Like row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="glass-panel p-6">
                <h3 className="data-label mb-3">Wind_Vector</h3>
                <div className="text-3xl font-black text-white mb-4">
                  {weatherData?.wind?.speed ?? 0} <span className="text-sm text-white/40">{unit === 'metric' ? 'm/s' : 'mph'}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((weatherData?.wind?.speed ?? 0) / 30, 1) * 100}%` }}
                    transition={{ duration: 1.4 }}
                    className="h-full bg-emerald-400"
                    style={{ boxShadow: '0 0 6px #10b981' }}
                  />
                </div>
              </div>
              <div className="glass-panel p-6">
                <h3 className="data-label mb-3">Thermal_Index</h3>
                <div className="text-3xl font-black text-white mb-4">
                  {weatherData ? Math.round(weatherData.main.feels_like) : '--'}°
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[3, 7, 4, 9, 2, 6, 8, 5].map((v, i) => (
                    <div
                      key={i}
                      className="bg-orange-400/30 border-t border-orange-400/50 w-full rounded-t"
                      style={{ height: `${v * 10}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* RIGHT: Search + Forecast */}
          <aside className="lg:col-span-3 flex flex-col gap-6">
            <div className="glass-panel p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="data-label flex items-center gap-2">
                  <FiNavigation className="neon-blue" /> Search_Console
                </h3>
                <FiGlobe className="text-white/20 animate-pulse" />
              </div>
              <SearchBar onSearch={(city) => performSearch(city)} loading={loading} />
              <p className="data-label mt-6 opacity-40 italic">Awaiting terminal input...</p>
            </div>

            <div className="glass-panel p-6 flex-grow">
              <h3 className="data-label mb-6 flex items-center gap-2">
                <FiClock /> Forecast_Batch
              </h3>
              {forecastData ? (
                <Forecast data={forecastData} unit={unit} />
              ) : (
                <p className="data-label opacity-30 italic">No forecast data</p>
              )}
            </div>
          </aside>
        </div>

        {/* ── FOOTER ── */}
        <footer className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-8">
            <span className="flex items-center gap-2 data-label">
              <FiDatabase className="text-white/20" /> Source: OpenWeatherMap_API_V2.5
            </span>
            <span className="flex items-center gap-2 data-label">
              <FiCpu className="text-white/20" /> Engine: React_Vite_TailwindCSS
            </span>
          </div>
          <p className="font-['Fira_Code'] text-[11px] font-bold text-white/30 tracking-widest">
            2026 // SKYCAST_DASHBOARD_PROTOCOL_V.4
          </p>
        </footer>
      </main>
    </div>
  );
}

export default App;