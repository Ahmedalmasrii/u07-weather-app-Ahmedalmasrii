import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [isCelsius, setIsCelsius] = useState(true);
  const [hourlyData, setHourlyData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSearchChange = (searchData) => {
    setIsLoading(true);
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
    const forecastFetch = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;

    Promise.all([fetch(currentWeatherFetch), fetch(forecastFetch)])
      .then(async ([currentResponse, forecastResponse]) => {
        if (!currentResponse.ok || !forecastResponse.ok) {
          throw new Error("Problem fetching weather data");
        }
        const weatherData = await currentResponse.json();
        const forecastData = await forecastResponse.json();
        const sunrise = new Date(
          weatherData.sys.sunrise * 1000
        ).toLocaleTimeString();
        const sunset = new Date(
          weatherData.sys.sunset * 1000
        ).toLocaleTimeString();
        setCurrentWeather({
          ...weatherData,
          city: searchData.label,
          sunrise,
          sunset,
        });

        setHourlyData(forecastData.list.slice(0, 4));

        setForecast({ ...forecastData, city: searchData.label });
      })
      .catch((err) => {
        console.error("Error fetching weather data: ", err);
        alert("An error occurred while fetching the weather data.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleConversion = (toCelsius) => {
    setIsCelsius(toCelsius);
  };

  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          handleOnSearchChange({
            value: `${position.coords.latitude} ${position.coords.longitude}`,
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
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentWeather && (
            <CurrentWeather
              data={currentWeather}
              handleConversion={handleConversion}
              isCelsius={isCelsius}
              hourlyData={hourlyData} // Pass hourly data to the component
            />
          )}
          {forecast && <Forecast data={forecast} isCelsius={isCelsius} />}
        </>
      )}
    </div>
  );
}

export default App;
