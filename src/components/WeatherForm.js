import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

function WeatherForm({ fetchWeatherData }) {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData(location);
    setLocation('');
  };
return (
  <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center h-screen">
    <Grid container direction="column" spacing={2} alignItems="center">
      <Grid item>
        <TextField 
          type="text" 
          label="Enter city" 
          variant="outlined" 
          value={location} 
          onChange={(e) => setLocation(e.target.value)} 
          className="mb-4"
        />
      </Grid>
      <Grid item>
        <Button variant="contained" color="primary" type="submit">
          Get Weather
        </Button>
      </Grid>
    </Grid>
  </form>
);
}

export default WeatherForm;
