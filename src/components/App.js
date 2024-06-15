
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [current, setCurrent] = useState("");
  const [allData, setAllData] = useState([]);

  async function handleSearch() {
    const res = await fetch(`http://www.omdbapi.com/?s=${current}&apikey=f732e5c0`);
    const data = await res.json();
    if (data.Search) {
      setAllData(data.Search);
    } else {
      setAllData([]);
    }
  }

  return (
    <div>
      <input value={current} placeholder="Search Movie by title" onChange={(event) => { setCurrent(event.target.value) }} />
      <span><button onClick={handleSearch}>Search</button></span>
      {
        allData.length === 0 ? <p className="error">Invalid movie name. Please try again.</p> :
          allData.map((movie) => {
            return (
              <div key={movie.imdbID}>
                <ul><li>{movie.Title} ({movie.Year})</li></ul>
                <img src={movie.Poster} alt="movie poster"/>
              </div>
            );
          })
      }
    </div>
  )
}

export default App;