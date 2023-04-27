import React from "react";
import {createSearchParams, useNavigate} from "react-router-dom";
import {useState} from "react";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./components/SearchBar";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

function Navigation() 
{
  const { user, isAuthenticated } = useAuth0();
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
      <div className="container d-flex flex-row justify-content-between">
        <div>
          <a href="/">
            <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
          </a>
        </div>
        
        <div class="navsearch">
          <SearchBar navbar={true}></SearchBar>
        </div>
        {
          isAuthenticated ? 
          <div>
            <LogoutButton></LogoutButton>
          </div> :
          <LoginButton></LoginButton>
        }
      </div>
    </nav>
  );
}

export default Navigation;
