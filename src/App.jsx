import axios from 'axios';
import './index.css'
import SearchBar from './components/SearchBar.jsx';
import WeatherCard from './components/WeatherCard.jsx';
import { useState } from 'react';
import video from './assets/weather-bg.mp4';
function App() { 
  const [weather, setWeather] =useState(null);
  const [loading, setLoading]= useState(false);
  const [error, setError] =useState(null);

  const API_KEY = import.meta.env.VITE_API_KEY;
  const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

  const fetchWeather = async (city) => {
    setLoading(true);
    setError('');
    try {
      const url = `${API_URL}?q=${city}&units=metric&appid=${API_KEY}`;
      const response = await axios.get(url);
      console.log(response.data);
      setWeather(response.data);
    }catch (err){
      if (err.response && err.response.status === 404){
        setError(`City not found. please check the city name and try again.`)
      } else {
        setError('An error occurred while fetching the weather data. Please try again later.');
      }
      setWeather(null);
    }finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-blue-100 relative overflow-hidden p-4 sm:p-6 md:p-8">
        <video className='absolute top-0 left-0 w-full h-full object-cover' autoPlay loop muted>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className='bg-black/60 text-white p-6 sm:p-8 md:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md md:max-w-lg lg:max backdrop-blur-md z-10'>
        <h1 className='text-3xl sm:text-3xl md:text-4xl font-bold text-center mb-6'>Weather App</h1>
       <SearchBar fetchWeather = {fetchWeather} />
       {loading && <p  className='text-center mt-4'>
        Loading...</p>}
       {error && <p className='text-center mt-4 text-red-500'>{error}</p>}
       {weather && <WeatherCard weather={weather} />}
       </div>
       </div>
  );
};

export default App


