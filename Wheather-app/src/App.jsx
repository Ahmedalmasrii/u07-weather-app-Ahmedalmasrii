// import "./App.css";
// import CurrentWeather from "./components/current-weather/current-weather";
// import Search from "./components/search/search";
// import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
// import { useState } from "react";
// import Forecast from "./components/forecast/forecast";

// function App() {
//   const [currentWeather, setCurrentWeather] = useState(null);
//   const [forecast, setForecast] = useState(null);
//   const [isCelsius, setIsCelsius] = useState(true);
//   const [hourlyData, setHourlyData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleOnSearchChange = (searchData) => {
//     setIsLoading(true);
//     const [lat, lon] = searchData.value.split(" ");

//     const currentWeatherFetch = `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;
//     const forecastFetch = `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`;


//      // Funktion för att få platsnamn från latitud och longitud
//   const reverseGeocodeLocation = async (latitude, longitude) => {
//     const apiURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&appid=${WEATHER_API_KEY}`;
//     try {
//       const response = await fetch(apiURL);
//       const data = await response.json();
//       // Anpassa nästa rad till strukturen på data som returneras av API:et du använder
//       return data.results[0].formatted;
//     } catch (error) {
//       console.error("Fel vid hämtning av platsnamn: ", error);
//       return "Okänd plats"; // Reservnamn
//     }
//   };

//     Promise.all([fetch(currentWeatherFetch), fetch(forecastFetch)])
//       .then(async ([currentResponse, forecastResponse]) => {
//         if (!currentResponse.ok || !forecastResponse.ok) {
//           throw new Error("Problem fetching weather data");
//         }
//         const weatherData = await currentResponse.json();
//         const forecastData = await forecastResponse.json();
//         const sunrise = new Date(
//           weatherData.sys.sunrise * 1000
//         ).toLocaleTimeString();
//         const sunset = new Date(
//           weatherData.sys.sunset * 1000
//         ).toLocaleTimeString();
//         setCurrentWeather({
//           ...weatherData,
//           city: searchData.label,
//           sunrise,
//           sunset,
//         });

//         setHourlyData(forecastData.list.slice(0, 4));

//         setForecast({ ...forecastData, city: searchData.label });
//       })
//       .catch((err) => {
//         console.error("Error fetching weather data: ", err);
//         alert("An error occurred while fetching the weather data.");
//       })
//       .finally(() => {
//         setIsLoading(false);
//       });
//   };

//   const handleConversion = (toCelsius) => {
//     setIsCelsius(toCelsius);
//   };

//   const getCurrentLocation = async () => {
//     if ("geolocation" in navigator) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           const placeName = await reverseGeocodeLocation(latitude, longitude);
//           handleOnSearchChange({
//             value: `${latitude} ${longitude}`,
//             label: placeName, // Använd det faktiska platsnamnet
//           });
//         },
//         (error) => {
//           console.error("Fel vid hämtning av plats: ", error);
//           alert("Fel vid hämtning av plats: " + error.message);
//         }
//       );
//     } else {
//       alert("Geolokalisering stöds inte av denna webbläsare.");
//     }
//   };

//   return (
//    // Denna kod skapar en container med en sökkomponent och två komponenter för väder: CurrentWeather för aktuellt väder och Forecast för väderprognos.
//     <div className="container">
//       <div className="locationbtn">
//         <button className="lcbtn" onClick={getCurrentLocation}>
//           Current Location
//           <img
//             src={`/icons/location-icon.png`}
//             alt="location"
//             className="location-icon lcimg"
//           />
//         </button>
//       </div>
//       <Search onSearchChange={handleOnSearchChange} />
//       {isLoading ? (
//         <div>Loading...</div>
//       ) : (
//         <>
//           {currentWeather && (
//             <CurrentWeather
//               data={currentWeather}
//               handleConversion={handleConversion}
//               isCelsius={isCelsius}
//               hourlyData={hourlyData} // Pass hourly data to the component
//             />
//           )}
//           {forecast && <Forecast data={forecast} isCelsius={isCelsius} />}
//         </>
//       )}
//     </div>
//   );
// }

// export default App;


import "./App.css";
import CurrentWeather from "./components/current-weather/current-weather";
import Search from "./components/search/search";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import { useState } from "react";
import Forecast from "./components/forecast/forecast";

// Flytta definitionen av 'reverseGeocodeLocation' utanför 'App'-komponenten
const reverseGeocodeLocation = async (latitude, longitude) => {
  const apiURL = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&appid=${WEATHER_API_KEY}`;
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    // Anpassa nästa rad till strukturen på data som returneras av API:et du använder
    return data.results[0].formatted;
  } catch (error) {
    console.error("Fel vid hämtning av platsnamn: ", error);
    return "Okänd plats"; // Reservnamn
  }
};

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

  const getCurrentLocation = async () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const placeName = await reverseGeocodeLocation(latitude, longitude);
          handleOnSearchChange({
            value: `${latitude} ${longitude}`,
            label: placeName, // Använd det faktiska platsnamnet
          });
        },
        (error) => {
          console.error("Fel vid hämtning av plats: ", error);
          alert("Fel vid hämtning av plats: " + error.message);
        }
      );
    } else {
      alert("Geolokalisering stöds inte av denna webbläsare.");
    }
  };

  return (
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
              hourlyData={hourlyData} 
            />
          )}
          {forecast && <Forecast data={forecast} isCelsius={isCelsius} />}
        </>
      )}
    </div>
  );
}

export default App;

