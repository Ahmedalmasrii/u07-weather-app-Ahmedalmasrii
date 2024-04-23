import { useState } from "react";
import "./current-weather.css";
import PropTypes from "prop-types";

const CurrentWeather = ({ data, handleConversion, isCelsius, hourlyData }) => {
  const [showHourly, setShowHourly] = useState(false); // tillstånd för att visa eller dölja timvis information

  const toggleHourlyView = () => {
    setShowHourly(!showHourly); // Växlning visning av timvis info
  };
  const toggleUnit = () => {
    // setIsCelsius(!isCelsius);
    handleConversion(!isCelsius); // Skickar värdet av enheten till hanteringsfunktionen i App-komponenten
  };

  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  console.log("Hourly Data:", hourlyData);
  return (
    <div className="weather">
      <div className="top">
        <div>
          <p className="city">{data.city}</p>
          <p className="weather-description">{data.weather[0].description}</p>
        </div>
        <img
          src={`icons/${data.weather[0].icon}.png`}
          alt="weather"
          className="weather-icon"
        />
      </div>

      <div className="button-container">
        <button className="btn" onClick={toggleHourlyView}>
          {showHourly ? "Hide Hourly Details" : "Show Hourly Details"}
        </button>
      </div>

      {showHourly && hourlyData && hourlyData.length > 0 && (
        <div className="hourly-details">
          {hourlyData.map((hour, index) => {
            const time = new Date(hour.dt * 1000).toLocaleTimeString();
            const temperature = Math.round(convertTemperature(hour.main.temp));
            return (
              <div key={index} className="hourly-item">
                <p>Time: {time}</p>
                <p>
                  Temp: {temperature}
                  {isCelsius ? "°C" : "°F"}
                </p>
                <p>Weather: {hour.weather[0].description}</p>
                <p>Wind: {hour.wind.speed} m/s</p>
                <p>Humidity: {hour.main.humidity}%</p>
              </div>
            );
          })}
        </div>
      )}

      <div className="bottom">
        {/* ska uppdatera temp baserat på inmatat värde/stad */}
        <p
          className={
            isCelsius ? "temperature celsius" : "temperature fahrenheit"
          }
        >
          {isCelsius
            ? `${Math.round(data.main.temp)}°C`
            : `${Math.round((data.main.temp * 9) / 5 + 32)}°F`}
        </p>
        <div className="button-container">
          <button className="btn" onClick={toggleUnit}>
            {isCelsius ? "Convert to Fahrenheit" : "Convert to Celsius"}
          </button>
        </div>

        {!showHourly && (
          <div className="details">
            <div className="parameter-row">
              <span className="parameter-label">Details</span>
            </div>

            {/* visar hur vädret känns */}

            <div className="parameter-row">
              <span className="parameter-label">Feels like</span>
              <span className="parameter-value">
                {Math.round(convertTemperature(data.main.feels_like))}
                {isCelsius ? "°C" : "°F"}
              </span>
            </div>
            {/* visar det är vind eller inte */}
            <div className="parameter-row">
              <span className="parameter-label">Wind</span>
              <span className="parameter-value">{data.wind.speed} m/s</span>
            </div>
            {/* visar humidityn i procent */}
            <div className="parameter-row">
              <span className="parameter-label">Humidity</span>
              <span className="parameter-value">{data.main.humidity}%</span>
            </div>
            {/* visar  lufttryck  */}
            <div className="parameter-row">
              <span className="parameter-label">Pressure</span>
              <span className="parameter-value">{data.main.pressure} hpa</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Sunrise</span>
              <span className="parameter-value">{data.sunrise}</span>
            </div>
            <div className="parameter-row">
              <span className="parameter-label">Sunset</span>
              <span className="parameter-value">{data.sunset}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
CurrentWeather.propTypes = {
  hourlyData: PropTypes.arrayOf(
    PropTypes.shape({
      dt: PropTypes.number.isRequired,
      main: PropTypes.shape({
        temp: PropTypes.number.isRequired,
        humidity: PropTypes.number.isRequired,
      }).isRequired,
      weather: PropTypes.arrayOf(
        PropTypes.shape({
          description: PropTypes.string.isRequired,
          icon: PropTypes.string.isRequired,
        })
      ).isRequired,
      wind: PropTypes.shape({
        speed: PropTypes.number.isRequired,
      }).isRequired,
    })
  ),

  data: PropTypes.shape({
    city: PropTypes.string.isRequired,

    weather: PropTypes.arrayOf(
      PropTypes.shape({
        description: PropTypes.string.isRequired,
        icon: PropTypes.string.isRequired,
      })
    ).isRequired,
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      feels_like: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
      pressure: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    sunrise: PropTypes.string.isRequired,
    sunset: PropTypes.string.isRequired,
  }).isRequired,

  handleConversion: PropTypes.func.isRequired,
  isCelsius: PropTypes.bool.isRequired,
};

export default CurrentWeather;
