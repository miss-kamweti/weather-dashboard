import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const useGeolocation = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        });
      });

      // Reverse geocoding to get city name
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&limit=1&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );
      
      const data = await response.json();
      
      if (data && data[0]) {
        setLocation({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
          city: data[0].name,
          country: data[0].country
        });
        toast.success(`Detected location: ${data[0].name}`);
      }
    } catch (err) {
      if (err.code === 1) {
        setError('Please allow location access to auto-detect weather');
      } else if (err.code === 2) {
        setError('Location unavailable. Please try again.');
      } else if (err.code === 3) {
        setError('Location request timed out');
      } else {
        setError('Failed to get your location');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, error, loading, getLocation };
};

export default useGeolocation;