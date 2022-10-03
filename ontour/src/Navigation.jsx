import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav id="top" className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink className="fw-bold navbar-brand" to="/">
          OnTour
          <img id="guitar" src= "images/guitar.png"/>
        </NavLink>
        <div>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/artist">
                Artist
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;