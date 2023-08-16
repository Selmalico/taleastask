const Search = ({ searchValue, setSearchValue, isNightMode }) =>{
    return(
        <input
        placeholder="Search..."
        className="me-2"
        type="text"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        style={{backgroundColor: isNightMode ? "#1e1d23" : "#fff",}}
      />
    )
}

export default Search;