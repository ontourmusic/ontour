import React, { useEffect, useState } from 'react';
import SettDashButton from "./components/SettDashbarButton";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const {user, isAuthenticated } = useAuth0();
  const location = useLocation();
  const pathsToHideButton = ["/account", "/profile", "/manage-reviews"];

  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
      if (isAuthenticated && user && user.email) {
          setUserEmail(user.email);
              if (user['https://tourscout.com/user_metadata'] && user['https://tourscout.com/app_metadata'].username && user['https://tourscout.com/user_metadata'].artist_id) {
                  setUsername(user['https://tourscout.com/app_metadata'].username);
              }
      }
      console.log(user);
  }, [user, isAuthenticated]);


  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="/">
          <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
        </a>
        {!isAuthenticated && <LoginButton></LoginButton>}
        {isAuthenticated && <div>
          <span style={{ color: 'white', marginRight: '10px'}}>Logged in as {user.username}</span>
          {!pathsToHideButton.includes(location.pathname) && <SettDashButton></SettDashButton>}
          <LogoutButton></LogoutButton>
        </div> }  
      </div>
    </nav>
  );
}

export default Navigation;