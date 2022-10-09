import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <NavLink id="ontour" className="fw-bold navbar-brand logo" to="/">
          OnTour
          <img id="guitar" src= "images/guitar.png"/>
        </NavLink>
        <div class="navsearch">
          <input id="input" type="text" class="form-control shadow-none" placeholder="Search for an artist or venue"/>
          <button id="searchbutton" class="btn bg-dark">
            <img src="images/search-icon.png" alt="..."/>
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navigation;