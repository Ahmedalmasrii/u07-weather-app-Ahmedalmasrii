import { useEffect, useState } from "react";
import "./App.css";
import Highlights from "./components/Highlights";
import Temperature from "./components/Temperature";
// funktionen för att hämta väderdata från den egna filen api.jsx
import { fetchWeatherData } from "./api";

function App() {
   // Definierar stad och väderdata som states med hjälp av useState-hook
  const [city, setCity] = useState("Stockholm");
  const [weatherData, setWeatherData] = useState(null);


   // useEffect-hook används för att hämta väderdata när komponenten mountas eller stad ändras
  useEffect(() => {
    async function fetchData() {
      try {
      // Anropar fetchWeatherData-funktionen för att hämta väderdata för den angivna staden

        const data = await fetchWeatherData(city);
        // Uppdaterar väderdata-state med den hämtade datan

        setWeatherData(data);
      } catch (error) {
         // error ifall något inte går rätt till vif hämtning 
        console.error("Error:", error);
      }
    }
 //anrop av funtionen fetchData när det ändras stad
    fetchData();
  }, [city]);

  return (
    <div className="bg-[#1F213A] h-screen flex justify-center align-top">
        <div className=" mt-40 w-1/5 h-1/3">
    {/* Visar temperaturkomponenten om 'weatherData' är tillgängligt */}
    {weatherData && (
      <Temperature
        setCity={setCity}
        stats={{
          temp: weatherData.current.temp_c,
          condition: weatherData.current.condition.text,
          isDay: weatherData.current.is_day,
          location: weatherData.location.name,
          time: weatherData.location.localtime,
        }}
      />
    )}
  </div>
    </div>

  );
}

export default App;
