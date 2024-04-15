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

    
    </div>
  );
}
