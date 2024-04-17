
import PropTypes from "prop-types";
import "./forecast.css";

// En array som innehåller veckodagarna.
const WEEK_DAYS = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

// En funktionell komponent som tar emot 'data' som props.

const Forecast = ({ data }) => {
      // Hämtar dagens index i veckodagsarrayen.

  const dayInAWeek = new Date().getDay();
    // Skapar en ny array som börjar med dagens veckodag och fortsätter till nästa vecka.

  const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  return (
    <>
     
    </>
  );
};

export default Forecast;
