const FilterBar = ({
  singer,
  type,
  sort,
  setSinger,
  setType,
  setSort,
  singers,
  types,
}) => {
  return (
    <div className="filter-bar">
      <div className="filter-group">
        <label>Singer</label>

        <select
          value={singer}
          onChange={(e) => setSinger(e.target.value)}
        >
          <option value="All">All Singers</option>

          {singers.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Song Type</label>

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="All">All Types</option>

          {types.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {setSort && (
        <div className="filter-group">
          <label>Sort By</label>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="popular">Most Popular</option>
            <option value="az">Title A–Z</option>
            <option value="za">Title Z–A</option>
            <option value="newest">Newest First</option>
          </select>
        </div>
      )}

      <button
        className="clear-filter"
        onClick={() => {
          setSinger("All");
          setType("All");
          if (setSort) setSort("popular");
        }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default FilterBar;