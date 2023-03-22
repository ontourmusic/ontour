import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./components/SearchBar";

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
    <nav id="artist-nav" className="navbar navbar-expand navbar-dark bg-dark">
      <div class="container">
        <a href="/">
          <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
        </a>
        {/* <SearchBar></SearchBar> */}
        <div class="navsearch">
          <SearchBar navbar={true}></SearchBar>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
