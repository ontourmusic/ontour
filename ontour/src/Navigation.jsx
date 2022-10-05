import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink className="fw-bold navbar-brand" to="/">
          OnTour
          <img id="guitar" src= "images/guitar.png"/>
        </NavLink>
      </div>
    </nav>
  );
}

export default Navigation;