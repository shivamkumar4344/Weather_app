import "./App.css";
import React from "react";
import LocationPinIcon from '@mui/icons-material/LocationPin';
import getWeather from "./api/api";
import { useState, useEffect } from "react";
import dateFormat from 'dateformat';
import Button from '@mui/material/Button';
import PacmanLoader from "react-spinners/PacmanLoader";

function App() {

  //using useState to store the values
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState({});
  const [load, setLoad] = useState(false);

  //function that calls api
  const getWeatherCity = async () => {
    setLoad(true);
    try{
    const weatherData = await getWeather(city);
    setTimeout(() => {
      setLoad(false);
      setWeather(weatherData);
    },2000);
    
    }catch(err){
      console.log("Error : ",err);
      setLoad("False");
      setWeather({});
    }
    
    setCity("");
  }

  //function to get date in desired format
  const renderDate = () => {
    let date = new Date();
    return dateFormat(date, "dddd , mmmm dS ,h:MM TT");
  }

  //refresh button that sets to initial state.
  const refreshState = () => {
    getWeatherCity();
    setCity("");
  }
  //function for loading.

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(event) => setCity(event.target.value)}
          placeholder="Enter Your City" />
        <Button variant="contained" onClick={() => getWeatherCity()}>
          Search
        </Button>
      </div>
      <div className="refresh">
        <Button variant="contained" onClick={refreshState}>Refresh</Button>
      </div>
      {load ? (
        <div className="loading-symbol">
          <PacmanLoader color="red" size={50} />
          <p>Loading...</p>
        </div>
      ) : (
         weather && weather.weather && (
          <div className="content">
            <div className="location d-flex">
              <LocationPinIcon></LocationPinIcon>
              <h2>{weather.name}</h2>
            </div>
            <p className="datetext">{renderDate()}</p>

            <div className="weatherdesc d-flex flex-c">
              <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
              <h3>Current Condition : {weather.weather[0].description}
              </h3>
              <h3>Humidity : {weather.main.humidity} %</h3>
            </div>
            <div className="tempstats d-flex flex-c" >
              <h1>{weather.main.temp}<span>&deg;C</span></h1>
              <h3>Feels like {weather.main.feels_like} <span>&deg;C</span></h3>
              <h3></h3>
            </div>
            <div className="windstats">
              <h3>
                Wind Speed is {weather.wind.speed} km/h
              </h3>
            </div>
          </div>
        )
    )}
      {/* when no data is present */}
      {!weather.name && <div className="content">
        <h4>No data found for this city !</h4>
      </div>}
    </div>
      )
}

export default App; 
