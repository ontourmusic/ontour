import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from 'react';

function Home() {
  const [artist_name, setName] = useState('')

  const navigate = useNavigate(); 
  const routeChange = (artist) =>{ 
    navigate({
      pathname: '/artist', 
      search: createSearchParams({
      artist: artist_name,
      }).toString()
    });
  };

  // const handleSearch = event => {
  //   console.log("in clicked search");
  //   console.log(artist_name);
  // }

  return (
    <div id="homepage">
      <div class="container">
        <h1 class="fw-bold logo" id="homeheader">OnTour</h1>
        <div class="search row">
          <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
          <button id="searchbutton" class="btn bg-dark" onClick={routeChange}>
            <img src="../../images/searchicon.png" alt="..."/>
          </button>
        </div>
      </div>
    </div>
  );
}
export default Home;