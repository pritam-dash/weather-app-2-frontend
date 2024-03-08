import React, { useState, useEffect } from 'react'
import WeatherForm from '../components/WeatherForm';
import WeatherInfo from '../components/WeatherInfo';
import Grid from '@mui/material/Grid';
import { Typography } from '@mui/material';

const Home = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchCurrentLocationWeather = async () => {
      try {
        const position = await getCurrentLocation();
        const { latitude, longitude } = position.coords;
        const response = await fetch(`https://weather-app-2-backend.onrender.com/weather?latitude=${latitude}&longitude=${longitude}`);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchCurrentLocationWeather();
  }, []);

  const getCurrentLocation = () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error('Geolocation is not supported by this browser'));
      }
    });
  };


  const fetchWeatherData = async (location) => {
    try {
      if(location){
      const response = await fetch(`https://weather-app-2-backend.onrender.com/weather?location=${location}`);
      const data = await response.json();
      setWeatherData(data);
      }
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

return (
  <Grid container direction="column" alignItems="center" justifyContent="center" className="h-screen">
    <Grid item style={{ margin: '1rem' }}>
      <Typography variant="h4" style={{ fontWeight: 'bold' }}>Weather Application</Typography>
    </Grid>
    <Grid item>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <WeatherForm fetchWeatherData={fetchWeatherData} setLocation={setLocation} />
        </Grid>
        <Grid item>
          {weatherData && <WeatherInfo weatherData={weatherData} setLocation={setLocation} fetchWeatherData={fetchWeatherData} />}
        </Grid>
      </Grid>
    </Grid>
  </Grid>
);
  
}

export default Home