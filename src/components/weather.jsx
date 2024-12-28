import React, { useEffect, useRef, useState } from 'react';
import './weather.css';
import search_icon from "../../src/assets/search.png";
import clear_icon from "../../src/assets/clear.png";
import cloud_icon from "../../src/assets/cloud.png";
import drizzle_icon from "../../src/assets/drizzle.png";
import humidity_icon from "../../src/assets/humidity.png";
import rain_icon from "../../src/assets/rain.png";
import snow_icon from "../../src/assets/snow.png";
import wind_icon from "../../src/assets/wind.png";

const Weather = () => {
  const [weatherdata, setweatherdata] = useState(false);
  const inputref = useRef();

  const allicon = {
    "01d": clear_icon,
    "01n": clear_icon,
    "02d": cloud_icon,
    "02n": cloud_icon,
    "03d": cloud_icon,
    "03n": cloud_icon,
    "04d": drizzle_icon,
    "04n": drizzle_icon,
    "09d": rain_icon,
    "09n": rain_icon,
    "10d": rain_icon,
    "10n": rain_icon,
    "13d": snow_icon,
    "13n": snow_icon,
  };
 
  const search = async (city) => {
    if (!city) {
      alert("Enter a city name");
      return;
    }
    updateHistory(city)
    try {
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        alert(data.message);
        return;
      }
      const icon = allicon[data.weather[0].icon] || clear_icon;
      setweatherdata({
        humidity: data.main.humidity,
        winds: data.wind.speed,
        temperature: Math.floor(data.main.temp),
        location: data.name,
        icon: icon,
      });
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Unable to fetch weather data. Please try again later.");
    }
  };

  useEffect(() => {
    search("London"); // Default city
  }, []);

  return (
    <div className='weather'>
      <div className='searchbar'>
        <input ref={inputref} type='text' placeholder='Search' />
        <img
          onClick={() => search(inputref.current.value)}
          className='lens'
          src={search_icon}
          alt="Search"
        />
      </div>
      {weatherdata ? (
        <>
          <img className='weath-img' src={weatherdata.icon} alt="Weather Icon" />
          <p className='temp'>{weatherdata.temperature}°C</p>
          <p className='locate'>{weatherdata.location}</p>
          <div className='weather-data'>
            <div className='col'>
              <img src={humidity_icon} alt="Humidity Icon" />
              <div>
                <p>{weatherdata.humidity}%</p>
                <span>Humidity</span>
              </div>
            </div>
            <div className='col'>
              <img src={wind_icon} alt="Wind Icon" />
              <div>
                <p>{weatherdata.winds} Km/h</p>
                <span>Wind</span>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Weather;
