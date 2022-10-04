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
      <h1 class="display-4 fw-bold" id="homeheader">OnTour</h1>
      <div className="container py-5" id="searchbar">
          <div class="row height d-flex justify-content-center align-items-center">
            <div class="col-md-8">
              <div class="search">
                <i class="fa fa-search"></i>
                <input type="text" class="form-control" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
                <button id="searchbutton" class="btn bg-dark fw-bold" onClick={routeChange}>Search</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}
export default Home;