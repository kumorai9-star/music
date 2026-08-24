import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const value = e.target.value;

    setSearch(value);

    navigate(
      value.trim()
        ? `/?search=${encodeURIComponent(value)}`
        : "/"
    );
  };

  return (
    <div className="search-container">
      <span>🔍</span>

      <input
        type="text"
        placeholder="Search songs, artists..."
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;