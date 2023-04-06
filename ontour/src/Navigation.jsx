import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const Navigation = () => {
  const { user, isAuthenticated } = useAuth0();

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="/">
          <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
        </a>
        {!isAuthenticated && <LoginButton></LoginButton>}
        {isAuthenticated && <LogoutButton></LogoutButton>}
      </div>
    </nav>
  );
}

export default Navigation;