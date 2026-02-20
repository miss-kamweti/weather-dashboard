import axios from 'axios';
import toast from 'react-hot-toast';

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

if (!API_KEY) {
  console.error('OpenWeatherMap API key is missing!');
}

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        lang: 'en'
      }
    });
    
    return response.data;
  } catch (error) {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          throw new Error('Invalid API key. Please check your configuration.');
        case 404:
          throw new Error(`City "${city}" not found. Please check the spelling.`);
        case 429:
          throw new Error('Too many requests. Please try again later.');
        default:
          throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
      }
    } else if (error.request) {
      throw new Error('Network error. Please check your internet connection.');
    } else {
      throw new Error('An unexpected error occurred.');
    }
  }
};

export const fetchForecastData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: API_KEY,
        units: 'metric',
        cnt: 7,
        lang: 'en'
      }
    });
    
    // Group forecast by day
    const dailyForecast = response.data.list.reduce((acc, item) => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = {
          date,
          temps: [],
          conditions: [],
          icons: []
        };
      }
      acc[date].temps.push(item.main.temp);
      acc[date].conditions.push(item.weather[0].main);
      acc[date].icons.push(item.weather[0].icon);
      return acc;
    }, {});

    return Object.values(dailyForecast).map(day => ({
      date: day.date,
      tempMax: Math.max(...day.temps),
      tempMin: Math.min(...day.temps),
      condition: day.conditions[0],
      icon: day.icons[0]
    }));
  } catch (error) {
    console.error('Error fetching forecast:', error);
    return null;
  }
};