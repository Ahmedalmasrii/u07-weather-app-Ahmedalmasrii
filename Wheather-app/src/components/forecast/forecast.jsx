import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemPanel,
  AccordionItemButton,
} from "react-accessible-accordion";
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
const Forecast = ({ data, isCelsius }) => {
  const dayInAWeek = new Date().getDay();
 
   // Skapar en ny array som börjar med dagens veckodag och fortsätter till nästa vecka.
   const forecastDays = WEEK_DAYS.slice(dayInAWeek, WEEK_DAYS.length).concat(
    WEEK_DAYS.slice(0, dayInAWeek)
  );

  const convertTemperature = (temp) => {
    return isCelsius ? temp : (temp * 9) / 5 + 32;
  };

  return (
    <>
      <label className="title">Daily</label>
      <Accordion allowZeroExpanded>
        {data.list.slice(0, 7).map((item, idx) => (
          <AccordionItem key={idx}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={`icons/${item.weather[0].icon}.png`}
                    alt="weather"
                    className="icon-small"
                  />
                  <label className="day">{forecastDays[idx]}</label>
                  <label className="description">
                    {item.weather[0].description}
                  </label>
                  <label className="min-max">
                    {Math.round(convertTemperature(item.main.temp_min))}{isCelsius ? '°C' : '°F'} /
                    {Math.round(convertTemperature(item.main.temp_max))}{isCelsius ? '°C' : '°F'}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Pressure</label>
                  <label>{item.main.pressure} hpa</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity</label>
                  <label>{item.main.humidity}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Clouds</label>
                  <label>{item.clouds.all}%</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Wind speed</label>
                  <label>{item.wind.speed} m/s</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Sea level</label>
                  <label>{item.main.sea_level}m</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Feels like</label>
                  <label>{Math.round(convertTemperature(item.main.feels_like))}{isCelsius ? '°C' : '°F'}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

Forecast.propTypes = {
  data: PropTypes.shape({
    list: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.shape({
          temp_min: PropTypes.number.isRequired,
          temp_max: PropTypes.number.isRequired,
          pressure: PropTypes.number.isRequired,
          humidity: PropTypes.number.isRequired,
          sea_level: PropTypes.number,
          feels_like: PropTypes.number.isRequired,
        }).isRequired,
        weather: PropTypes.arrayOf(
          PropTypes.shape({
            description: PropTypes.string.isRequired,
            icon: PropTypes.string.isRequired,
          })
        ).isRequired,
        clouds: PropTypes.shape({
          all: PropTypes.number.isRequired,
        }).isRequired,
        wind: PropTypes.shape({
          speed: PropTypes.number.isRequired,
        }).isRequired,
      })
    ).isRequired,
  }).isRequired,
  isCelsius: PropTypes.bool.isRequired,
};

export default Forecast;
