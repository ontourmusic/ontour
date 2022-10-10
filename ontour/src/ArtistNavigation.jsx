import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import { NavLink } from "react-router-dom";

function Navigation() 
{
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

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink id="ontour" className="fw-bold navbar-brand logo" to="/">
          OnTour
          <img id="guitar" src= "images/guitar.png"/>
        </NavLink>
        <div class="navsearch">
          <input id="input" type="text" class="form-control shadow-none" onChange={event => setName(event.target.value)} value={artist_name} placeholder="Search for an artist or venue"/>
          <button id="searchbutton" class="btn bg-dark" onClick={routeChange}>
            <img src="images/search-icon.png" alt="..."/>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
