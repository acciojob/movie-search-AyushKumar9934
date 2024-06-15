
import React, { useEffect, useState } from "react";
import './../styles/App.css';

const App = () => {
  const [current, setCurrent] = useState("");
  const [allData, setAllData] = useState([]);

  async function handleSearch(e) {
    e.preventDefault();
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
      <form onSubmit={handleSearch}>
      <input value={current} placeholder="Search Movie by title" onChange={(event) => { setCurrent(event.target.value) }} />
      <span><button type="submit" >Search</button></span></form>
      {
        allData.length === 0 ? <p className="error">Invalid movie name. Please try again.</p> :
          allData.map((movie) => {
            return (
              <div key={movie.imdbID}>
                <ul><li>{movie.Title} ({movie.Year})
                <img src={movie.Poster} alt="movie poster"/></li></ul>
              </div>
            );
          })
      }
    </div>
  )
}

export default App;