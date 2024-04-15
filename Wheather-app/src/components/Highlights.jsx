// eslint-disable-next-line no-unused-vars
import React from "react";
import PropTypes from "prop-types"; // Importera PropTypes här

export default function Highlights({ stats }) {
  return (
    <div className="bg-slate-600 p-2 text-slate-200 flex flex-col justify-start items-center text-transform scale-100 hover:scale-110 transition-transform duration-300 ease-in-out  cursor-pointer">
      {/* Rubrik för vindstatus */}
      <h2 className="text-sm mt-2 ">{stats.title}</h2>
      {/* Del för att visa vindhastighet */}
      <div className="mt-2">
        {/* Vindhastighet i stora fetstil */}
        <span className="text-4xl font-bold">{stats.value}</span>
        {/* Enhetsvisning för vindhastighet */}
        <span className="text-2xl ">{stats.unit}</span>
      </div>

      {/* Del för att visa vindriktning */}

      {stats.direction ? (
        <div className="mt-2 flex">
          {/* SVG-ikon för vindriktning */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 text-slate-200"
          >
            {/* Pilikon för att visa vindriktning */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
            />
          </svg>
          {/* Text för att ange vindriktning */}
          <div className="ms-2 text-slate-200">{stats.direction}</div>
        </div>
      ) : null}

      {/* Del för att visa vindhastighetsmätare */}

      {stats.title == "Humidity" ? (
        <div className="w-full bg-gray-200 rounded-full h-1.5 mb-4 dark:bg-gray-700 mt-4">
          {/* Visuell representation av vindhastighet som en färgad streck på en grå skala */}
          <div
            className="bg-blue-600 h-1.5 rounded-full dark:bg-blue-500"
            style={{ width: `${stats.value}%` }}
          ></div>
        </div>
      ) : null}
    </div>
  );
}
Highlights.propTypes = {
  // Definierar prop-typ för stats-objektet som förväntas skickas till Highlights-komponenten
  stats: PropTypes.shape({
    // Titeln för att visa väderförhållanden, måste vara en sträng och obligatorisk
    title: PropTypes.string.isRequired,
    // Värdet för det specifika väderförhållandet, kan vara antingen en sträng eller en siffra och är obligatorisk
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    // Enhet för det specifika väderförhållandet, måste vara en sträng och obligatorisk
    unit: PropTypes.string.isRequired,
    // Riktningen för vinden, valfritt och kan vara en sträng
    direction: PropTypes.string,
  }).isRequired, // Slut på PropTypes-definitionen för stats-objektet
}; // Slut på PropTypes-definitionen för Highlights-komponenten


