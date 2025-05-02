import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/search?q=${query}`);
      const data = await response.json();
      onSearch(data);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="mt-6">
      <form onSubmit={handleSearch} className="flex justify-center">
        <input
          type="text"
          className="p-2 border rounded-l-md w-1/2"
          placeholder="Search by name, email, business name, or application ID..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-r-md">
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
