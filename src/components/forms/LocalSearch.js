const LocalSearch = ({ query, setQuery }) => {
    const handleSearch = (e) => {
        e.preventDefault();
        setQuery(e.target.value.toLowerCase());
    };

    return (
        <input
            value={query}
            onChange={handleSearch}
            className="form-control mb-3"
            type="search"
            placeholder="Filter"
        />
    );
};

export default LocalSearch;
