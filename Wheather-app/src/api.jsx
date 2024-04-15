/*
   Denna funktion utför en asynkron anrop för att hämta väderdata för en specifik stad.
   Parametrar:
   - city: En sträng som representerar namnet på staden för vilken väderdata ska hämtas.

   Funktionen bygger en API-url baserat på den angivna staden och utför sedan en fetch-förfrågan till API:et.
   Om förfrågan är framgångsrik, returneras väderdatan i JSON-format.
   Om förfrågan misslyckas, kastas ett fel och en felmeddelande skrivs ut i konsolen.

   Returnerar: En Promise som innehåller väderdatan för den angivna staden.
*/

export async function fetchWeatherData(city) {
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=b7caaa4e5ba0499daec150610241504&q=${city}&aqi=no`;
  
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error fetching data");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  }
  