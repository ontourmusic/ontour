import React from "react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <a href="/">
          <img id="nav-logo" src= "images/tourScoutBack.png" alt=""/>
        </a>
        <LoginButton></LoginButton>
        <LogoutButton></LogoutButton>
      </div>
    </nav>
  );
}

export default Navigation;