import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import Navigation from "../Navigation";

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
    <>
      <Navigation />
      <div id="homepage">
        <div id="homeheader" class="container">
          <div class="fw-bold logo">OnTour</div>
          <div class="search row">
            <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
            <button id="searchbutton" class="btn bg-dark" onClick={routeChange}>
              <img src="../../images/search_icon.png" alt="..."/>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
