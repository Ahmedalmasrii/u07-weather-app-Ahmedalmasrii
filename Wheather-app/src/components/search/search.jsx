import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import PropTypes from "prop-types";
import { GEO_API_URL, geoApioptions } from "../../api";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };
  const loadOptions = (inputValue) => {
    return fetch(
      `${GEO_API_URL}/cities?minPopulation=50000&namePrefix=${inputValue}`,

      geoApioptions
    )
      .then((response) => response.json())

      .then((response) => {
        return {
          options: response.data.map((city) => {
            return {
              value: `${city.latitude} ${city.longitude} `,
              label: `${city.name}, ${city.countryCode}  `,
            };
          }),
        };
      })
      .catch((err) => console.error(err));
  };

  return (
    <AsyncPaginate
      placeholder="Search for the city "
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};
Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired,
};

export default Search;
