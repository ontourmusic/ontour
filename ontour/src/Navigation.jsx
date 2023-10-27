import React from "react";
import SettDashButton from "./components/SettDashbarButton";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useLocation } from 'react-router-dom';
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const { isAuthenticated } = useAuth0();
  const location = useLocation();
  const pathsToHideButton = ["/account", "/profile"];

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="/">
          <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
        </a>
        {!isAuthenticated && <LoginButton></LoginButton>}
        {isAuthenticated && <div>
          {!pathsToHideButton.includes(location.pathname) && <SettDashButton></SettDashButton>}
          <LogoutButton></LogoutButton>
        </div> }  
      </div>
    </nav>
  );
}

export default Navigation;