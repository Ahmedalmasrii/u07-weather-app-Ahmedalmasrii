import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setforecast] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true); // Definiera isCelsius här

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastFetch = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    // Utför två fetch-anrop parallellt för att hämta aktuellt väder och väderprognos.

    Promise.all([fetch(currentWeatherFetch), fetch(forecastFetch)])
      .then(async (response) => {
        // omvandlar svar från JSON-format till JavaScript-objekt.
        const weatherResponse = await response[0].json();
        const sunrise = new Date(
          weatherResponse.sys.sunrise * 1000
        ).toLocaleTimeString();
        const sunset = new Date(
          weatherResponse.sys.sunset * 1000
        ).toLocaleTimeString();
        const forecastResponse = await response[1].json();

        // Uppdaterar variabler med hämtad väderinformation och staden från  själva sökdata.

        setCurrentWeather({
          city: searchData.label,
          sunrise,
          sunset,
          ...weatherResponse,
        });
        setforecast({ city: searchData.label, ...forecastResponse });
      })
      .catch((err) => console.log(err));
  };
  console.log(forecast);

  console.log(currentWeather);

  const handleConversion = (toCelsius) => {
    setIsCelsius(toCelsius);
  };
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          handleOnSearchChange({
            value: `${latitude} ${longitude}`,
            label: "Current Location",
          });
        },
        (error) => {
          console.error("Error getting location: ", error);
          alert("Error getting location: " + error.message);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    // Denna kod skapar en container med en sökkomponent och två komponenter för väder: CurrentWeather för aktuellt väder och Forecast för väderprognos.
    <div className="container">
      <div className="locationbtn">
        <button className="lcbtn" onClick={getCurrentLocation}>
          Current Location
          <img
          src={`/icons/location-icon.png`}
          alt="location"
          className="location-icon lcimg"
        />
        </button>
     
      </div>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && (
        <CurrentWeather
          data={currentWeather}
          handleConversion={handleConversion}
          isCelsius={isCelsius}
        />
      )}
      {forecast && <Forecast data={forecast} isCelsius={isCelsius} />}
    </div>
  );
}

export default App;
