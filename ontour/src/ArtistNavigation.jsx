import React, { useEffect, useState } from 'react';
import {createSearchParams, useNavigate} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import SearchBar from "./components/SearchBar";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import SettDashButton from "./components/SettDashbarButton";
import { adminEmail } from './constants/constants';

function Navigation(props) 
{
  const { user, isAuthenticated } = useAuth0();
  // const [artist_name, setName] = useState('')

  // const navigate = useNavigate(); 
  // const routeChange = (artist) =>{ 
  //   navigate({
  //     pathname: '/artist', 
  //     search: createSearchParams({
  //     artist: artist_name,
  //     }).toString()
  //   });
  // };

  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
              if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/app_metadata'].username && user['https://tourscout.com/user_metadata'].artist_id) {
                  setUsername(user['https://tourscout.com/app_metadata'].username);
              }
          if(adminEmail.includes(user.email)) {
            props.handleAdminLoggedIn()
          }   
      }
      console.log(user);
  }, [user, isAuthenticated]);

  return (
    <nav id="artist-nav" className="navbar navbar-expand navbar-dark bg-dark">

            
      <div className="container d-flex flex-row justify-content-between align-items-center">
      {isAuthenticated && adminEmail.includes(user.email) && <p style={{color: 'white', marginRight: '10px', marginTop:'20px',alignItems: 'center'}}>Super Admin</p>}
        <div>
          <a href="/">
            <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
          </a>
        </div>
        
        <div class="navsearch">
          <SearchBar type={props.type} artistID={props.artistID} veneueID={props.venueID} festivalID={props.festivalID} name={props.name} user={user} navbar={true}></SearchBar>
        </div>
        {
          isAuthenticated ? 
          <div>
            <span style={{ color: 'white', marginRight: '10px'}}>Logged in as {user.username}</span>
            <SettDashButton></SettDashButton>
            <LogoutButton></LogoutButton>
          </div> :
          <LoginButton ></LoginButton>
        }
      </div>
    </nav>
  );
}

export default Navigation;
