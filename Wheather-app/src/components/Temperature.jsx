import React from "react";

function Temperature() {
  return (
    <>
      <div className="flex justify-between">
        <input
          type="text"
          className="bg-slate-600 border border-slate-500 text-slate-200 placeholder-slate-400 text-md w-60 p-2 focus:outline-none focus:border-slate-400"
          placeholder="Search for your city"
        />
      </div>
    </>
  );
}

export default Temperature;
