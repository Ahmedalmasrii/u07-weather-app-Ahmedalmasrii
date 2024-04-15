import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import PropTypes from "prop-types";



const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);
  const handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
    <AsyncPaginate
      placeholder="search for the city "
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
    />
  );
};
Search.propTypes = {
  onSearchChange: PropTypes.func.isRequired
};

export default Search;
