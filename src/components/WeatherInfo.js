import React, { useState } from 'react';
import { Typography, Switch, Grid, Paper, Button, Dialog, DialogTitle, DialogContent, DialogActions, List, ListItem } from '@mui/material';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

function WeatherInfo({ weatherData, setLocation, fetchWeatherData }) {

  const [temperatureUnit, setTemperatureUnit] = useState('celsius');
  const [favoriteLocations, setFavoriteLocations] = useState([]);
  const [openFavoritesDialog, setOpenFavoritesDialog] = useState(false);

  const toggleTemperatureUnit = () => {
    setTemperatureUnit(unit => (unit === 'celsius' ? 'fahrenheit' : 'celsius'));
  };

  const convertTemperature = (temperature) => {
    if (temperatureUnit === 'fahrenheit') {
      return Math.round((temperature * 9/5) + 32);
    } else {
      return Math.round(temperature);
    }
  };

  const handleSaveLocation = () => {
    const { name, country } = weatherData.city;
    const location = `${name}, ${country}`;
    if (!favoriteLocations.includes(location)) {
      const updatedLocations = [...favoriteLocations, location];
      setFavoriteLocations(updatedLocations);
      localStorage.setItem('favoriteLocations', JSON.stringify(updatedLocations));
    } else {
      alert('Location already exists in favorites.');
    }
  };

const groupedForecast = weatherData && weatherData.list.reduce((acc, item) => {
  const date = item.dt_txt.split(' ')[0];
  if (!acc[date]) {
    acc[date] = [];
  }
  acc[date].push(item);
  return acc;
}, {});

const handleFavoriteLocationClick = (location) => {
  setLocation(location);
  fetchWeatherData(location);
  window.scrollTo({ top: 0, behavior: 'smooth' });
  setOpenFavoritesDialog(false);
  setLocation('');
};

const handleToggleFavoritesDialog = () => {
  setOpenFavoritesDialog(!openFavoritesDialog);
};

const handleSavedLocations = () => {
  setOpenFavoritesDialog(true);
}

return (
  <div>
    <Grid container direction="column" alignItems="center" spacing={2}>
      <Grid item style={{ marginTop: '1rem' }}>
        <Typography variant="h5" style={{ fontWeight: 'bold' }}>5-Day Weather Forecast</Typography>
      </Grid>
      <Grid item container direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <Button variant="outlined" onClick={handleSavedLocations} className="hover:bg-blue-500 transition duration-300 ease-in-out">
            Saved Locations
          </Button>
        </Grid>
        <Grid item>
          <Switch
            checked={temperatureUnit === 'fahrenheit'}
            onChange={toggleTemperatureUnit}
            inputProps={{ 'aria-label': 'Switch to Celsius/Fahrenheit' }}
          />
          <span>
            {temperatureUnit === 'celsius' ? 'Celsius' : 'Fahrenheit'}
          </span>
        </Grid>
      </Grid>
      <Grid item container direction="row" alignItems="center" justifyContent="center" spacing={2}>
        <Grid item>
          <Typography variant="h6" style={{ fontWeight: 'bold' }}>{weatherData.city.name}, {weatherData.city.country}</Typography>
        </Grid>
        <Grid item>
          <Button variant="outlined" onClick={handleSaveLocation} className="hover:bg-green-500 transition duration-300 ease-in-out">
            <FavoriteBorderOutlinedIcon />
          </Button>
        </Grid>
      </Grid>
    </Grid>
    <div className="forecast-list" style={{ overflowX: 'auto', whiteSpace: 'nowrap' }}>
      {Object.keys(groupedForecast).map((date, index) => (
        <Grid container key={index} spacing={2} style={{ marginBottom: '16px' }}>
          <Grid item xs={12}>
            <Typography variant="h6" style={{ marginLeft: '8px' }}>{date}</Typography>
          </Grid>
          {groupedForecast[date].map((item, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
              <Paper className="bg-gradient-to-br from-blue-400 to-indigo-600 hover:bg-purple-600 transition duration-300 ease-in-out" style={{ padding: 2, borderRadius: 2, margin: 1 }}>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>Time: </span>
                  {item.dt_txt.split(' ')[1]}
                </Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>Temperature: </span>
                  {convertTemperature(item.main.temp)}°{temperatureUnit === 'celsius' ? 'C' : 'F'}
                </Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>Description: </span>
                  {item.weather[0].description}
                </Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>Humidity: </span>
                  {Math.round(item.main.humidity)}%
                </Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>Visibility: </span>
                  {Math.round(item.visibility)} mi
                </Typography>
                <Typography variant="body2">
                  <span style={{ fontWeight: 'bold' }}>Wind Speed: </span>
                  {Math.round(item.wind.speed)} km/h
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ))}
    </div>
    <Dialog open={openFavoritesDialog} onClose={handleToggleFavoritesDialog}>
      <DialogTitle>Saved Favorite Locations</DialogTitle>
      <DialogContent>
        <List>
          {favoriteLocations.map((location, index) => (
            <ListItem key={index}>
              <Button
                variant="text"
                color="primary"
                onClick={() => handleFavoriteLocationClick(location)}
                className="hover:text-blue-600 transition duration-300 ease-in-out"
              >
                {location}
              </Button>
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleToggleFavoritesDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </div>
);
}

export default WeatherInfo;
