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
   
  );
}

export default App;
