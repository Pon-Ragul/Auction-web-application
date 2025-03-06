import React, { useState } from "react";
import { FaSearch } from "react-icons/fa"; 
export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value);
  };
  return (
    <div className="search-bar">
      <div className="input-group">
        <input
          type="text"
          className="p-2 border rounded-5"
          placeholder="Search here..."
           id="search-input"
          value={query}
          onChange={handleChange}
        />
        <button
          className="btn btn-dark rounded-5"
          id="searchbutton"
          onClick={() => onSearch(query)}
        >
        <FaSearch className="search-icon"/>
        </button>
      </div>
    </div>
  );
}
