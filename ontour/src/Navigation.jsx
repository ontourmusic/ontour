import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink id="ontour" className="fw-bold navbar-brand logo" to="/">
          OnTour
          <img id="guitar" src= "images/guitar.png" alt=""/>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;